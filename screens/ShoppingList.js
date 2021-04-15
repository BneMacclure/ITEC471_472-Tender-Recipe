import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ShoppingListItem } from '../components/ShoppingListItem.js'
// import { useChecklist } from 'react-checklist';

export default function ShoppingList(props) {
  
  const [item1Checked, setItem1Checked] = useState(false);
  const [item2Checked, setItem2Checked] = useState(false);
  const [item3Checked, setItem3Checked] = useState(false);
  const [item4Checked, setItem4Checked] = useState(false);

    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <ShoppingListItem title='White Bread' checked={item1Checked} itemFunc={setItem1Checked} count='1'/>
            <ShoppingListItem title='Ground Beef' checked={item2Checked} itemFunc={setItem2Checked} count='3'/>
            <ShoppingListItem title='Chicken' checked={item3Checked} itemFunc={setItem3Checked} count='2'/>
            <ShoppingListItem title='Eggs' checked={item4Checked} itemFunc={setItem4Checked} count='12'/>
          </ScrollView>
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

