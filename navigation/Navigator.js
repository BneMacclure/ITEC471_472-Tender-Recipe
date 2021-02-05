import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//import { DrawerNavigator } from '@react-navigation';
import { Button, View, TouchableOpacity, StatusBar, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Octicons';
import LoginPage from '../components/LoginScreenInfo'
import MainScreen from '../components/MainScreenInfo'
import MainScreenAlt from '../components/MainScreenAlt'

//you can implement different kinds of navigators here. Stack navigators, tab navigators, etc

const Stack = createStackNavigator()

const MenuIcon = () => <Icon
    name='three-bars'
    size={30}
    color='#fff'
    //onPress={() => navigate('DrawerOpen')}
/>;

const Navigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main Screen"
                component={MainScreen}
                options={{
                    title: "Main Page",
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
                                paddingHorizontal: 10,
                                height: StatusBar.currentHeight,
                            }}>
                            <Icon name="three-bars" size={30} color={'#fff'} />
                        </View>
                        ),
                        
                }}
            />
            <Stack.Screen
                name="Login Page"
                component={LoginPage}
                //options={(route)} => ({title: route.params.name})
            />
        </Stack.Navigator>
    );
}

export default Navigator