import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
const TowerScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Tower Screen</Text>
        </View>
    )
}
export default TowerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    }
})