import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
} from 'react-native'
import VideoPlayer from 'react-native-video-controls'

export class AudioViewScreen extends React.Component {

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
            <ScrollView style = {styles.container} showsVerticalScrollIndicator = {false}>
                <VideoPlayer 
                    source={{uri: this.props.route.params.document.url}}
                    ref={(ref) => {this.player = ref}}
                    //controls = {true}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.backgroundVideo}
                    resizeMode = {'contain'}
                    disableBack = {true}
                    audioOnly = {true}
                    poster = {'https://www.nicepng.com/png/detail/329-3297274_compact-disc-cd-comments-disc-icon-png.png'}
                    posterResizeMode = {'contain'}
                    //onEnterFullscreen = {}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'black',
        },

        backgroundVideo: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height-55,
            backgroundColor: 'black',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
    }
)
