import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const handleSubmit = () => {
        setErrorText("");
        if (!username) {
            Alert.alert("Please fill Username");
            return;
        }
        if (!password) {
            Alert.alert("Please fill Password");
            return;
        }
        setLoading(true);
        const loginData = { "username": username, "password": password, "action": "login" };
        axios.post("https://sksinfo.000webhostapp.com/api/login-check.php", JSON.stringify(loginData))
            .then(res => {
                setLoading(false);
                if (res.data.result == "valid") {
                    AsyncStorage.setItem("user_name", res.data.email);
                    AsyncStorage.setItem("user_role", res.data.role);
                    navigation.replace("Drawer");
                } else {
                    Alert.alert("Username or Password is incorrect");
                }
                //console.log(res.data);
                //console.log(res.data.result);
                //console.log(res.data.response);
            })
            .catch(e => {
                console.log(e);
                Alert.alert("Error! :" + e);
                setErrorText(e);
            })
    }
    return (
        <View style={styles.container}>
            {loading ? (<Text style={{fontSize:16, textAlign:'center'}}>Please wait login authentication is in-progress!</Text>) : (<Text style={{fontSize:24, textAlign:'center'}}>Please Login!</Text>)}
            {loading ? <ActivityIndicator size="large" color="green" /> : (<>
                <TextInput value={username} onChangeText={(txt)=>setUsername(txt)} autoCapitalize="none" label="Username" mode="outlined" />
            <TextInput value={password} onChangeText={(txt)=>setPassword(txt)} secureTextEntry={true} label="Password" mode="outlined" />
            <View style={{alignItems:'center', margin:10, flexDirection:'row', justifyContent:'center'}}>
                <Button style={{ margin: 15 }} mode="contained" color="green" onPress={handleSubmit}>Login</Button>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                {errorText != "" ? (
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>{errorText}</Text>
                ) : null}
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Register")}><Text>Not registered ? please click here to <Text style={{ fontWeight: 'bold', fontSize:16, color: 'blue'}}>Register</Text></Text></TouchableOpacity>
            </View>
            </>)}
        </View>
    )
}
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems:'center'
        margin:5,
    }
})