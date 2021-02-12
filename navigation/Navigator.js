import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//import { DrawerNavigator } from '@react-navigation';

import { Button, View, TouchableOpacity, StatusBar, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Octicons';
import LoginPage from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import { firebaseApp } from '../config/DatabaseConfig';
import { HeaderBackButton } from '@react-navigation/stack';
import {    StackNavigator,} from 'react-navigation';
import MyProfile from '../screens/MyProfile'

//you can implement different kinds of navigators here. Stack navigators, tab navigators, etc

const Stack = createStackNavigator()

const MenuIcon = () => <Icon
    name='three-bars'
    size={35}
    color='#fff'
    //onPress={() => navigate('DrawerOpen')}
/>;


const Navigator = props => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login Page"
                component={LoginPage}
                options={{
                    title: "Welcome!",
                    headerStyle: {
                        backgroundColor: '#e35514',
                    },
                    headerTintColor: '#f7f5f2',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 25,
                    },
                }}
            />
            <Stack.Screen
                name="Main Screen"
                component={MainScreen}
                options={({ navigation }) => ({
                    title: "Main Page",
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: '#e35514',
                    },
                    headerTintColor: '#f7f5f2',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 25,
                    },
                    headerRight: () => (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingHorizontal: 25,
                                height: StatusBar.currentHeight,
                            }}>
                            <Icon
                                name="three-bars"
                                size={35}
                                color={'#fff'}
                                onPress={() => { navigation.navigate('MyProfile') }}
                            />
                        </View>
                    ),

                })}       
            />
			 <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                    title: "MyProfile",
                    headerStyle: {
                        backgroundColor: '#e35514',
                    },
                    headerTintColor: '#f7f5f2',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 25,
                    },
                    headerRight: () => (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingHorizontal: 25,
                                height: StatusBar.currentHeight,
                            }}>
                            <Icon name="three-bars" size={35} color={'#fff'} />
                        </View>
                    ),

                }}
            />
            <Stack.Screen
                name="CreateRecipeScreen"
                component={CreateRecipeScreen}
                options={{
                    title: "Create a Recipe",
                    headerStyle: {
                        backgroundColor: '#e35514',
                    },
                    headerTintColor: '#f7f5f2',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 25,
                    },
                }}
            />

        </Stack.Navigator>
    );
}

export default Navigator