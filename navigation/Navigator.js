import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from '../components/LoginScreenInfo'
import MainScreen from '../components/MainScreenInfo'
import MainScreenAlt from '../components/MainScreenAlt'

//you can implement different kinds of navigators here. Stack navigators, tab navigators, etc

const Stack = createStackNavigator()

const Navigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={MainScreen}
                //options={{ title: "Login Screen" }}
            />
        </Stack.Navigator>
    );
}

export default Navigator