import React,{useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        AsyncStorage.getItem("user_name").then((value) => setUser(value));
        AsyncStorage.getItem("user_role").then((value) => setUserRole(value));
    }, [])
    return (
        <View style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Title>User Email: {user}</Title>
                    <Title>User Role: {userRole}</Title>
                </Card.Content>
            </Card>
        </View>
    )
}
export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        //justifyContent: 'center',
        //alignItems: 'center',
    }
});