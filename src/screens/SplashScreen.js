// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, ImageBackground} from 'react-native';

//import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
//let db = openDatabase({name:"sksReactNativeDB.db"})
const image = { uri: "https://picsum.photos/seed/picsum/200/300" };
const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
        AsyncStorage.getItem('user_name').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'Drawer'),
      );
    }, 5000);
  }, []);

  return (
      <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ActivityIndicator
              animating={animating}
              color="#FFFFFF"
              size="large"
              style={styles.activityIndicator}
        />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    textAlign:'center',
  },
  image: {
    flex: 1,
    justifyContent:'center',
  }
});
