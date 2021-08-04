import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Provider, Portal, Modal, Button } from 'react-native-paper'
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const db = openDatabase({ name: "sksdatabase.db", createFromLocation: 1 });
const SqliteDb = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [prno, setProno] = useState("")
    const [vendor, setVendor] = useState("");
    const [status, setStatus] = useState("PENDING");
    const [prDate, setPrDate] = useState(new Date());
    const [prStatusDate, setPrStatusDate] = useState(new Date());
    const [remarks, setRemarks] = useState("");
    const [prData, setPrData] = useState([]);

    const fetchData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM table_pr", [],
                (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; i++)
                        temp.push(results.rows.item(i))
                    setPrData(temp);
                }
            );
        });
    }
    
    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name from sqlite_master WHERE type = 'table' AND name='table_pr'", [],
                function (tx, res) {
                    console.log("item:", res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql("DROP TABLE IF EXISTS table_pr", []);
                        txn.executeSql(
                            "CREATE TABLE IF NOT EXISTS table_pr(pr_id INTEGER PRIMARY KEY AUTOINCREMENT, pr_cat VARCHAR(25), pr_des VARCHAR(100), pr_no VARCHAR(25), pr_vendor VARCHAR(25),                   pr_status VARCHAR(15), pr_date VARCHAR(100), pr_status_date VARCHAR(100), remarks VARCHAR(250))", []
                        );
                    }
                }
            );
        });
        fetchData();
    }, []);
    
    const saveData = () => {
        Alert.alert("Hello!", "Data Save");
        hideModal();
        db.transaction(function (tx) {
            tx.executeSql(
                "INSERT INTO table_pr (pr_cat, pr_des, pr_no) VALUES (?,?,?)",
                [category, description, prno],
                (tx, results) => {
                    console.log("Results", results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert("Success", "Data Saved", [{ text: 'Ok', onPress: () => Alert.alert("Done"), },], { cancelable: false });
                    } else {
                        Alert.alert("Error!", "Data not Saved");
                    }
                }
            );
        });
    };
    return (
        <View style={styles.container}>
            <Text>SQLITE Database</Text>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Button mode="contained" color="blue" icon="plus-box" onPress={showModal}>New PR</Button>
                <ScrollView>
                    {prData.map((item) => (<View key={item.pr_id}><Text>{item.category}</Text></View>))}
                </ScrollView>
            </View>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} style={styles.modalStyle}>
                        <TextInput
                            label="PR Category"
                            mode="outlined"
                            left={<TextInput.Icon name="group" />}
                            value={category}
                            onChangeText={(txt)=>setCategory(txt)}
                        />
                        <TextInput
                            label="PR Description"
                            mode="outlined"
                            left={<TextInput.Icon name="format-title" />}
                            value={description}
                            onChangeText={(txt)=>setDescription(txt)}
                        />
                        <TextInput
                            label="PR No"
                            mode="outlined"
                            left={<TextInput.Icon name="card-text" />}
                            value={prno}
                            onChangeText={(txt)=>setProno(txt)}
                        />
                        <Button style={{ marginTop: 15 }} mode="contained" color="green" icon="content-save" onPress={saveData}>Save</Button>
                        <Button style={{marginTop:15}} mode="contained" color="red" icon="close-circle" onPress={hideModal}>Cancel</Button>
                    </Modal>
                </Portal>
            </Provider>
        </View>
    )
}
export default SqliteDb;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    modalStyle: {
        backgroundColor: "#fff",
        padding: 20,
        margin:20
    }
})