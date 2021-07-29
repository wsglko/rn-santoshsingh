import React,{useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        AsyncStorage.getItem("user_name").then((value) => setUser(value));
        AsyncStorage.getItem("user_role").then((value) => setUserRole(value));
    }, [])
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        //justifyContent: 'center',
        //alignItems: 'center',
    }
});