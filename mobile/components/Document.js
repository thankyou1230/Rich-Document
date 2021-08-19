import React, {useRef} from 'react'
import {
    Dimensions,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import ActionMenu from './ActionMenu'

export default class Document extends React.Component {

    constructor(props) {
        super(props)
    }

    viewDocument = () => {
        let document = this.props.document
        if (this.props.document.fileType == 'document') {
            this.props.navigation.push('DocView', {document: document})
        }
        else if (this.props.document.fileType == 'image') {
            this.props.navigation.push('ImageView', {document: document})
        }
        else if (this.props.document.fileType == 'audio') {
            this.props.navigation.push('AudioView', {document: document})
        }
        else if (this.props.document.fileType == 'video') {
            this.props.navigation.push('VideoView', {document: document})
        }
        else {
            alert("Don't suppoted type")
        }
    }

    closeActionMenu = () => {
        this.RBSheet.close()
    }

    render() {
        return(
            <View>
                <TouchableOpacity 
                style = {styles.container}
                onPress = {this.viewDocument}
                onLongPress = {() => this.RBSheet.open()}
                >
                    <Image 
                    style = {styles.icon} 
                    source = {
                        (this.props.document.fileType == 'document')?
                            require('../assets/doc.png') : (this.props.document.fileType == 'image')?
                                require('../assets/image.png') : (this.props.document.fileType == 'audio')?
                                    require('../assets/audio.png') : (this.props.document.fileType == 'video')?
                                        require('../assets/video.png') : require('../assets/file.png')
                    }
                    />
                    <View style = {styles.titleContainer}>
                        <Text numberOfLines = {2} style = {styles.title}>
                            {this.props.document.fileName}
                        </Text>
                        <TouchableOpacity 
                            style = { styles.optionButton } 
                            onPress={() => this.RBSheet.open()}> 
                                <Image 
                                source = {require('../assets/option.png')} 
                                style = { styles.optionButtonImage } 
                                /> 
                        </TouchableOpacity>
                    </View>
                    <RBSheet
                        ref={ref => {this.RBSheet = ref;}}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            }
                        }}
                    >
                        <ActionMenu 
                        navigation = {this.props.navigation}
                        document = {this.props.document}
                        user = {this.props.user}
                        isRefresh = {this.props.isRefresh}
                        close = {this.closeActionMenu}
                        />
                    </RBSheet>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            paddingLeft: (Dimensions.get('window').width-200)/4-8,
            paddingRight: (Dimensions.get('window').width-200)/4,
            paddingBottom: 25,
            paddingTop: 25,
            alignItems: 'center',
        },
        
        icon: {
            width: 100,
            height: 100,
        },

        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        title: {
            color: 'black',
            width: 80,
            flexShrink: 1,
            paddingTop: 10
        },

        optionButton: {
            width: 20,
            height: 40,
            marginLeft: 10,
            backgroundColor: 'rgba(0,0,0,0.01)',
        },

        optionButtonImage: {
            resizeMode: 'contain', 
            height: '100%', 
            width: '100%'
        }
    }
)