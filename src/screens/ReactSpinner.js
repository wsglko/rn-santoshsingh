import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const ReactSpinner = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    return (
        <View>
            <Text>React Spinner</Text>
        </View>
    )
}
export default ReactSpinner;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})