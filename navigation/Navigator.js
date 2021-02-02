import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from '../components/LoginScreenInfo'

//you can implement different kinds of navigators here. Stack navigators, tab navigators, etc

const Stack = createStackNavigator()

const Navigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginPage}
                options={{ title: "Login Screen" }}
            />
        </Stack.Navigator>
    );
}

export default Navigator