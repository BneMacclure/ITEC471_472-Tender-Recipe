import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Picker } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { db, firebaseApp } from '../config/DatabaseConfig';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styles from '../styles/MyRecipesStyle.js';
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default class MyRecipes extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      rec_data: []
    }
  }

  // // sorts recipes by name
  // orderData() {
  //   this.state.rec_data.sort(function(a, b) {
  //     var name1 = a.name; //.toUpperCase();
  //     var name2 = b.name; //.toUpperCase();
  //     if (name1 < name2) {
  //       return -1;
  //     }
  //     if (name1 > name2) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // };

  // removes a recipe from the MyRecipes list
  unsaveRecipe(key) {
    var currentUserID = firebaseApp.auth().currentUser.uid;
    console.log(key);
    db.ref('/savedRecipes/'+currentUserID).child(key).remove();
    console.log(key);
  };
  
  componentDidMount() {
    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/savedRecipes/'+currentUserID).on('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients, instructions, imageSource, dairy, eggs, fish, gluten, nuts, shellfish, soy;
        var child = childSnapshot.val();
        var id = childSnapshot.key;
        recname = child.name;
        ingredients = child.ingredients;
        instructions = child.instructions;
        imageSource = child.imageSource;
        dairy = child.dairy;
        eggs = child.eggs;
        fish = child.fish;
        gluten = child.gluten;
        nuts = child.nuts;
        shellfish = child;
        soy = child.soy;
        returnArray.push({ // push data into a single object in the array
          "id": id,
          "recName": recname,
          "ingredients": ingredients,
          "instructions": instructions,
          "imageSource": imageSource,
          "dairy": dairy,
          "eggs": eggs,
          "fish": fish,
          "gluten": gluten,
          "nuts": nuts,
          "shellfish": shellfish,
          "soy": soy
        });
      });
      this.setState({rec_data: returnArray});
    });
    
    console.log(this.state.rec_data);
    
  };

  render() {
    return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.filterRow}>
          <Picker
				style={styles.filterPicker}
				onValueChange={(value) => {
					this.setState({pickerValue: value});
					//alert("Hello");
				}}
				>
				<Picker.Item label="Filter" value="0"></Picker.Item>
				<Picker.Item label="Breakfast" value="1"></Picker.Item>
				<Picker.Item label="Lunch" value="1"></Picker.Item>
				<Picker.Item label="Dinner" value="1"></Picker.Item>
			</Picker>
        </View>
      </ImageBackground>
	  
	  <FlatList
		data = {this.state.rec_data}
		renderItem={({item}) => {
		  return (
			<ImageBackground
				source={require("../assets/images/burgers.jpg")}
				resizeMode="cover"
				style={styles.image2}
				imageStyle={styles.image2_imageStyle}
				>
				<Text style={styles.recText}>{item.recName}</Text>
				<TouchableOpacity style={styles.trashButton} onPress={() => this.unsaveRecipe(item.id)}>
				  <FontAwesomeIcon name="trash-o" style={styles.icon}></FontAwesomeIcon>
				</TouchableOpacity>
			</ImageBackground>		
		  )
    }}
		keyExtractor={(item) => item.id}
	  />
	  
    </View>
  );}
}
