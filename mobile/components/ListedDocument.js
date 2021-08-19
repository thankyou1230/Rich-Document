import React, {useRef} from 'react'
import {
    Dimensions,
    Image,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import ActionMenu from './ActionMenu'

export default class ListedDocument extends React.Component {

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
                    <View style = {styles.iconContainer}>
                        <Image 
                        source = {
                            (this.props.document.fileType == 'document')?
                                require('../assets/doc.png') : (this.props.document.fileType == 'image')?
                                    require('../assets/image.png') : (this.props.document.fileType == 'audio')?
                                        require('../assets/audio.png') : (this.props.document.fileType == 'video')?
                                            require('../assets/video.png') : require('../assets/file.png')
                        }
                        style = {styles.fileIcon}
                        />
                    </View>
                    <View style = {styles.nameContainer}>
                        <Text numberOfLines = {1}>
                            {this.props.document.fileName}
                        </Text>
                    </View>
                    <View style = {styles.modifiedTimeContainer}>
                        <Text>
                            {(this.props.document.lastModified.split("T")[1].split(".")[0])}
                        </Text>
                        <Text>
                            {(this.props.document.lastModified.split("T")[0])}
                        </Text>
                    </View>
                    <View style = {styles.optionContainer}>
                        <Pressable onPress={() => this.RBSheet.open()}>
                            <Image 
                            source = {require('../assets/option.png')}
                            style = {styles.optionIcon}
                            />
                        </Pressable>
                    </View>
                </TouchableOpacity>
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
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            width: Dimensions.get('window').width-20,
            alignItems: 'center',
            paddingTop: 30,
            paddingBottom: 30,
        },

        iconContainer: {
            flex: 1,
            //backgroundColor: 'red',
            alignItems: 'center'
        },

        nameContainer: {
            flex: 3,
            //backgroundColor: 'blue',
            paddingLeft: 15,
            paddingRight: 15
        },

        modifiedTimeContainer: {
            flex: 2,
            //backgroundColor: 'green',
            alignItems: 'center',
            paddingRight: 15,
            justifyContent: 'center'
        },

        optionContainer: {
            //backgroundColor: 'yellow',
            alignItems: 'center',
        },

        fileIcon: {
            resizeMode: 'contain',
            width: Dimensions.get('window').width/10,
            height: Dimensions.get('window').width/10,
        },

        optionIcon: {
            resizeMode: 'contain',
            width: Dimensions.get('window').width/14,
            height: Dimensions.get('window').width/14,
        }


    }
)