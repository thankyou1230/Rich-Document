import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    View
} from 'react-native'
import { WebView } from 'react-native-webview'

export class DocViewScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    onBuffer = () => {
        alert('loading')
    }

    videoError = () => {
        alert("Can't load this file")
    }

    render() {
        return(
            <WebView
            style = {styles.view}
            source={{ uri: 'https://docs.google.com/gview?url='+this.props.route.params.document.url+'&embedded=true'}}
            startInLoadingState={true} 
            />
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'black',
        },

        view: {
            width: Dimensions.get('window').width,
            //height: Dimensions.get('window').height-55,
            backgroundColor: 'black',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
    }
)
