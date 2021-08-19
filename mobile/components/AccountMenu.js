import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

export default class AccountMenu extends React.Component {

    constructor(props) {
        super(props)
    }

    signOut = () => {
        this.props.navigaton.navigate('SignIn')
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.mainContainer}>
                    <View style = {styles.personalInfor}>
                        <View style = {{alignItems: 'center'}}>  
                            <Image 
                                style = {styles.avatar}
                                source = {{uri: 'https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg'}}
                            />
                            <Text>
                                email
                            </Text>
                        </View>
                        <Text style = {styles.nameText}>
                            user name
                        </Text>
                    </View>
                    <View style = {styles.storageInfo}> 
                        <Text>
                            Total files: 
                        </Text>
                        <Text>
                            Used storage: 
                        </Text>
                    </View>
                </View>
                <TouchableNativeFeedback 
                onPress = {this.signOut}
                >
                    <View  style = {styles.footerContainer}>
                        <Image 
                        style = {styles.logoutImage}
                        source = {require('../assets/log-out.png')}
                        />
                        <Text style = {styles.signoutText}>
                            Sign out
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },

        mainContainer: {
            flex: 9,
        },

        personalInfor: {
            flex: 3,
            alignItems: 'center',
            justifyContent: 'space-around'
        },

        storageInfo: {
            flex: 7,
            justifyContent: 'center',
            marginLeft: 40
        },

        avatar: {
            width: 150,
            height: 150,
            borderRadius: 75,
        },

        nameText: {
            fontSize: 20
        },

        footerContainer: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#4285F4',
            alignItems: 'center',
        },

        logoutImage: {
            resizeMode: 'contain',
            width: '30%',
            height: '50%'
        },

        signoutText: {
            fontSize: 25,
            color: '#DB4437'
        }
    }
)