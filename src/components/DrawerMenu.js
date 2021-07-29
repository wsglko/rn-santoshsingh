import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
    //DrawerItemList,
} from '@react-navigation/drawer';
import { Title, Caption, Drawer, Text, Switch } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { sms } from 'react-native-vector-icons';
//MaterialIcons
import AsyncStorage from '@react-native-community/async-storage';

export function DrawerMenu(props) {
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="user" color={color} size={size} />
                            )}
                            label="Profile"
                            onPress={()=>{props.navigation.navigate("profile")}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="home" color={color} size={size} />
                            )}
                            label="Home"
                            onPress={()=>{props.navigation.navigate("Home")}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Tower"
                            onPress={()=>{props.navigation.navigate("Tower")}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="SMS"
                            onPress={()=>{props.navigation.navigate("sms")}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="sign-out" color={color} size={size} />
                    )}
                    label="Sign-Out"
                    onPress={() => {
                        AsyncStorage.clear();
                        props.navigation.replace("Auth");
                    }}
                />
            </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex:1,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#cfcfcf",
        borderTopWidth: 1,
    },
    drawerSection: {
        marginTop:15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    }
})

  
//export default DrawerMenu;