import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Name</Text>
      <TextInput placeholder="" style={styles.nameInput}></TextInput>
      <Text style={styles.emailText}>Email</Text>
      <TextInput placeholder="" style={styles.emailInput}></TextInput>
      <Text style={styles.passwordText}>Password</Text>
      <TextInput placeholder="" style={styles.passwordInput}></TextInput>
      <Text style={styles.confirmPasswordText}>Confirm Password</Text>
      <TextInput placeholder="" style={styles.confirmPasswordInput}></TextInput>
      <TouchableOpacity 
        style={styles.registerBtn}
        /**onPress={Some Register Function }*/
        >
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nameText: {
    color: "#121212",
    fontSize: 20,
    marginTop: 176,
    marginLeft: 153
  },
  nameInput: {
    color: "#121212",
    height: 46,
    width: 189,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 85
  },
  emailText: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 156
  },
  emailInput: {
    color: "#121212",
    height: 46,
    width: 189,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 85
  },
  passwordText: {
    color: "#121212",
    fontSize: 20,
    marginLeft: 138
  },
  passwordInput: {
    color: "#121212",
    height: 46,
    width: 189,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 85
  },
  confirmPasswordText: {
    color: "#121212",
    fontSize: 20,
    marginTop: 1,
    marginLeft: 100
  },
  confirmPasswordInput: {
    color: "#121212",
    height: 46,
    width: 189,
    borderWidth: 1,
    borderColor: "#000000",
    marginLeft: 85
  },
  registerBtn: {
    width: 159,
    height: 49,
    backgroundColor: "#E6E6E6",
    marginTop: 71,
    marginLeft: 100
  },
  register: {
    color: "#121212",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 44
  }
});

export default Untitled;

