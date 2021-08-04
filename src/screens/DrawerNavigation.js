import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './HomeScreen';
import TowerScreen from './TowerScreen';
import SmsScreen from './SmsScreen';
import Profile from './Profile';
import SnapsScreen from './SnapsScreen';
import SqliteDb from './SqliteDb';
import { DrawerMenu } from '../components/DrawerMenu';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerMenu{...props} />} >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Tower" component={TowerScreen} />
            <Drawer.Screen name="sms" component={SmsScreen} />
            <Drawer.Screen name="profile" component={Profile} />
            <Drawer.Screen name="snaps" component={SnapsScreen} />
            <Drawer.Screen name="sqlite" component={SqliteDb} />
        </Drawer.Navigator>
    )
}
export default DrawerNavigation;