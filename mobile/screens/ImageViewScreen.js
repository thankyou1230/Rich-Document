import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';


export class ImageViewScreen extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <SafeAreaView style = {styles.container}>
                <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height-100}
                imageWidth={Dimensions.get('window').width}
                imageHeight={Dimensions.get('window').height-100}>
                    <Image style = {styles.image}
                       source={{uri: this.props.route.params.document.url}}
                    />
                </ImageZoom>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create(
    
    {
        container: {
            justifyContent: 'center',
            backgroundColor: 'black',
            paddingTop: 50,
            paddingBottom: 100
        },

        image: {
            width: '100%', 
            height: '100%', 
            resizeMode:'contain'
        }
    }

)