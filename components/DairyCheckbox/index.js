import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialCheckboxWithLabel from "./components/MaterialCheckboxWithLabel";

function Index(props) {
  return (
    
      <MaterialCheckboxWithLabel
        style={styles.nutsMaterialCheckbox}
      ></MaterialCheckboxWithLabel>
    
  );
}

const styles = StyleSheet.create({
  container: {
    width: 292,
    height: 48
  },
  nutsMaterialCheckbox: {
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    flex: 1,
    width: 292,
    height: 48
  }
});

export default Index;
