import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'

export default class NamedCheckBox extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isChecked : false
        }
    }

    handlePressCheckBox = (newValue) => {
        this.setState({
            isChecked : newValue
        })
    }

    render() {
        return (
            <View style = { styles.container }>
                <CheckBox 
                tintColors = {{ true: 'black', false: 'grey' }}
                value = { this.state.isChecked }
                onValueChange = { this.handlePressCheckBox }
                />
                <Text style={{textAlignVertical: 'center'}}>
                    { this.props.text }
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
        },

    }
)