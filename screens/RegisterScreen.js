import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import {TextInput} from 'react-native-paper';
import styles from '../styles/RegisterScreenStyles.js';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function Registration(props) { 
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#E35614"
         />
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <Text style={styles.registration}>Registration</Text>
        {/* Spacer */}
        <View style={{marginTop:100}}></View>
        {/* <Text style={styles.labelText}>Name</Text> */}
        <TextInput 
          mode="outlined"
          color="#FFFFFF"
          label="Name"
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/*<Text style={styles.labelText}>Phone Number</Text>*/}
        <TextInput 
          clearTextOnFocus={true}
          mode="outlined"
          label="Phone Number"
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
          </TextInput>
        {/* <Text style={styles.labelText}>Email</Text> */}
        <TextInput 
          mode="outlined"
          label="Email" 
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Password</Text> */}
        <TextInput 
          mode="outlined"
          label="Password"
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Confirm Password</Text> */}
        <TextInput 
          mode="outlined"
          label="Confirm Password" 
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* Spacer */}
        <View style={{marginTop:40}}></View>
        <TouchableOpacity
         onPress={() => props.navigation.navigate('Registration02')}
         style={styles.button}
         >
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default Registration;
