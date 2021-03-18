import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert
} from "react-native";
import {TextInput} from 'react-native-paper';
import styles from '../styles/RegisterScreenStyles.js';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


function Registration({navigation, route}) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const registerFunc = () => {
    if (password === confirmPass) {
      navigation.navigate('Registration02', { email: email, name: name, password: password, phone: phone })
    }
    else {
      Alert.alert("Passwords do not match")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#E35614"
         />
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.backImg}
        imageStyle={styles.backImg_imageStyle}
      >
        <Text style={styles.registrationText}>Registration</Text>
        {/* Spacer */}
        <View style={{marginTop:100}}></View>
        {/* <Text style={styles.labelText}>Name</Text> */}
        <TextInput 
          mode="outlined"
          color="#FFFFFF"
          label="Name"
          onChangeText = {(name) => setName(name)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/*<Text style={styles.labelText}>Phone Number</Text>*/}
        <TextInput 
          clearTextOnFocus={true}
          mode="outlined"
          label="Phone Number"
          onChangeText = {(phone) => setPhone(phone)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
          </TextInput>
        {/* <Text style={styles.labelText}>Email</Text> */}
        <TextInput 
          mode="outlined"
          label="Email"
          onChangeText = {(email) => setEmail(email)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Password</Text> */}
        <TextInput 
          mode="outlined"
          label="Password"
          onChangeText = {(password) => setPassword(password)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Confirm Password</Text> */}
        <TextInput 
          mode="outlined"
          label="Confirm Password"
          onChangeText = {(confirmPass) => setConfirmPass(confirmPass)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* Spacer */}
        <View style={{marginTop:40}}></View>
        <TouchableOpacity
         onPress={() => registerFunc()}
         style={styles.signUpBtn}
         >
          <Text style={styles.signUpTxt}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default Registration;
