import 'react-native-gesture-handler';
import React,{useEffect} from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import DrawerNavigation from './src/screens/DrawerNavigation';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator();
const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

const App = () => {
/*
    useEffect(() => {
          db.transaction(function (txn) {
              txn.executeSql(
                  "SELECT name sqlite_master WHERE type='table' AND name='user_session'",
                  [],
                  function (tx, res) {
                      console.log('item:', res.rows.length);
                      if (res.rows.length == 0) {
                          txn.executeSql("DROP TABLE IF EXISTS user_session", []);
                          txn.executeSql(
                              "CREATE TABLE IF NOT EXISTS user_session(session_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(100), user_role VARCHAR(20), user_email VARCHAR(100), user_location VARCHAR(50), session_mode VARCHAR(20), session_start VARCHAR(100), session_end VARCHAR(100), update_on VARCHAR(100))",
                              []
                          );
                      }
                  }
              );
          })
    }, []);
    */
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                <Stack.Screen name="Drawer" component={DrawerNavigation} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App;

/*

            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            */