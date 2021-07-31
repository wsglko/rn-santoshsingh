import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import { Provider } from 'react-native-paper';
import AccountScreen from './AccountScreen';
const HomeScreen = ({ navigation }) => {    
    return (
        <View style={styles.container}>
            {/*<Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Welcome to Home Page</Text>*/}
            <Provider>
                <AccountScreen />
                </Provider>
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