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
	console.log(currentUserID)
    db.ref('/userInfo/'+currentUserID).once('value', (snapshot) => {
		snapshot.forEach(function(childSnapshot) {
			data = childSnapshot.val()
			console.log("Data: "+data)
			setName(data.name)
			setLevel(data.skillLevel)
			setMeasurement(data.prefMeasurement)
			setHash(childSnapshot.key)
			var a = data.allergies
			setAllergies(stringifyAllergies(a))
		})

    });
    setEmail(firebaseApp.auth().currentUser.email);
  }

  const stringifyAllergies = (allergyObj) => {
	var result = "";
		
	result = allergyObj.dairy == true ? result + 'Dairy, ' : result
	result = allergyObj.eggs == true ? result + 'Eggs, ' : result
	result = allergyObj.fish == true ? result + 'Fish, ' : result
	result = allergyObj.gluten == true ? result + 'Gluten, ' : result
	result = allergyObj.peanuts == true ? result + 'Peanuts, ' : result
	result = allergyObj.shellfish == true ? result + 'Shellfish, ' : result
	result = allergyObj.soy == true ? result + 'Soy, ' : result
	result = allergyObj.treeNuts == true ? result + 'Tree Nuts, ' : result
	result = allergyObj.wheat == true ? result + 'Wheat' : result
	
	return result;
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
		skillLevel: skillLevel,
		prefMeasurement: prefMeasurement,
	  })
  }

  useEffect(() => {
    retrieveData();
  }, []); //Added empty array so useEffect is only called once the screen is loaded in

  	let cookingToggle;
	let measToggle;

  	if(isEditable){
		cookingToggle = <View>
					<View style={styles.row}>
						<Text style={styles.loremIpsum}>Cooking Skill:</Text>
						<TextInput onChangeText = {(skillLevel) => setLevel(skillLevel)} style={styles.loremIpsum} 
							editable={false}>{skillLevel}</TextInput>
					</View>
					<View style={{flexDirection: "row", alignSelf: 'center', marginTop: 10}}>
						<TouchableOpacity 
							style={{marginLeft: 10, width: 115, borderRadius: 10, borderColor: '#FC8217', borderWidth: 2}}
							onPress={() => setLevel('Beginner')}>
							<Text style={{fontSize: 18, alignSelf: 'center'}}>Beginner</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={{marginLeft: 10, width: 115, borderRadius: 10, borderColor: '#FC8217', borderWidth: 2}}
							onPress={() => setLevel('Intermediate')}>
							<Text style={{fontSize: 18, alignSelf: 'center'}}>Intermediate</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={{marginLeft: 10, width: 115, borderRadius: 10, borderColor: '#FC8217', borderWidth: 2}}
							onPress={() => setLevel('Advanced')}>
							<Text style={{fontSize: 18, alignSelf: 'center'}}>Advanced</Text>
						</TouchableOpacity>
					</View>
				</View>
		measToggle = <View>
						<View style={styles.row}>
							<Text style={styles.loremIpsum}>Preferred Measurements:</Text>
							<TextInput onChangeText = {(prefMeasurement) => setMeasurement(prefMeasurement)} style={styles.loremIpsum}
								editable={false}>{prefMeasurement}</TextInput>
						</View>
						<View style={{flexDirection: "row", alignSelf: 'center', marginTop: 10}}>
							<TouchableOpacity 
								style={{marginLeft: 10, width: 115, borderRadius: 10, borderColor: '#FC8217', borderWidth: 2}}
								onPress={() => setMeasurement('Metric')}>
								<Text style={{fontSize: 18, alignSelf: 'center'}}>Metric</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								style={{marginLeft: 10, width: 115, borderRadius: 10, borderColor: '#FC8217', borderWidth: 2}}
								onPress={() => setMeasurement('Imperial')}>
								<Text style={{fontSize: 18, alignSelf: 'center'}}>Imperial</Text>
							</TouchableOpacity>
						</View>
					</View>
	}else{
		cookingToggle = <View style={styles.row}>
							<Text style={styles.loremIpsum}>Cooking Skill:</Text>
							<TextInput onChangeText = {(skillLevel) => setLevel(skillLevel)} style={styles.loremIpsum} 
								editable={false}>{skillLevel}</TextInput>
						</View>
		measToggle = <View style={styles.row}>
						<Text style={styles.loremIpsum}>Preferred Measurements:</Text>
						<TextInput onChangeText = {(prefMeasurement) => setMeasurement(prefMeasurement)} style={styles.loremIpsum}
							editable={false}>{prefMeasurement}</TextInput>
					</View>
	}

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
			 			editable={false}>{email}</TextInput>
		</View>
		<Divider style={styles.divider}/>
		{cookingToggle}
		<Divider style={styles.divider}/>
		{measToggle}
		<Divider style={styles.divider}/>
		<Text style={styles.loremIpsum}>Allergies:</Text>
		<TextInput onChangeText = {(allergies) => setAllergies(allergies)} style={styles.loremIpsum}
					editable={false}
					multiline={true}>{allergies}
					</TextInput>
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



