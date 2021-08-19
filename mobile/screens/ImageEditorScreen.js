import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {PESDK, PhotoEditorModal, Configuration} from 'react-native-photoeditorsdk';

export class ImageEditorScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style = {styles.container}>
                <PhotoEditorModal 
                visible={true} 
                image={require('../assets/empty.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {

        }
    }
)