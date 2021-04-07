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
  TextInput,
  Picker
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../styles/MyProfileStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

function Profile({navigation}) {
  const [hash, setHash] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillLevel, setLevel] = useState('');
  const [prefMeasurement, setMeasurement] = useState('');
  const [allergies, setAllergies] = useState('');
  const [pickerMeasValue, setMeasPickerValue] = useState('');
  const [pickerSkillValue, setSkillPickerValue] = useState('');
  const [isEditable, setEditable] = useState(false);

  /* Pulls data from the Firebase database */
  const retrieveData = () => {

    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/userInfo/'+currentUserID).once('value', (snapshot) => {
		snapshot.forEach(function(childSnapshot) {
			data = childSnapshot.val()
			// console.log(data)
			setName(data.name)
			setLevel(data.skillLevel)
			setMeasurement(data.prefMeasurement)
			setHash(childSnapshot.key)
			// setAllergies(data.allergies)
		})

    });
    setEmail(firebaseApp.auth().currentUser.email);
  }

  const updateInfo = () => {
	  var currentUserID = firebaseApp.auth().currentUser.uid;
	  db.ref('/userInfo/' + currentUserID + '/' + hash).update({
			
		name: name,
		// phone: phone,
		skillLevel: skillLevel,
		prefMeasurement: prefMeasurement,
		// allergies: allergies,
		// diet: diet
	  })
  }

  useEffect(() => {
    retrieveData();
  }, []); //Added empty array so useEffect is only called once the screen is loaded in

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
			<TextInput 
				// mode="outlined"
				// color="#FFFFFF"
				label="Name"
				onChangeText = {(name) => setName(name)}
				// theme={{ colors: {placeholder: 'white', text: 'white', primary: 'white'} }}
				style={styles.johnDoe}>
					{name}
			</TextInput>
			{/* <TextInput onChangeText = {(name) => setName(name)} style={styles.johnDoe} editable={isEditable}>name</TextInput> */}
		  </ImageBackground>
		  {/*Container for email field*/}
		  <View style={styles.emailContStack}>
			<View style={styles.emailCont}>
			  {/*Email text*/}
			  <View style={styles.infoRow}>
			  	<Text style={styles.email}>Email:</Text>
			  	<TextInput onChangeText = {(email) => setEmail(email)} style={styles.email} editable={isEditable}>{email}</TextInput>
			  </View>
			</View>
			{/*Container for Skill level*/}
			<View style={styles.skillCont}>
				{/*Skill level text*/}
				<View style={styles.infoRow}>
					<Text style={styles.skillLevel}>Cooking Skill:</Text>
					<TextInput onChangeText = {(skillLevel) => setLevel(skillLevel)} style={styles.skillLevel} editable={isEditable}>{skillLevel}</TextInput>
				</View>
			</View>
		  </View>
		  {/*Container for measurements fields*/}
		  <View style={styles.measurementsCont}>
			<View style={styles.preferredRow}>
			  {/*Preferred Measurements text*/}
			  <View style={styles.infoRow}>
			  	<Text style={styles.preferred}>Preferred Measurements:</Text>
			  	<TextInput onChangeText = {(prefMeasurement) => setMeasurement(prefMeasurement)} style={styles.preferred} editable={isEditable}>{prefMeasurement}</TextInput>
			  </View>
			  {/*The measurement*/}
			</View>
			{/* <Picker
				style={styles.measPicker}
				onValueChange={(value) => {
					setMeasPickerValue(value)
					//alert("Hello");
				}}
				>
				<Picker.Item label="Metric" value="0"></Picker.Item>
				<Picker.Item label="Imperial" value="1"></Picker.Item>
			</Picker> */}
		  </View>
		  {/*Container for allergies*/}
		  <View style={styles.skillCont1}>
			{/*Allergies*/}
			<Text style={styles.allergies}>Allergies</Text>
			{/* <Text style={styles.allergies}>{allergies}</Text> */}
			{/*Preview of selected allergies*/}
			<Text style={styles.allergiesList}>
			  {allergies}
			</Text>
		  </View>
		  {/*Temporary navigation button to MyRecipes*/}
		  <TouchableOpacity 
			onPress={() => navigation.navigate('MyRecipes')}
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
		  {/*Delete account button*/}
		  <TouchableOpacity
		  	onPress={() => setEditable(!isEditable)}
			style={styles.deleteAccountButton}>
			<Text style={styles.deleteAccount}>Edit Info</Text>
		  </TouchableOpacity>

		  <TouchableOpacity
		  	onPress={() => updateInfo()}
			style={styles.deleteAccountButton}>
			<Text style={styles.deleteAccount}>Save Changes</Text>
		  </TouchableOpacity>
	   </ScrollView>
	  
    </View>
  );

}

export default Profile;