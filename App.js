import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./navigation/Navigator";
import { useFonts, BigShouldersDisplay_700Bold } from '@expo-google-fonts/big-shoulders-display';
//import AppLoading from 'expo-app-loading';

export default function App() {
    let [fontsLoaded] = useFonts({
        BigShouldersDisplay_700Bold
    });

    return (
        <NavigationContainer>
            <Navigator> </Navigator>
        </NavigationContainer>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
