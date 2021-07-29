import React,{useEffect, useState} from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
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