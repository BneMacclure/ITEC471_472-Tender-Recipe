import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
function Registration02(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <Text style={styles.loremIpsum1}>What is your skill level?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.beginner}>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.intermediate}>Intermediate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.advanced}>Advanced</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => props.navigation.navigate('Registration03')}
            style={styles.button4}>
          <Text style={styles.next1}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image1: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  image1_imageStyle: {},
  loremIpsum1: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 56,
    marginLeft: 37
  },
  button: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 157,
    marginLeft: 112
  },
  beginner: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 23,
    marginLeft: 40
  },
  button2: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 15,
    marginLeft: 112
  },
  intermediate: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 24,
    marginLeft: 23
  },
  button3: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 13,
    marginLeft: 112
  },
  advanced: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 24,
    marginLeft: 31
  },
  button4: {
    width: 122,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    marginTop: 222,
    marginLeft: 216
  },
  next1: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 40
  }
});

export default Registration02;
