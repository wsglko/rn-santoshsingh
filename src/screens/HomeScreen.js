import React,{useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        
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
    }
});