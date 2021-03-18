import React, { Component, useState, useEffect } from "react";
import { db, firebaseApp } from '../config/DatabaseConfig';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Picker
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../styles/MyProfileStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

function Profile({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillLevel, setLevel] = useState('');
  const [prefMeasurement, setMeasurement] = useState('');
  const [allergies, setAllergies] = useState('');
  const [pickerMeasValue, setMeasPickerValue] = useState('');
  const [pickerSkillValue, setSkillPickerValue] = useState('');

  /* Pulls data from the Firebase database */
  const retrieveData = () => {

    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/userInfo/'+currentUserID).on('value', (snapshot) => {
		snapshot.forEach(function(childSnapshot) {
			data = childSnapshot.val()
			console.log(data)
			setName(data.name)
			setLevel(data.skillLevel)
			setMeasurement(data.prefMeasurement)
			//setAllergies(data.allergies)
		})

    });
    setEmail(firebaseApp.auth().currentUser.email);
  }

  useEffect(() => {
    retrieveData();
  });

    return (
    <View style={styles.container}>
	  <ScrollView style={styles.scrollableView} contentContainerStyle={styles.svContentContainer}>
		
			{/*Background image for top section*/}
		  <ImageBackground
			source={require("../assets/images/Gradient.png")}
			resizeMode="stretch"
			style={styles.image}
			imageStyle={styles.image_imageStyle}
		  >
			{/*Circle for profile picture*/}
			<View style={styles.ellipseStack}>
			  <Svg viewBox="0 0 116 104" style={styles.ellipse}>
				<Ellipse
				  stroke="rgba(230, 230, 230,1)"
				  strokeWidth={0}
				  fill="rgba(230, 230, 230,1)"
				  cx={58}
				  cy={52}
				  rx={58}
				  ry={58}
				></Ellipse>
			  </Svg>
			  {/*Temp icon inside profile circle*/}
			  <Icon name="ios-person" style={styles.icon}></Icon>
			</View>
			{/*Name text*/}
			<Text style={styles.johnDoe}>{name}</Text>
		  </ImageBackground>
		  {/*Container for email field*/}
		  <View style={styles.emailContStack}>
			<View style={styles.emailCont}>
			  {/*Email text*/}
			  <Text style={styles.email}>Email: {email}</Text>
			</View>
			{/*Container for Skill level*/}
			<View style={styles.skillCont}>
				{/*Skill level text*/}
				<Text style={styles.skillLevel}>Skill Level: {skillLevel}</Text>
				{/*Skill level dropdown*/}
				<Picker
					style={styles.skillPicker}
					onValueChange={(value) => {
						setSkillPickerValue(value)
						//alert("Hello");
					}}
				>
					<Picker.Item label="Select a Skill Level" value="0"></Picker.Item>
					<Picker.Item label="Beginner" value="1"></Picker.Item>
					<Picker.Item label="Intermediate" value="2"></Picker.Item>
					<Picker.Item label="Advanced" value="3"></Picker.Item>
				</Picker>
			  
			 
			</View>
		  </View>
		  {/*Container for measurements fields*/}
		  <View style={styles.measurementsCont}>
			<View style={styles.preferredRow}>
			  {/*Preferred Measurements text*/}
			  <Text style={styles.preferred}>Preferred Measurements:</Text>
			  {/*The measurement*/}
			</View>
			<Picker
				style={styles.measPicker}
				onValueChange={(value) => {
					setMeasPickerValue(value)
					//alert("Hello");
				}}
				>
				<Picker.Item label="Metric" value="0"></Picker.Item>
				<Picker.Item label="Imperial" value="1"></Picker.Item>
			</Picker>
		  </View>
		  {/*Container for allergies*/}
		  <View style={styles.skillCont1}>
			{/*Allergies*/}
			<Text style={styles.allergies}>Allergies</Text>
			{/*Preview of selected allergies*/}
			<Text style={styles.allergiesList}>
			  {allergies}
			</Text>
		  </View>
		  {/*Temporary navigation button to MyRecipes*/}
		  <TouchableOpacity 
			onPress={() => navigation.navigate('MyRecipes')}
			testID='myRecipebtn'
			style={styles.myRecipesButton}>
			<Text style={styles.myRecipesText}>My recipes</Text>
		  </TouchableOpacity>
		  <View style={styles.button3Row}>
			  {/*Change password button*/}
			  <TouchableOpacity style={styles.changePasswordButton}>
				<Text style={styles.changePasswordText}>Change Password?</Text>
			  </TouchableOpacity>
			  {/*Delete account button*/}
			  <TouchableOpacity style={styles.deleteAccountButton}>
				<Text style={styles.deleteAccount}>Delete Account</Text>
			  </TouchableOpacity>
		  </View>
	   </ScrollView>
	  
    </View>
  );

}

export default Profile;
