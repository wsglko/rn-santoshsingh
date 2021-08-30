import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Title, Card, Paragraph, Text, Provider, Portal, Modal, TextInput, Button, Searchbar, IconButton, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDown from "react-native-paper-dropdown";

const Message = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(false);
    const [database, setDatabase] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");
    const [updateBy, setUpdateBy] = useState("");
    const [updateOn, setUpdateOn] = useState(new Date());
    const [image, setImage] = useState("");
    const [uri, setUrl] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    
    const categoryList = [
        { label: "--Select--", value: "" },
        { label: "Personal", value: "Personal" },
        { label: "Official", value: "Official" },
    ]

    const getData = () => {
        setLoading(true);
        axios.get("https://51e8-2405-201-6012-6032-6c65-de95-7ad3-43ed.in.ngrok.io/api/mm")
            .then((res) => {
                //console.log(res);
                setDatabase(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getData();
    },[])
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const cameraClick = () => {
        setImage("");
        const options = {
            mediaType: 'photo',
            //includeBase64:true,
        }
        launchCamera(options, response => {
            //console.log(response);
            if (response.didCancel !== true) {
                setImage(response);
                setUrl(response.uri);
                setName(response.fileName);
                setType(response.type);

            } else {
                setImage("");
                setUrl("");
                setName("");
                setType("");
            }
        })
    }

    const galleryClick = () => {
        setImage("");
        const options = {
            mediaType: 'photo',
            //includeBase64:true,
        }
        launchImageLibrary(options, response => {
            //console.log(response);
            if (response.didCancel !== true) {
                setImage(response);
                setUrl(response.uri);
                setName(response.fileName);
                setType(response.type);

            } else {
                setImage("");
                setUrl("");
                setName("");
                setType("");
            }
        })
    }

    const saveData = () => {
        if (!title) {
            Alert.alert("Title is empty");
            return;
        } if (!information) {
            Alert.alert("Information is empty");
            return;
        }
            const imageDetails = { uri, type, name };
            //console.log(imageDetails);
            const img = new FormData();
            img.append("file", imageDetails);
            img.append("upload_preset", "bvtlbceo");
            img.append("cloud_name", "dy8tpvwmq");
            axios.post("https://api.cloudinary.com/v1_1/dy8tpvwmq/image/upload", img)
                .then((res) => {
                    //console.log(res.data);
                    axios.post("https://51e8-2405-201-6012-6032-6c65-de95-7ad3-43ed.in.ngrok.io/api/new-mm", { "category": category, "title": title, "imageUrl": res.data.url, "information": information, "updateBy": updateBy, "updateOn": updateOn })
                        .then((res) => {
                            if (res.status === 200) {
                                Alert.alert("Inforation updated to Server");
                                hideModal();
                                setImage("");
                                setUrl("");
                                setName("");
                                setType("");
                                getData();
                            } else {
                                Alert.alert("There was an error!");
                            }
                        }).catch(err => console.log(err));
                })
                .catch(err => console.log(err));
    }

    return (
        <Provider>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    value={search}
                    onChangeText={(txt)=>setSearch(txt)}
                />
                <IconButton
                    icon="plus-circle"
                    color="green"
                    size={25}
                    onPress={showModal}
                />
                <ScrollView>
                    {
                        loading ?
                            <View style={{flex:1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator animating={loading} color="green" size="large" />
                            </View>
                            :
                            database.filter(item => {
                                return(item.title.toLowerCase().includes(search.toLowerCase()) || item.information.toLowerCase().includes(search.toLowerCase()))
                            }).map(db => {
                                return (<Card style={{ margin: 5 }} key={db._id}><Card.Content><Title style={{ textAlign: 'center', fontWeight: 'bold' }}>{db.title}</Title><Image style={{ height: 400 }} source={{ uri: db.imageUrl }} /><Paragraph style={{ textAlign: 'center' }}>{db.information}</Paragraph></Card.Content><Card.Actions><Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{db.updateBy}, </Text><Text> {moment(db.updateOn).format("LL")}</Text></Card.Actions></Card>)})
                    }
                </ScrollView>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                        <Text style={{ fontWeight: 'bold' }}>Add new Information....</Text>
                        <DropDown
                            label={"Category"}
                            mode="outlined"
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={category}
                            setValue={setCategory}
                            list={categoryList}
                        />
                        <TextInput
                            label="Title"
                            mode="outlined"
                            onChangeText={(txt)=>setTitle(txt)}
                        />
                        <TextInput
                            label="Information"
                            mode="outlined"
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(txt)=>setInformation(txt)}
                        />
                        <TextInput
                            label="Share/Update By"
                            mode="outlined"
                            onChangeText={(txt)=>setUpdateBy(txt)}
                        />
                        <View style={{justifyContent:'space-around', flexDirection:'row',alignItems:'center'}}>
                            <Button style={{ margin: 10 }} mode="contained" icon="camera" onPress={()=>cameraClick()}>Camera</Button>
                            <Button style={{margin: 10}} mode="contained" icon="image" onPress={()=>galleryClick()}>Gallery</Button>
                        </View>
                        {image ? <View style={{alignItems:'center'}}><Image source={{ uri: image.uri }} style={{ width: 75, height: 75 }}/></View> : <Text>Image not Selected..</Text>}
                        <Button style={{ margin: 10 }} icon="content-save" mode="contained" color="green" onPress={saveData}>Save</Button>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    )
}
export default Message;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    containerStyle: {
        backgroundColor: "#fff",
        padding: 20,
        margin:20,
    }
})
/*
<View>
                                {database.filter((item) => { return item.title.toLowerCase().includes(search.toLowerCase()) || item.information.toLowerCase().includes(search.toLowerCase()).map(db => { <View key={_id}><Text>{title}</Text></View> })})}
                            </View>
*/