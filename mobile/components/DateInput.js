import React from 'react';
import {
  View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Moment from 'moment';


export default class DateInput extends React.Component {

    managePickerVisibility = () => { 
        //this.setState({ isPickerShowed: false });
        this.setState({ isPickerShowed: true });
    }

    handlePickerConfirm = (fromPicker) => {
        var temp = Moment(fromPicker).format('DD/MM/YYYY')
        this.setState({ selectedDate: temp },this.handleChangeText)
        this.setState({ isPickerShowed: false });
    }

    handlePickerCancel = () => {
        this.setState({ isPickerShowed: false });
    }

    constructor(props) { 
        super(props); 
        this.state = { 
            isPickerShowed: false,
            selectedDate: null
        } 
    }
    
    handleChangeText = () => {
        this.props.onChangeSelection(this.state.selectedDate)
    }

    render() {
        return( 
            <View style = { styles.container }> 
                <View style = { styles.textBoxBtnHolder }> 
                    <TextInput 
                    underlineColorAndroid = "transparent"  
                    style = { styles.textBox }
                    value = {this.state.selectedDate}
                    placeholder = 'Choose your birthday'
                    placeholderTextColor = 'grey'
                    editable = {false}
                    /> 
                    <TouchableOpacity 
                    activeOpacity = { 0.5 } 
                    style = { styles.visibilityBtn } 
                    onPress = { this.managePickerVisibility }> 
                        <Image source = {require('../assets/calendar.png')} style = { styles.btnImage } /> 
                    </TouchableOpacity> 
                    {   
                        this.state.isPickerShowed && (<DateTimePickerModal
                                                        isVisible = { this.state.isPickerShowed }
                                                        mode="date"
                                                        onConfirm = { this.handlePickerConfirm }
                                                        onCancel={ this.handlePickerCancel }
                                                        />)
                    }
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