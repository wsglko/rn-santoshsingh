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