import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialCheckboxWithLabel from "./components/MaterialCheckboxWithLabel";

function Index(props) {
  return (
    <View style={styles.container}>
      <MaterialCheckboxWithLabel
        checkIconName="checkbox-blank-outline"
        nuts="X"
        style={styles.nutsMaterialCheckbox}
      ></MaterialCheckboxWithLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 292,
    height: 40
  },
  nutsMaterialCheckbox: {
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    flex: 1
  }
});

export default Index;
