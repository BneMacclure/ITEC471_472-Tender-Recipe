import React, { Component, useState, useEffect } from "react";
import { Divider } from 'react-native-elements';
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
// import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from '../styles/MyProfileStyles.js';
import Icon from "react-native-vector-icons/Entypo";
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

  const editInfo = () => {
	  setEditable(!isEditable);
	  if(isEditable){
		  updateInfo();
	  }
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
		
		<ImageBackground
			source={require("../assets/images/profileSplash.jpg")}
			resizeMode="cover"
			style={styles.image}
			imageStyle={styles.image_imageStyle}
		>
			<ImageBackground
				source={require("../assets/images/profile.jpg")}
				resizeMode="cover"
				style={styles.image2}
				imageStyle={styles.image2_imageStyle}
				>
				<TouchableOpacity onPress={() => editInfo()}>
					<MaterialCommunityIconsIcon
						name="pencil-circle-outline"
						style={styles.icon2}
					></MaterialCommunityIconsIcon>
				</TouchableOpacity>
			</ImageBackground>
			<TextInput
				editable={isEditable}
				label="Name"
				onChangeText = {(name) => setName(name)}
				style={styles.johnDoe}>
					{name}
			</TextInput>
		</ImageBackground>
		<View style={styles.row}>
			<Text style={styles.loremIpsum}>Email:</Text>
	 		<TextInput onChangeText = {(email) => setEmail(email)} style={styles.loremIpsum} 
			 			editable={isEditable}>{email}</TextInput>
		</View>
		<Divider style={styles.divider}/>
		<View style={styles.row}>
			<Text style={styles.loremIpsum}>Cooking Skill:</Text>
			<TextInput onChangeText = {(skillLevel) => setLevel(skillLevel)} style={styles.loremIpsum} 
						editable={isEditable}>{skillLevel}</TextInput>
		</View>
		<Divider style={styles.divider}/>
		<View style={styles.row}>
			<Text style={styles.loremIpsum}>Preferred Measurements:</Text>
			<TextInput onChangeText = {(prefMeasurement) => setMeasurement(prefMeasurement)} style={styles.loremIpsum}
						editable={isEditable}>{prefMeasurement}</TextInput>
		</View>
		<Divider style={styles.divider}/>
		<Text style={styles.loremIpsum}>Allergies:</Text>
		<TextInput onChangeText = {(allergies) => setAllergies(allergies)} style={styles.loremIpsum}
					editable={isEditable}>{allergies}</TextInput>
		<Divider style={styles.divider}/>
		<TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('MyRecipes')}>
			<View style={styles.row}>
				<Text style={styles.loremIpsum}>My Recipes</Text>
				<Icon name="chevron-small-right" style={styles.arrowIcon}></Icon>
			</View>
		</TouchableOpacity>
		<Divider style={styles.divider}/>
		<TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ShoppingList')}>
			<View style={styles.row}>
				<Text style={styles.loremIpsum}>Shopping List</Text>
				<Icon name="chevron-small-right" style={styles.arrowIcon}></Icon>
			</View>
		</TouchableOpacity>
		<Divider style={styles.divider}/>
		<TouchableOpacity style={styles.profileBtn}>
			<View style={styles.row}>
				<Text style={styles.loremIpsum}>Change Password</Text>
			</View>
		</TouchableOpacity>
		<Divider style={styles.divider}/>
		<TouchableOpacity style={styles.deleteBtn}>
			<View style={styles.row}>
				<Text style={styles.deleteTxt}>Delete Account</Text>
			</View>
		</TouchableOpacity>
    </View>
  );

}

export default Profile;



