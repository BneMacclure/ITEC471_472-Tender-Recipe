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
import MyRecipes from '../screens/MyRecipes'
import RegisterScreen from '../screens/RegisterScreen'
import Registration02 from '../screens/Registration02';
import Registration03 from '../screens/Registration03';
import Registration04 from '../screens/Registration04';
import Registration05 from '../screens/Registration05';
import MealPlannerScreen from '../screens/MealPlannerScreen'
import { NavigationContainer } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config/config.json';
const CustomMysteryBox = createIconSetFromFontello(fontelloConfig, 'CustomIconsMysteryBox');

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
        <NavigationContainer independent={true}>
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
                        title: "Welcome!",
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
                                    paddingHorizontal: 15,
                                    height: StatusBar.currentHeight,
                                }}>      
                                
                                <TouchableOpacity style={{
                                    width: 37,
                                    height: 37,
                                    marginRight: 5,
                                    //backgroundColor: "#E6E6E6",
                                    backgroundColor: "#fff",
                                    borderRadius: 100, }}>
                                    <FontAwesomeIcon
                                        name="calendar"
                                        size={25}
                                        color={'#e35514'}
                                        onPress={() => { navigation.navigate('MealPlannerScreen') }}
                                        alignSelf={"center"}
                                        style={{alignSelf: "center", marginTop: 5}}
                                    />

                                </TouchableOpacity>
                                <Ionicon
                                    name="person-circle"
                                    size={45}
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
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        title: "RegisterScreen",
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
                name="Registration02"
                component={Registration02}
                options={{
                    headerShown: false,
                    title: "Registration02",
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
                name="Registration03"
                component={Registration03}
                options={{
                    headerShown: false,
                    title: "Registration03",
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
                name="Registration04"
                component={Registration04}
                options={{
                    headerShown: false,
                    title: "Registration04",
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
                name="Registration05"
                component={Registration05}
                options={{
                    headerShown: false,
                    title: "Registration05",
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
                    name="MyRecipes"
                    component={MyRecipes}
                    options={({ navigation }) => ({
                        title: "My Recipes",
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
                                    paddingHorizontal: 15,
                                    height: StatusBar.currentHeight,
                                }}>

                                <TouchableOpacity style={{
                                    width: 37,
                                    height: 37,
                                    marginRight: 5,
                                    //backgroundColor: "#E6E6E6",
                                    backgroundColor: "#fff",
                                    borderRadius: 100,
                                }}>
                                    <CustomMysteryBox
                                        name="gluten_allergen"
                                        size={32}
                                        color={'#e35514'}
                                        onPress={() => { navigation.navigate('MealPlannerScreen') }}
                                        alignSelf={"center"}
                                        style={{ alignSelf: "center", marginTop: 3 }}>
                                    </CustomMysteryBox>

                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 37,
                                    height: 37,
                                    marginRight: 3,
                                    //backgroundColor: "#E6E6E6",
                                    backgroundColor: "#fff",
                                    borderRadius: 100,
                                }}>
                                    <FontAwesomeIcon
                                        name="home"
                                        size={32}
                                        color={'#e35514'}
                                        alignSelf={"center"}
                                        style={{alignSelf: "center", marginTop:2}}
                                        onPress={() => { navigation.navigate('Main Screen') }}

                                    />

                                </TouchableOpacity>
                            </View>
                        ),

                    })}
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
                <Stack.Screen
                    name="MealPlannerScreen"
                    component={MealPlannerScreen}
                    options={{
                        title: "Meal Planner",
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
        </NavigationContainer>
        
    );
}

export default Navigator