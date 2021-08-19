import React from 'react'
import {
    Dimensions,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import config from '../app.json'
import PhotoEditor from 'react-native-photo-editor'

export default class ActionMenu extends React.Component {

    constructor(props) {
        super(props)
    }

    //When press view button
    viewPressed = () => {
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

    //When press download button
    downloadPressed = () => {
        //debugger
        RNFetchBlob
        .config({
            // this is much more performant.
            fileCache : true,
            addAndroidDownloads: {
                path: RNFetchBlob.fs.dirs.DownloadDir + this.props.document.fileName,
                description: 'downloading ...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,   
            }
        })
        .fetch('GET', this.props.document.url, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            console.log('The file saved to ', res.path())
        })
        .catch((error) => {Alert.alert('Systetm', 'Download failed')})
    }

    editPressed = () => {
        //this.props.navigation.push('ImageEditor')
        RNFetchBlob
        .config({
            // this is much more performant.
            fileCache : true,
            addAndroidDownloads: {
                path: RNFetchBlob.fs.dirs.DownloadDir + this.props.document.fileName,
                description: 'downloading ...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,   
            }
        })
        .fetch('GET', this.props.document.url, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            PhotoEditor.Edit({
                path: res.path(),
                hiddenControls: ['save']
            })
        })
        .catch((error) => {Alert.alert('Systetm', 'Download failed')})
    }

    //When press delete button
    deletePressed = () => {
        let deleteForm = new FormData();
        deleteForm.append('email', this.props.user)
        deleteForm.append('id', this.props.document.id)
        deleteForm.append('fileName', this.props.document.fileName)
        this.props.close()
        //call api
        fetch(config.server+'/DeleteFile', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data'
            },
            body: deleteForm
        })
        .then((response) => {
            if (response.status == 200) {
                this.props.isRefresh()
            }
            else {
                console.log(response.json())
                Alert.alert('System', 'Delete failed')
            }
        })
        .catch((err) => {console.log(err)})
    }

    render() {
        return(
            <View style = {styles.container}>
                <TouchableOpacity 
                style = {styles.optionContainer} 
                onPress = {this.viewPressed}
                >
                    <Text style = {styles.text}>
                        View
                    </Text>
                    <Image 
                    source = {require('../assets/play.png')}
                    style = {styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.optionContainer}
                onPress = {this.editPressed}
                >
                    <Text style = {styles.text}>
                        Edit
                    </Text>
                    <Image 
                    source = {require('../assets/edit.png')}
                    style = {styles.icon}
                    />
                </TouchableOpacity> 
                <TouchableOpacity 
                style = {styles.optionContainer}
                onPress = {this.downloadPressed}
                >
                    <Text style = {styles.text}>
                        Download
                    </Text>
                    <Image 
                    source = {require('../assets/download.png')}
                    style = {styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.optionContainer}
                onPress = {this.sharePressed}
                >
                    <Text style = {styles.text}>
                        Share
                    </Text>
                    <Image 
                    source = {require('../assets/share.png')}
                    style = {styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.optionContainer}
                onPress = {this.deletePressed}
                >
                    <Text style = {styles.highlightText}>
                        Delete
                    </Text>
                    <Image 
                    source = {require('../assets/trash.png')}
                    style = {styles.icon}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
        },

        optionContainer: {
            flexDirection: 'row',
            flex: 1,
            width: Dimensions.get('screen').width,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            paddingLeft: 50,
            paddingRight: 50
        },

        text: {
            fontSize: Dimensions.get('screen').height/36
        },

        highlightText: {
            fontSize: Dimensions.get('screen').height/36,
            color: 'red'
        },

        icon: {
            width: Dimensions.get('screen').height/24,
            height: Dimensions.get('screen').height/24
        }
    }
)