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

const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

function Profile({navigation}) {
  

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
			<Text style={styles.johnDoe}>John Doe</Text>
		  </ImageBackground>
		  {/*Container for email field*/}
		  <View style={styles.emailContStack}>
			<View style={styles.emailCont}>
			  {/*Email text*/}
			  <Text style={styles.email}>Email: johndoe@email.com</Text>
			</View>
			{/*Container for Skill level*/}
			<View style={styles.skillCont}>
				{/*Skill level text*/}
				<Text style={styles.skillLevel}>Skill Level</Text>
				{/*Skill level dropdown*/}
				<Picker
					style={styles.skillPicker}
					onValueChange={(value) => {
						this.setState({pickerValue: value});
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
					this.setState({pickerValue: value});
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
			  Wheat, Milk, Eggs, Peanuts, Soy, ...
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
	   </ScrollView>
	  
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: SCREEN_WIDTH,
    height: 289
  },
  image_imageStyle: {},
  ellipse: {
    top: '5%',
	left: '5%',
    width: 116,
    height: 116,    
  },
  icon: {
    top: '1%',
    left: '6%',
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 107,
    height: 117,
    width: SCREEN_WIDTH
  },
  ellipseStack: {
    width: SCREEN_WIDTH,
    height: 117,
    marginTop: 86,
    marginLeft: 122
  },
  johnDoe: {
    color: "#121212",
    fontSize: 40,
    marginTop: 10,
    marginLeft: (SCREEN_WIDTH / 4)
  },
  emailCont: {
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: 46,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  email: {
    color: "#121212",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 19
  },
  skillCont: {
    width: SCREEN_WIDTH,
    height: 70,
    position: "absolute",
    backgroundColor: "rgba(218,218,218,1)",
    top: 44,
    left: 0
  },
  skillLevel: {
    color: "#121212",
    fontSize: 20,
    marginTop: 9,
    marginLeft: 19
  },
  skillPicker: {
	bottom: 5,
	left: 10
  },
  button: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginTop: 1
  },
  beginner: {
    color: "#121212",
    marginLeft: 14
  },
  button1: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginLeft: 27,
    marginTop: 1
  },
  intermediate: {
    color: "#121212",
    marginLeft: 1
  },
  button2: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginLeft: 31
  },
  advanced: {
    color: "#121212",
    marginLeft: 10
  },
  buttonRow: {
    height: 19,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 21,
    marginRight: 35
  },
  emailContStack: {
    width: SCREEN_WIDTH,
    height: 114
  },
  measurementsCont: {
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor: "#E6E6E6",
    marginTop: 0,
    marginLeft: 0
  },
  measPicker: {
	bottom: 5,
	marginLeft: 10
  },
  preferred: {
    color: "#121212",
    fontSize: 20
  },
  preferredRow: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    marginRight: 24,
    marginLeft: 16,
    marginTop: 14
  },
  skillCont1: {
    width: SCREEN_WIDTH,
    height: 68,
    backgroundColor: "rgba(218,218,218,1)"
  },
  allergies: {
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 17
  },
  allergiesList: {
    color: "#121212",
    fontSize: 16,
    marginTop: 6,
    marginLeft: 17
  },
  changePasswordButton: {
    width: '50%',
    height: 36,
	left: -5,
	borderRadius: 10,
	justifyContent: "center",
    backgroundColor: "rgba(164,164,164,1)"
  },
  changePasswordText: {
    color: "#121212",
    alignSelf: "center"
  },
  deleteAccountButton: {
    width: '50%',
    height: 36,
	borderRadius: 10,
	justifyContent: "center",
    backgroundColor: "rgba(230,0,0,1)",
	left: 5,
  },
  deleteAccount: {
    color: "#121212",
    alignSelf: "center"
  },
  button3Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 17,
    marginRight: 15
  },
  myRecipesButton: {
    width: 155,
    height: 37,
    backgroundColor: "#E6E6E6",
	borderRadius: 10,
	justifyContent: "center",
    marginTop: 10,
    marginLeft: '30%'
  },
  myRecipesText: {
    color: "#121212",
    alignSelf: "center"
  }
});

export default Profile;
