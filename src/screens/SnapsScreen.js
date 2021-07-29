import React,{useEffect, useState} from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Title, Card, Subheading, Button } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const SnapsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageViewUrl, setImageViewUrl] = useState("");
    const [imageDelUrl, setImageDelUrl] = useState("");
    const clickPhoto = () => {
        const options = {
            mediaType: "photo",
            includeBase64:true,
        }
        launchCamera(options, response => {
            if (response.didCancel !== true) {
                setLoading(true);
                setPhoto(response);
                setLoading(false);
            } else {
                setPhoto("");
            }
        })
    }
    const pickPhoto = () => {
        const options = {
            mediaType: "photo",
            includeBase64:true,
        }
        launchImageLibrary(options, response => {
            if (response.didCancel !== true) {
                setLoading(true);
                setPhoto(response);
                setLoading(false);
            } else {
                setPhoto("");
            }
        })
    }
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <TouchableOpacity onPress={()=>clickPhoto()}>
                <Text style={{fontWeight:'bold', fontSize:16, textAlign:'center', padding:10, margin:10, backgroundColor:'pink'}}><FontAwesomeIcon name="camera" /> Click Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pickPhoto()}>
                <Text style={{fontWeight:'bold', fontSize:16, textAlign:'center', padding:10, margin:10, backgroundColor:'pink'}}><FontAwesomeIcon name="image" /> Pick Photo</Text>
            </TouchableOpacity>
            <ScrollView>
                <Text>Image URL: {imageUrl}</Text>
                <Text>Image View URL: {imageViewUrl}</Text>
                <Text>Image Delete URL: {imageDelUrl}</Text>
            </ScrollView>
        </View>
    )
}
export default SnapsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    }
});