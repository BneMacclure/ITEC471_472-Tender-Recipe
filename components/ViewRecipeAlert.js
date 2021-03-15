import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class CustomAlertComponent extends Component {
    render() {
        return(
            <View style={styles.container}) >
                <Text> Custom Alert Component</Text>
            </View >

            //title container, recipe name is the head

            //ingredient-instruction button row

            //imagerow of allergen icons

            //scrollable textview that displays dependent on which button is pressed

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    }
})