import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import { Provider } from 'react-native-paper';
import AccountScreen from './AccountScreen';
const HomeScreen = ({ navigation }) => {    
    return (
        <View style={styles.container}>
            <Button mode="contained" color="green" style={{margin:10, padding:5}} onPress={navigation.navigate("spinner")}>React Spinner</Button>
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