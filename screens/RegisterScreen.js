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
    // all fields are required
    if (email !== "" && password !== "" && confirmPass !== "" && name !== "" && phone !== "") {
      // check for valid email address, firebase WILL throw an error
      if (validateEmail(email)) {
        // check to make sure passwords match
        if (password === confirmPass) {
          navigation.navigate('Registration02', { email: email, name: name, password: password, phone: phone })
        }
        else {
          Alert.alert("Passwords do not match")
        }

      }
      else {
        Alert.alert('Invalid email address')
      }

    }
    else {
      Alert.alert("All fields are required")
    }
    
  }

  const validateEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
      {
        return true
      }
        return false
        
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
		  data-testid="name"
          label="Name"
		  testID='namefield'
          onChangeText = {(name) => setName(name)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>name
        </TextInput>
        {/*<Text style={styles.labelText}>Phone Number</Text>*/}
        <TextInput 
          clearTextOnFocus={true}
          mode="outlined"
          label="Phone Number"
		  data-testid="phone"
		  testID='phonefield'
          onChangeText = {(phone) => setPhone(phone)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
          </TextInput>
        {/* <Text style={styles.labelText}>Email</Text> */}
        <TextInput 
          mode="outlined"
          label="Email"
          autoCapitalize='none'
		  data-testid="email"
          onChangeText = {(email) => setEmail(email)}
		  testID='emailfield'
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Password</Text> */}
        <TextInput 
          secureTextEntry={true}
          mode="outlined"
          label="Password"
		  data-testid="pass"
          autoCapitalize='none'
          secureTextEntry={true}
		    testID='passfield'
          onChangeText = {(password) => setPassword(password)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* <Text style={styles.labelText}>Confirm Password</Text> */}
        <TextInput 
          secureTextEntry={true}
          mode="outlined"
          label="Confirm Password"
          autoCapitalize='none'
          secureTextEntry={true}
		  testID='confirmpass'
          onChangeText = {(confirmPass) => setConfirmPass(confirmPass)}
          theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
          style={styles.inputStyle}>
        </TextInput>
        {/* Spacer */}
        <View style={{marginTop:40}}></View>
        <TouchableOpacity
         onPress={() => registerFunc()}
		 testID='signupbtn'
         style={styles.signUpBtn}
         >
          <Text style={styles.signUpTxt}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default Registration;
