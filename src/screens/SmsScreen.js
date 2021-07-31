import React,{useState} from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, Linking } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import moment from 'moment';

const helpUrl = "https://www.npmjs.com/package/react-native-get-sms-android";

const SmsScreen = ({ navigagion }) => {
    const [messages, setMessages] = useState([]);
    const [mobile, setMobile] = useState("");
    const [msg, setMsg] = useState("");
    const getSMS = () => {
        let filter = {
            box: "inbox",
            read: 0
        };
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log("Failed: " + fail);
                Alert.alert("Error! " + fail);
            },
            (count, smsList) => {
                console.log("Count: ", count);
                //console.log("SMS List: ", smsList);
                setMessages(JSON.parse(smsList));
            }
        )
    }
    const sendSMS = () => {
        SmsAndroid.autoSend(
            mobile, msg,
            (fail) => {
                console.log("Failed: " + fail);
                Alert.alert("Message not sent " + fail);
                setMobile("");
                setMsg("");
            },
            (success) => {
                console.log("SMS Sent: " + success);
                Alert.alert("Message sent.. " + success);
                setMobile("");
                setMsg("");
            },
        );
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize:16, fontWeight:'bold', textAlign:'center', margin:5, padding:5}}>SMS Screen</Text>
            <TextInput
                label="Phone No"
                value={mobile}
                onChangeText={(txt)=>setMobile(txt)}
            />
            <TextInput
                label="Message"
                value={msg}
                onChangeText={(txt) => setMsg(txt)}
                multiline={true}
            />
            <Button onPress={sendSMS} mode="contained" style={{margin:10}}>Send SMS</Button>
            <Button onPress={getSMS} mode="contained" style={{ margin: 10 }}>Read SMS</Button>
            <ScrollView>
            {messages.map((item, key) => (
                <Card key={key}>
                    <Card.Title title={item.address} />
                    <Card.Content>
                        <Title>{moment(item.date).format("LLL")}</Title>
                        <Paragraph>{item.body}</Paragraph>
                    </Card.Content>
                </Card>
            ))}
            </ScrollView>
            <View style={styles.bottomSection}>
                <TouchableOpacity accessibilityRole="button" onPress={()=>Linking.openURL(helpUrl)}>
                    <Text style={{padding:5, margin:5, fontWeight:'bold'}}>Helping URL</Text>
                </TouchableOpacity>                
            </View>
        </View>
    )
}
export default SmsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    bottomSection: {
        marginBottom: 1,
        borderTopColor: "#cfcfcf",
        borderTopWidth: 1,
    },
});