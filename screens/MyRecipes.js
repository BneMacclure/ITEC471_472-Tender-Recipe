import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Picker } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { db, firebaseApp } from '../config/DatabaseConfig';

const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default class MyRecipes extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      rec_data: []
    }
  }

  // sorts recipes by name
  orderData() {
    this.state.rec_data.sort(function(a, b) {
      var name1 = a.name; //.toUpperCase();
      var name2 = b.name; //.toUpperCase();
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    });
  };

  // removes a recipe from the MyRecipes list
  unsaveRecipe() {
    var correctRecipe; 
    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/savedrecipes/'+currentUserID).on('value', (snapshot) =>{
      var isRightKey = false;
      snapshot.forEach(function(childSnapshot) {
        var child = childSnapshot.val();
        setName(child.name);
        var currentRecipe = {name};
      });
    });
  };
  
  componentDidMount() {
    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/savedRecipes/'+currentUserID).on('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients, instructions, imageSource, dairy, eggs, fish, gluten, nuts, shellfish, soy;
        var child = childSnapshot.val();
        var id = childSnapshot.key;
        recname = child.name.name;
        ingredients = child.ingredients.ingredients;
        instructions = child.instructions.instructions;
        imageSource = child.imageSource.imageSource;
        dairy = child.dairy.isSelectedDairy;
        eggs = child.eggs.isSelectedEggs;
        fish = child.fish.isSelectedFish;
        gluten = child.gluten.isSelectedGluten;
        nuts = child.nuts.isSelectedNuts;
        shellfish = child.shellfish.isSelectedShellfish;
        soy = child.soy.isSelectedSoy;
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
        <View style={styles.item}>
        <Text style={styles.recName}>{item.recName}</Text>
        <TouchableOpacity style={styles.trashButton}>
          <Icon name="trash" style={styles.icon}></Icon>
        </TouchableOpacity>
      </View>
      )
    }}
		keyExtractor={(item) => item.id}
	  />
	  
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image: {
    width: SCREEN_WIDTH,
    height: 46,
    flexDirection: "row",
  },
  image_imageStyle: {},
  filter: {
    color: "#121212",
    height: 30,
    fontSize: 20,
    marginTop: 0
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 6
  },
  trashButton: {
    width: 30,
    height: 30,
    backgroundColor: "#E6E6E6",
    marginLeft: 31
  },
  filterRow: {
    height: 22,
    flex: 1,
    marginRight: 17,
    marginLeft: 272,
    marginTop: 14
  },
  filterPicker: {
	bottom: 10,
	marginLeft: 0
  },
  item: {
    backgroundColor: '#8c8c8c',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image2: {
    width: SCREEN_WIDTH,
    height: 140,
    marginTop: 1
  },
  image2_imageStyle: {},
  cheesePizza: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
    marginTop: 84,
    marginLeft: 8
  },
});

