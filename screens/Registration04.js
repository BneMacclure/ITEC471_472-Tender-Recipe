import React, { Component, useState } from "react";
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

function Registration04({navigation, route}) {
  const [diet, setDiet] = useState("Neither");
  const {name, email, phone, skillLevel, prefMeasurement, password} = route.params;

  const registerFunc4 = () => {
    navigation.navigate('Registration05', { name: name, email: email, phone: phone, password: password, skillLevel: skillLevel,
    prefMeasurement: prefMeasurement, diet: diet })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <Text style={styles.loremIpsum1}>
          Are you vegan {"\n"}or vegetarian?
        </Text>
        <TouchableOpacity
        style={styles.button1}
        onPress={() => setDiet("Vegan")}>
          <Text style={styles.vegan}>Vegan</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button2}
        onPress={() => setDiet("Vegetarian")}>
          <Text style={styles.vegetarian}>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button4}
        onPress={() => setDiet("Neither")}>
          <Text style={styles.neither}>Neither</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => registerFunc4()}
            style={styles.button3}>
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
    height: SCREEN_HEIGHT,
  },
  image1_imageStyle: {},
  loremIpsum1: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 53,
    marginLeft: 91
  },
  button1: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 124,
    marginLeft: 114
  },
  vegan: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 23,
    marginLeft: 47
  },
  button2: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 10,
    marginLeft: 113
  },
  vegetarian: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 23,
    marginLeft: 27
  },
  button4: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 8,
    marginLeft: 113
  },
  neither: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 24,
    marginLeft: 39
  },
  button3: {
    width: 122,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    marginTop: 232,
    marginLeft: 217
  },
  next1: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 40
  }
});

export default Registration04;
