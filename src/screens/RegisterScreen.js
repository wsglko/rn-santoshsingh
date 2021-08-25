import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>Please Regiser!</Text>
            <TextInput label="Email" mode="outlined" left={<TextInput.Icon name="email" />} />
            <TextInput label="Username (optional)" mode="outlined" left={<TextInput.Icon name="account-circle" />} />
            <TextInput label="Password" mode="outlined" left={<TextInput.Icon name="key" />} />
            <View style={{alignItems:'center', margin:10, flexDirection:'row', justifyContent:'center'}}>
                <Button style={{ margin: 15 }} mode="contained" color="blue">Register</Button>
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}><Text>Already registered ? please click here to <Text style={{ fontWeight: 'bold', fontSize:16, color: 'blue'}}>Login</Text></Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems:'center'
        margin:5,
    }
})