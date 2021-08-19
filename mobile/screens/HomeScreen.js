import React from 'react'
import {
    Dimensions,
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import Document from '../components/Document'
import ListedDocument from '../components/ListedDocument'
import DocumentPicker from "react-native-document-picker"
import AccountMenu from '../components/AccountMenu'

const sortAZ = function compare_item(a, b){
    // a should come before b in the sorted order
    return a.fileName.localeCompare(b.fileName)
}

const sortZA = function compare_item(a, b){
    // a should come before b in the sorted order
    return b.fileName.localeCompare(a.fileName)
}

const server = "https://quangserver.azurewebsites.net"

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gridMode: true,
            topDownSort: true,
            typedSearchText: null,
            refreshData: false,
            data: []
        }
    }

    componentDidMount() {
        //fetch data from server
        //console.log(this.props.route.params.user)
        this.fetchData()
    }

    renderDocument = ({item}) => {
        return(
            this.state.gridMode?
            <Document document = {item} 
            navigation = {this.props.navigation}
            user = {this.props.route.params.user}
            isRefresh = {this.fetchData}
            /> 
            :
            <ListedDocument document = {item} 
            navigation = {this.props.navigation}
            user = {this.props.route.params.user}
            isRefresh = {this.fetchData}
            />
        )
    }

    changeViewMode = () => {
        this.setState(
            {
                gridMode: !this.state.gridMode
            }
        )
    }

    changeSortMode = () => {
        this.setState(
            {
                topDownSort: !this.state.topDownSort
            },
            () => {
                if (this.state.topDownSort) {
                    this.setState(
                        {
                            displayData: this.state.displayData.sort(sortAZ)
                        }
                    )
                }
                else {
                    this.setState(
                        {
                            displayData: this.state.displayData.sort(sortZA)
                        }
                    )
                }
            }
        )
    }

    onSearching = (searcText) => {
        this.setState(
            {
                typedSearchText: searcText
            },
            () => {
                if (this.state.typedSearchText == null) {
                    this.setState(
                        {
                            displayData: this.state.data
                        }
                    )
                }
                else {
                    var tempData = []
                    for (let document of this.state.data) {
                        if (document.fileName.includes(this.state.typedSearchText)) {
                            tempData.push(document)
                        }
                    }
                    this.setState(
                        {
                            displayData: tempData
                        }
                    )
                }
            }
        )
    }

    clearSearch = () => {
        this.setState(
            {
                typedSearchText: null,
                displayData: this.state.data
            }
        )
    }

    handleUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            let uploadData = new FormData()
            uploadData.append('email',this.props.route.params.user)
            uploadData.append('file', res, res.name)
            //Aler upload start, auto hide after 0.5s
            Alert.alert('System','Uploading 1 file');
            //Call server api upload
            fetch(server+'/UploadFile', {
                method: 'POST',
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
                body: uploadData
            })
            //receive return
            .then((response) => {
                //if up load success
                if (response.status == 200) {
                    Alert.alert('System','Upload succeed')
                    this.fetchData()
                }
                //if upload failed
                else {
                    Alert.alert('System','Upload failed');
                    console.log(response.json())
                    //console.log(response)
                }
            })
            //if error occur while progress
            .catch((error) => {
                Alert.alert('System','Upload failed');
                console.log(error)
            })
          }
          catch(e) {
          }
    }

    fetchData = async () => {
        //fetch data from server
        //....
        this.setState(
            {
                refreshData: true
            }
        )
        let form = new FormData()
        form.append('email', this.props.route.params.user)
        const fetchResponse = await fetch(server+'/GetAllDocumentsByEmail', {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data'
            },
            body: form
        })
        if (fetchResponse.status == 200) {
            //
            fetchResponse.json().then((responseData) => {
                this.setState(
                    {
                        data: responseData
                    }, () => this.setState(
                                {
                                    displayData: this.state.data
                                }
                            )
                )
            })
        }
        else {
            //
            console.log('error')
        }
        this.setState(
            {
                refreshData: false
            },
            //hide loading
        )
    }

    render() {
        return(
            
            <View style = {styles.container}>
                <View style = {styles.searchContainer} dis>
                    <TextInput 
                    style = {styles.searchInput}
                    onChangeText = {this.onSearching}
                    value = {this.state.typedSearchText}
                    />
                    {(this.state.typedSearchText != null) && 
                    <TouchableOpacity 
                    activeOpacity = { 0.8 } 
                    style = { styles.clearButton } 
                    onPress = { this.clearSearch }> 
                        <Image 
                        source = {require('../assets/clear.png')} 
                        style = { styles.clearButtonImage } 
                        /> 
                    </TouchableOpacity>
                    }
                    <TouchableOpacity 
                    activeOpacity = { 0.8 } 
                    style = { styles.menuButton } 
                    onPress = { this.props.navigation.openDrawer }> 
                        <Image 
                        source = {require('../assets/menu.png')} 
                        style = { styles.menuButtonImage } 
                        /> 
                    </TouchableOpacity>
                    <View style = {styles.viewModeContainer}>
                        <TouchableOpacity 
                        activeOpacity = { 0.8 } 
                        style = { styles.viewModeButton } 
                        onPress = { this.changeSortMode }> 
                            <Image 
                            source = {this.state.topDownSort? require('../assets/a-z.png'):require('../assets/z-a.png')} 
                            style = { styles.viewModeButtonImage } 
                            /> 
                        </TouchableOpacity>
                        <TouchableOpacity 
                        activeOpacity = { 0.8 } 
                        style = { styles.viewModeButton } 
                        onPress = { this.changeViewMode }> 
                            <Image 
                            source = {this.state.gridMode? require('../assets/list.png'):require('../assets/grid.png')} 
                            style = { styles.viewModeButtonImage } 
                            /> 
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.documentContainer}>
                    {(this.state.data.length == 0)? 
                        <Image style = {styles.emptyImage} source = {require('../assets/empty.png')}/>
                        :
                        <FlatList style = {{paddingBottom:20}}
                        data = {this.state.displayData}
                        renderItem = {this.renderDocument}
                        keyExtractor = {document => document.id}
                        numColumns = {(this.state.gridMode? Math.floor(Dimensions.get('screen').width/170) : 1)}
                        key = {(this.state.gridMode? 'grid' : 'list')}
                        showsVerticalScrollIndicator = {false}
                        onRefresh = {this.fetchData}
                        refreshing = {this.state.refreshData}
                        ListEmptyComponent ={() => (
                            <Image style = {styles.emptyImage} source = {require('../assets/empty.png')}/>
                        )}
                        />
                    } 
                </View>
                <TouchableOpacity 
                        activeOpacity = { 0.8 } 
                        style = { styles.uploadButton } 
                        onPress = { this.handleUpload }> 
                            <Image 
                            source = {require('../assets/upload.png')} 
                            style = { styles.uploadButtonImage } 
                            /> 
                </TouchableOpacity>
            </View>
            

        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center'
        },
        
        icon: {
            width: 100,
            height: 100
        },

        title: {
            color: 'black'
        },

        documentContainer: {
            flex: 6,
        },

        searchContainer: {
            flex: 1,
            marginTop: 20,
            borderBottomWidth: 1, 
            borderBottomColor: 'black'
        },

        searchInput: {
            fontSize: 20,
            alignSelf: 'stretch', 
            height: 50, 
            width: 350,
            paddingRight: 45, 
            paddingLeft: 50, 
            borderWidth: 1, 
            borderColor: 'grey', 
            borderRadius: 5,
            color: 'black'
        },

        menuButton: { 
            position: 'absolute', 
            left: 3, 
            height: 40, 
            width: 35, 
            padding: 5,
            paddingLeft: 8,
            marginRight: 10,
            marginTop: 5,
        }, 

        menuButtonImage: { 
            resizeMode: 'contain', 
            height: '100%', 
            width: '100%' 
        },

        clearButton: { 
            position: 'absolute', 
            right: 5,
            height: 40, 
            width: 30, 
            padding: 5,
            paddingLeft: 10,
            paddingRight: 8,
            borderLeftColor: 'black',
            marginTop: 5,
        }, 

        clearButtonImage: { 
            resizeMode: 'contain', 
            height: '100%', 
            width: '100%' 
        },

        viewModeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        viewModeButton: {
            width: 25,
            height: 25,
            marginTop: 15,
        },

        viewModeButtonImage: {
            resizeMode: 'contain', 
            height: '100%', 
            width: '100%'
        },

        uploadButton: {
            position: 'absolute',
            width: 60,
            height: 60,
            bottom: 50,
            right: 50,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
                    },

        uploadButtonImage: {
            resizeMode: 'contain', 
            height: '100%', 
            width: '100%',
        },

        emptyImage: {
            resizeMode:'contain',
            width: 200,
            opacity: 0.6
        }
    }
)