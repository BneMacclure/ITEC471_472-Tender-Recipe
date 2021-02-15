import React, { Component, useState } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { db, firebaseApp } from '../config/DatabaseConfig';

const data = [];
const [name, setName] = useState('');
const [ingredients, setIngredients] = useState('');
const [instructions, setInstructions] = useState('');
const [imageSource, setImage] = useState('');
const [dairy, setDairy] = useState(false);
const [eggs, setEggs] = useState(false);
const [fish, setFish] = useState(false);
const [gluten, setGluten] = useState(false);
const [nuts, setNuts] = useState(false);
const [shellfish, setShellfish] = useState(false);
const [soy, setSoy] = useState(false);

export const MyRecipes = (props) => {

  const getData = () => {
    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/savedrecipes/'+currentUserID).on('value', (snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        var child = childSnapshot.val();
        setName(child.name);
        setIngredients(child.ingredients);
        setInstructions(child.instructions);
        setImage(child.imageSource);
        setDairy(child.dairy);
        setEggs(child.eggs);
        setFish(child.fish);
        setGluten(child.gluten);
        setNuts(child.nuts);
        setShellfish(child.shellfish);
        setSoy(child.soy);
        data.push({
          recName: {name},
          "name": {name},
          "ingredients": {ingredients},
          "instructions": {instructions},
          "imageSource": {imageSource},
          "dairy": {dairy},
          "eggs": {eggs},
          "fish": {fish},
          "gluten": {gluten},
          "nuts": {nuts},
          "shellfish": {shellfish},
          "soy": {soy}
        });
      });
    });
  };

  const orderData = () => {
    data.sort(function(a, b) {
      var name1 = a.name.toUpperCase();
      var name2 = b.name.toUpperCase();
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    });
  };

  const unsaveRecipe = () => {
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

  useEffect(() => {
    getData();
    orderData();
  });

  const renderItem = ( item ) => {
    return (
      <View style={styles.item}>
      <Text style={styles.recName}>{item.recName}</Text>
      <TouchableOpacity style={styles.trashButton}>
        <Icon name="trash" style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.filterRow}>
          <Text style={styles.filter}>Filter</Text>
          <Icon name="chevron-down" style={styles.icon}></Icon>
        </View>
      </ImageBackground>
	  
	  <FlatList
		data = {data}
		renderItem={renderItem}
		keyExtractor={item => item.id}
	  />
	  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image: {
    width: 360,
    height: 46,
    flexDirection: "row",
    marginTop: 23
  },
  image_imageStyle: {},
  filter: {
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 14,
    fontSize: 20,
    marginTop: 4
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
    flexDirection: "row",
    flex: 1,
    marginRight: 17,
    marginLeft: 272,
    marginTop: 14
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
});

