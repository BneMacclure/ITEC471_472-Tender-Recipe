import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ShoppingListItem } from '../components/ShoppingListItem.js'
// import { useChecklist } from 'react-checklist';

function ShoppingList(props) {

  const [recipes, setRecipes] = useState({});

  const renRecipeItem = (item) => {
    return(
      <View>
        <Text>{item.name}</Text>
        <FlatList
          data = {getIngredients(item.name)}
          renderItem={() => renIngredientItem()}>
            
        </FlatList>
      </View>
    );
  }

  const getIngredients = (recName) => {

  }

  const renIngredientItem = (item) => {
    return(
      <ShoppingListItem name={item}/>
    );
  }

    return (
        <View style={styles.container}>
          <FlatList 
            data = {recipes}
            renderItem = {() => renRecipeItem()}
            style={styles.scrollView}>

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
