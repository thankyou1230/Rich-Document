import React from 'react';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Text,
    Image,
    Dimensions,
} from 'react-native'
import NamedCheckBox from '../components/NamedCheckBox'
import PasswordInput from '../components/PasswordInput'
import auth from '@react-native-firebase/auth'
import AnimatedLoader from 'react-native-animated-loader'

const server = "https://quangserver.azurewebsites.net"

export class SignInScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            typedEmail: "",
            typedPassword: "",
            inProcess: false
        }
    }

    // componentDidMount = () => {

    // }

    //Login with Google
    handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            //await GoogleSignin.revokeAccess();
            //await GoogleSignin.signOut();
            this.setState(
                {
                    inProcess: true
                }
            )
            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            //const googleCredential = auth.GoogleAuthProvider.credential(userInfo.serverAuthCode);
            //console.log(token.accessToken)
            //Call api login by google
            var loginForm = new FormData()
            loginForm.append('token', token.accessToken)
            fetch(server+'/LoginByGoogle', {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
                body: loginForm
                })
            .then(response => {
                this.setState(
                    {
                        inProcess: false
                    }
                )
                if (response.status === 200) {
                    this.props.navigation.replace('Home',{
                        user: userInfo.user.email,
                        userName: userInfo.user.name,
                        avatar: userInfo.user.photo
                    })
                }
                else {
                    alert("Invalid email or password")
                }
            })
            //await auth().signInWithCredential(googleCredential)
            //this.props.navigation.navigate('SignUp')
            } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('Sign in failed')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('processing')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('This method is not available')
            } else {
                alert(error)
            }
            }
        };

    handleSignUpPressed = () => {
        this.props.navigation.navigate('SignUp')
    }

    //Login by account email and password
    handleLogin = () => {
        this.setState(
            {
                inProcess: true
            }
        )
        var loginForm = new FormData()
        loginForm.append('email', this.state.typedEmail)
        loginForm.append('password', this.state.typedPassword)
        fetch(server+'/LoginByAccount', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data'
            },
            body: loginForm
        })
        .then((response) => {
            if (response.status == 200) {
                this.props.navigation.replace('Home',{
                    user: this.state.typedEmail
                })
            }
            else {
                alert("Invalid email or password")
            }
            this.setState(
                {
                    inProcess: false
                }
            )
        })
        .catch(error => {
            console.log(error)
            alert("Error has occured, contact admin for morinformation")
            this.setState(
                {
                    inProcess: false
                }
            )
        })
        //this.props.navigation.replace('Home')
    }

    handleTypingEmail = (emailValue) => {
        this.setState(
            {
                typedEmail: emailValue
            }
        )
    }

    handleTypingPassword = (passwordValue) => {
        this.setState(
            {
                typedPassword: passwordValue
            }
        )
    }

    render(){
        return(
            <View style={styles.container}>
                {
                this.state.inProcess && 
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(0,0,0,0.85)"
                    source={require("../assets/loading.json")}
                    animationStyle={styles.lottie}
                    speed={2}
                    >
                </AnimatedLoader>
                }
                <View style = { styles.logoContainer }>
                    <Image source = {require('../assets/logo.png')} style ={ { width:300 } } />
                </View>
                <View style = {styles.googleSignInContainer}>
                    <GoogleSigninButton
                        style = {{ width: 300, height: 60 }}
                        size = {GoogleSigninButton.Size.Wide}
                        color = {GoogleSigninButton.Color.Dark}
                        onPress = {this.handleGoogleSignIn}
                    />
                    
                </View>
                <View style={styles.separateContainer}>
                    <View style = {{backgroundColor: 'grey', height: 1, flex: 2, alignSelf: 'center'}} />
                    <Text style = {{flex: 1, textAlign: 'center'}}>
                        Or 
                    </Text>
                    <View style = {{backgroundColor: 'grey', height: 1, flex: 2, alignSelf: 'center'}} />
                </View>
                <View style = {styles.userNameInputContainer}>
                    <Text>
                        User Name or Email Address
                    </Text>
                    <TextInput 
                    style = {styles.textInput}
                    onChangeText = {this.handleTypingEmail}
                    />
                </View>
                <View style={styles.passwordInputContainer}>
                    <Text>
                        Password
                    </Text>
                    <PasswordInput onChangeText = {this.handleTypingPassword}/>
                </View>
                <View style={styles.loginContainer}>
                    <View style={styles.checkBoxContainer}>    
                        <NamedCheckBox text='Remember me'/>
                    </View>
                    <Button title='Log in' onPress = {this.handleLogin}/>
                </View>
                <View style={styles.signUpContainer}>
                    <Text>
                        You dont have an account ?
                    </Text>
                    <TouchableOpacity onPress = { this.handleSignUpPressed }>
                        <Text style={{color:'rgb(66,134,245)'}}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },

    logoContainer: {
        flex: 4,
        justifyContent: 'center'
    },

    googleSignInContainer: {
        flex: 2,
        justifyContent: 'flex-end', 
    },

    separateContainer: {
        flex: 2,
        width: 300,
        flexDirection: 'row',
        alignItems: 'center'
    },

    userNameInputContainer: {
        flex: 2,
    },

    passwordInputContainer: {
        flex: 2,
    },

    loginContainer: {
        flex: 2,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        
    },

    checkBoxContainer: {
        flexDirection: 'row',
        
    },

    signUpContainer: {
        flex: 2,
        //flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    textInput: {
        backgroundColor: 'white',
        height:50,
        width: 300,
        maxWidth: 350,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 20,
        color: 'black',
        paddingLeft: 8,

    },

    lottie: {
        width: 200,
        height: 200
    }
    
})
