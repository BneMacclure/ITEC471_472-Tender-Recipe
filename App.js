import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./navigation/Navigator";
import * as Font from 'expo-font';
//import AppLoading from 'expo-app-loading';

export default class App extends React.Component {
    state = {
      fontsLoaded: false,
    };

    async loadFonts() {
        await Font.loadAsync({
            BigShouldersDisplayBold_700Bold: require('./assets/BigShouldersDisplay-Bold.ttf'),

            'BigShouldersDisplay_700Bold': {
                uri: require('./assets/BigShouldersDisplay-Bold.ttf'),
                fontDisplay: Font.FontDisplay.FALLBACK,
            },
        }),
        await Font.loadAsync({
            CustomIcons: require('./assets/fonts/fontello_allergens.ttf'),

            'CustomIcons': {
                uri: require('./assets/fonts/fontello_allergens.ttf'),
                fontDisplay: Font.FontDisplay.FALLBACK,
            },
        }),

      this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
      this.loadFonts();
    }

    render() {
      if (this.state.fontsLoaded) {
        return (
          <NavigationContainer>
              <Navigator> </Navigator>
          </NavigationContainer>
          );
      } else {
        return null;
      }
      
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
