import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Card, Title, Subheading, Paragraph, Searchbar, IconButton, ActivityIndicator, Modal, Provider, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const AccountScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const [userKey, setUserKey] = useState("");
    const [lastUser, setLastUser] = useState("");
    const [ukv, setUkv] = useState(true);
    const [details, setDetails] = useState([]);
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [title, setTitle] = useState("")
    const [accountName, setAccountName] = useState("");
    const [accountPwd, setAccountPwd] = useState("");
    const [url, setUrl] = useState("");
    const [updates, setUpdates] = useState("");
    const deleteData = (id) => {
        axios.post("https://wsglko.000webhostapp.com/api/jokes.php", JSON.stringify({ "user_input_key": lastUser, "id": id,"action":"noJoke" }))
            .then(res => {
                console.log(res.data);
                if (res.data === "deleted") {
                    Alert.alert("Good!", "Records deleted..");
                    fetchData();
                } else {
                    Alert.alert("Error!", "Please try again later..");
                }
            }).catch(err => {
                Alert.alert("Error! " + err);
            })
    }
    const newData = () => {
        axios.post("https://wsglko.000webhostapp.com/api/jokes.php", JSON.stringify({"user_input_key": lastUser, "title": title, "account_name": accountName, "account_pwd": accountPwd, "url": url, "updates": updates, "action": "newJoke" }))
            .then(res => {
                console.log(res.data);
                if (res.data == "inserted") {
                    Alert.alert("Great!", "Data inserted.");
                    setTitle("");
                    setAccountName("");
                    setAccountPwd("");
                    setUrl("");
                    setUpdates("");
                    hideModal();
                    fetchData();
                } else {
                    Alert.alert("Error!", "Please try again later.");
                }
            }).catch(err => {
                Alert.alert("Error! " + err);
            })
    }
    const fetchData = () => {
        
        axios.post("https://wsglko.000webhostapp.com/api/jokes.php", JSON.stringify({ "user_input_key": lastUser, "action":"jokes" }))
            .then(res => {
                setDetails(res.data);
                setUkv(false);
                setLoading(false)
                //setLastUser(userKey);
            }).catch(err => {
                Alert.alert("Error! " + err);
                setDetails(null);
                setUkv(true);
                setLoading(false);
                //setLastUser(null);
            })
    }
    const checkKey = () => {
        setUserKey("");
        if (!userKey) {
            Alert.alert("Error!", "Please enter your User Key", [{ text: 'Ok' }]);
            return;
        }
        setLoading(true);
        fetchData();
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator animating={true} size="large" color="green" style={{flex:1, justifyContent:'center'}} /> : 
        ukv ? <View style={{flex:1,justifyContent:'center'}}>
                <View style={{ justifyContent: 'center', margin: 5 }}>
                    <TextInput left={<TextInput.Icon name="lock"/>}
                        label="User Key"
                        mode="outlined"
                        secureTextEntry={true}
                            onChangeText={(txt) => { setUserKey(txt);setLastUser(txt) }}
                    />
                </View>
                <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                    <Button onPress={checkKey} icon="login" mode="contained" color="green">Submit</Button>
                </View>
            </View> : <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Searchbar
                        placeholder="Search"
                        value={search}
                        onChangeText={(txt) => setSearch(txt)}
                        />
                        <View style={{flexDirection:'row'}}>
                <IconButton
                    icon="keyboard-backspace"
                    color="yellowgreen"
                    onPress={()=>setUkv(true)}
                />
                <IconButton
                    icon="plus-circle"
                    color="yellowgreen"
                    onPress={showModal}
                            />
                        </View>
                            <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                                <TextInput
                                    label="Title / Provider"
                                    mode="outlined"
                                    value={title}
                                    left={<TextInput.Icon name="alphabetical" />}
                                    onChangeText={(txt)=>setTitle(txt)}
                                />
                                <TextInput
                                    label="Account Name"
                                    mode="outlined"
                                    left={<TextInput.Icon icon="email" />}
                                    onChangeText={(txt)=>setAccountName(txt)}
                                />
                                <TextInput
                                    label="Account Password"
                                    mode="outlined"
                                    left={<TextInput.Icon icon="lock" />}
                                    onChangeText={(txt)=>setAccountPwd(txt)}
                                />
                                <TextInput
                                    label="URL"
                                    mode="outlined"
                                    left={<TextInput.Icon icon="microsoft-internet-explorer" />}
                                    onChangeText={(txt)=>setUrl(txt)}
                                />
                                <TextInput
                                    label="Remarks / Updates"
                                    mode="outlined"
                                    multiline={true}
                                    left={<TextInput.Icon icon="text" />}
                                    onChangeText={(txt)=>setUpdates(txt)}
                                />
                                <View style={{flexDirection:"row", justifyContent:'center', alignContent:"space-between", marginTop:15}}>
                                    <Button mode="contained" color="green" icon="content-save" onPress={newData}>Save</Button>
                                    <Button mode="contained" color="red" icon="close-circle" onPress={hideModal}>Cancel</Button>
                                </View>
                        </Modal>
                            </Portal>
                    <ScrollView>
                        {details ? details.filter((it) => {
                        return it.title.toLowerCase().includes(search.toLowerCase()) || it.account_name.toLowerCase().includes(search.toLowerCase())
                    }).map((item) => (<Card style={{margin:5}} key={item.id}>
                        <Card.Content>
                            <Title>{item.title}</Title>
                            <Subheading>{item.account_name}</Subheading>
                            <Text>{item.account_pwd}</Text>
                            <Text onPress={()=>Alert.alert("OK")} accessibilityRole="button" style={{color:"blue", elevation:5, backgroundColor:"lightgray"}}>URL: {item.url}</Text>
                            <Paragraph>{item.updates}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon="delete" color="red" onPress={()=>deleteData(item.id)} />
                            <IconButton icon="file-edit" color="lightblue" onPress={()=>Alert.alert("Attention","This option is under progress....Thank you!")} />
                        </Card.Actions>
                    </Card>)) : <Text style={{fontSize:50, fontWeight:'bold', textAlign:'center',color:'red'}}>No Records!</Text>}
                </ScrollView>
            </View>}
            </View>
    )
}
export default AccountScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5,
    },
    bottomSection: {
        marginBottom: 1,
        borderTopColor: "#cfcfcf",
        borderTopWidth: 1,
    },
    containerStyle:{backgroundColor: 'white', padding: 20,margin:20},
})