import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialCheckboxWithLabel(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon
        name={props.checkIcon || "checkbox-blank-outline"}
        style={styles.checkIcon}
      ></Icon>
      <Text style={styles.nuts}>{props.label || "Nuts"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  checkIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 28,
    lineHeight: 28
  },
  nuts: {
    marginLeft: 2,
    fontSize: 16,
    color: "rgba(0,0,0,0.87)",
    lineHeight: 14,
    letterSpacing: 1
  }
});

export default MaterialCheckboxWithLabel;
