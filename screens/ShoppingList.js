import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ShoppingListItem } from '../components/ShoppingListItem.js'
import { firebaseApp, db } from '../config/DatabaseConfig';
// import { useChecklist } from 'react-checklist';

function ShoppingList(props) {

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    // get the saved recipes of the user
    var currentUserID = firebaseApp.auth().currentUser.uid;

    db.ref('/savedRecipes/'+currentUserID).on('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients
        var child = childSnapshot.val();
        var id = childSnapshot.key;
        recname = child.name;
        ingredients = child.ingredients;
        returnArray.push({ // push data into a single object in the array
          "id": id,
          "name": recname,
          "ingredients": ingredients,
        });
      });
      console.log(returnArray)
      setRecipes(returnArray)
    });


  }, []);

  // Renders the Recipe View
  const renRecipeItem = ({item}) => {
    console.log('Recipe Item: '+item.name)
    return(
      <View style={styles.container}>
        <Text>{item.name}</Text>
        <FlatList
          data = {getIngredients(item.name)}
          renderItem={renIngredientItem}
          keyExtractor={(item) => item.id}>
            
        </FlatList>
      </View>
    );
  }

  // function to get the ingredients and prep them into an array of objects for the renderItem
  const getIngredients = (recName) => {
    // find the recipe in recipes lol
    var ingredients = []
    var ingredStr = ''

    for (i = 0; i < recipes.length; i++) {
      if (recipes[i].name === recName) {
        ingredStr = recipes[i].ingredients
        i = recipes.length;
      }
    }

    var ingSplit = ingredStr.split('\n')
    ingSplit = ingSplit.filter(elem => elem.length > 0);
    var  num = 0

    for( i = 0; i < ingSplit.length; ++i) {
      ingredients.push({
        'id': num.toString(),
        'ingred': ingSplit[i]
      })
      num++
    }

    return ingredients
  }

  // Renders the custom list item
  const renIngredientItem = ({item}) => {
    console.log('Ingred Item: '+item.ingred)
    return(
      <ShoppingListItem name={item.ingred}/>
    );
  }

    return (
        <View style={styles.container}>
          <FlatList 
            data = {recipes}
            renderItem = {renRecipeItem}
            style={styles.scrollView}
            keyExtractor={(item) => item.id}>

          </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rgrgrgrg: {
    color: "#121212",
    marginTop: 272,
    marginLeft: 183
  },
  scrollView: {
  },
});

export default ShoppingList;
