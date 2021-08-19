import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Text,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import PasswordInput from '../components/PasswordInput';
import DateInput from '../components/DateInput';
import NamedCheckBox from '../components/NamedCheckBox';
import AnimatedLoader from 'react-native-animated-loader'

const server = "https://quangserver.azurewebsites.net"

export class SignUpScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            typedFirstName: null,
            typedLastName: null,
            typedBirthday: null,
            typedEmail: null,
            typedPassword: null,
            typedConfirmPassword: null,
            confirmCorrect: true,
            confirmPasswordLength: true,
            inProcess: false
        }
    }

    handleSignInSubmit = () => {
        if (this.state.typedFirstName != null && this.state.typedLastName != null && this.state.typedBirthday != null && this.state.typedEmail != null && this.state.typedPassword != null) {
            this.setState(
                {
                    inProcess: true
                }
            )
            var signUpForm = new FormData()
            signUpForm.append('email', this.state.typedEmail)
            signUpForm.append('password', this.state.typedPassword)
            signUpForm.append('firstname', this.state.typedFirstName)
            signUpForm.append('lastname', this.state.typedLastName)
            signUpForm.append('dateofbirth', this.state.typedBirthday)
            //Call api
            fetch(server+'/SignUp', {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
                body: signUpForm    
            })
            .then((response) => {
                if (response.status === 200) {
                    alert('Sign up seccess')
                    this.props.navigation.replace('SignIn')
                }
                else {
                    //let responseJson = response.json()
                    alert("Email alredy exists")
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
        }
        else {
            alert('Missing information filled')
            console.log(this.state.typedFirstName)
            console.log(this.state.typedLastName)
            console.log(this.state.typedBirthday)
            console.log(this.state.typedEmail)
            console.log(this.state.typedPassword)
        }
    }

    typingFirstName = (firstName) => {
        this.setState(
            {
                typedFirstName: firstName
            }
        )
    }

    typingLastName = (lastName) => {
        this.setState(
            {
                typedLastName: lastName
            }
        )
    }
    
    selectingBirthday = (birthday) => {
        this.setState(
            {
                typedBirthday: birthday
            }
        )
    }

    typingEmail = (email) => {
        this.setState(
            {
                typedEmail: email
            }
        )
    }

    handleConfirmPassword = () => {
        //Check confirm
        if (this.state.typedConfirmPassword == this.state.typedPassword){
            this.setState(
                {
                    confirmCorrect: true
                }
            )
        }
        else{
            this.setState(
                {
                    confirmCorrect: false
                }
            )
        }
        //Check length
        if (this.state.typedPassword.length >= 6) {
            this.setState(
                {
                    confirmPasswordLength: true
                }
            )
        }
        else {
            this.setState(
                {
                    confirmPasswordLength: false
                }
            )
        }

    }

    typingPassword = (password) => {
        this.setState(
            {
                typedPassword: password
            },
            this.handleConfirmPassword
        )
    }

    typingConfirmPassword = (confirmPassword) => {
        this.setState(
            {
                typedConfirmPassword: confirmPassword
            },
            this.handleConfirmPassword
        )
    }

    render() {
        return (
            <View style = {styles.container}>
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
                <View style = {styles.nameInputContainer}>
                    <TextInput 
                    style = {styles.firstNameInput}
                    placeholder = "First Name"
                    placeholderTextColor = "grey"
                    onChangeText = {this.typingFirstName}
                    />
                    <TextInput 
                    style = {styles.lastNameInput}
                    placeholder = "Last Name"
                    placeholderTextColor = "grey"
                    onChangeText = {this.typingLastName}
                    />
                </View>
                <View style = {styles.birthInputContainer}>
                    <DateInput onChangeSelection = {this.selectingBirthday}/>
                </View>
                <View style = {styles.emailInputContainer}>
                    <Text style = {{marginBottom: 20, textAlign: 'center', justifyContent: 'flex-end'}}>
                         Account Information
                    </Text>
                    <TextInput 
                    style = {styles.textInput}
                    placeholder = "Email"
                    placeholderTextColor= "grey"
                    onChangeText = {this.typingEmail}
                    />
                </View>
                <View style = {styles.passwordInputContainer}>
                    <PasswordInput
                    placeholder = "Password"
                    placeholderTextColo r= "grey"
                    onChangeText = {this.typingPassword}
                    borderColor = {this.state.confirmCorrect ? 'black' : 'red'}
                    />
                    {!this.state.confirmPasswordLength && 
                    <Text style = {{color: 'red'}}>
                        *must be at least 6 characters
                    </Text>}
                </View>
                <View style = {styles.passwordInputContainer}>
                    <PasswordInput
                    placeholder = "Confirm Password"
                    placeholderTextColo r= "grey"
                    onChangeText = {this.typingConfirmPassword}
                    borderColor = {this.state.confirmCorrect ? 'black' : 'red'}
                    />
                </View>
                <View style = {styles.checkPolicyContainer}>
                    <NamedCheckBox text = 'I agree with the policies.'/>
                </View>
                <View style = {styles.submitContainer}>
                    <Button 
                    onPress = { this.handleSignInSubmit }
                    style = { styles.submitButton }
                    title = 'Sign Up'
                    disabled = {!(this.state.confirmCorrect && this.state.confirmPasswordLength)}
                    />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center'
        },

        nameInputContainer: {
            flex:2,
            justifyContent: 'center',
        },

        birthInputContainer: {
            flex: 1,
            justifyContent: 'flex-start',
        },
        
        emailInputContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        },

        passwordInputContainer: {
            flex: 1,
            justifyContent: 'flex-end',
        },

        checkPolicyContainer: {
            flex: 1,
            justifyContent: 'center',
        },

        submitContainer: {
            width: 300,
            flex: 1,
            justifyContent: 'flex-start'
        },

        separateContainer: {
            flex: 1,
            justifyContent: 'center',
        },  

        firstNameInput: {
            backgroundColor: 'white',
            height:50,
            width: 300,
            maxWidth: 350,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'grey',
            fontSize: 18,
            color: 'black',
            paddingLeft: 8,
            borderBottomWidth: 0.5
        },
        
        lastNameInput: {
            backgroundColor: 'white',
            height:50,
            width: 300,
            maxWidth: 350,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'grey',
            fontSize: 18,
            color: 'black',
            paddingLeft: 8,
            borderTopWidth: 0.5
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
            fontSize: 18,
            color: 'black',
            paddingLeft: 8
        },

        lottie: {
            width: 200,
            height: 200
        },

        submitButton: {
        }
    }
)