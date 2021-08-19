import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'

export default class PasswordInput extends React.Component {

    managePasswordVisibility = () => { 
        this.setState({ hidePassword: !this.state.hidePassword }); 
    }

    constructor(props) { 
        super(props); 
        this.state = { hidePassword: true } 
    }

    handleChangeText = (text) => {
        this.props.onChangeText(text)
    }

    render() {
        return( 
            <View style = { styles.container }> 
                <View style = { styles.textBoxBtnHolder }> 
                    <TextInput 
                    underlineColorAndroid = "transparent" 
                    secureTextEntry = { this.state.hidePassword } 
                    style = { styles.textBox }
                    onChangeText = {this.handleChangeText}
                    placeholder = {this.props.placeholder}
                    placeholderTextColor = {this.props.placeholderTextColor}
                    borderColor = {this.props.borderColor}
                    /> 
                    <TouchableOpacity 
                    activeOpacity = { 0.8 } 
                    style = { styles.visibilityBtn } 
                    onPress = { this.managePasswordVisibility }> 
                        <Image 
                        source = { ( this.state.hidePassword ) ? require('../assets/hide.png') : require('../assets/view.png') } 
                        style = { styles.btnImage } 
                        /> 
                    </TouchableOpacity> 
                </View> 
            </View> 
        )
    }
}

const styles = StyleSheet.create( { 
        
    container: { 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 

    textBoxBtnHolder: { 
        position: 'relative', 
        alignSelf: 'stretch', 
        justifyContent: 'center' 
    }, 

    textBox: { 
        fontSize: 20,
        alignSelf: 'stretch', 
        height: 50, 
        width: 300,
        maxWidth:350,
        paddingRight: 45, 
        paddingLeft: 8, 
        borderWidth: 1, 
        borderColor: 'grey', 
        borderRadius: 5,
        color: 'black'
    }, 
    
    visibilityBtn: { 
        position: 'absolute', 
        right: 3, 
        height: 40, 
        width: 35, 
        padding: 5 
    }, 
    
    btnImage: { 
        resizeMode: 'contain', 
        height: '100%', 
        width: '100%' 
    } 
    
});