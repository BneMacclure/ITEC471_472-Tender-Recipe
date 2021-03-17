import React, { Component, useState } from "react";
import { 
  StyleSheet, 
  View, 
  Image, 
  ImageBackground, 
  Text, 
  Dimensions, 
  TouchableOpacity,
 } from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function Registration03({navigation, route}) {
  const [measurement, setMeasurement] = useState("Imperial");
  const {name, email, phone, skillLevel, password} = route.params;

  const registerFunc3 = () => {
    navigation.navigate('Registration04', { name: name, email: email, phone: phone, password: password, skillLevel: skillLevel, prefMeasurement: measurement })
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      > 
        <Text style={styles.loremIpsum}>
          What is your preferred {"\n"} measurement units?
        </Text>
        <View style={styles.rectRow}>
          <TouchableOpacity
          style={styles.rect}
          onPress={() => setMeasurement("Metric")}>
            <Text style={styles.metric}>Metric</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.rect1}
          onPress={() => setMeasurement("Imperial")}>
            <Text style={styles.imperial}>Imperial</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={() => registerFunc3()}
          style={styles.rect2}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  image_imageStyle: {},
  loremIpsum: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 56,
    marginLeft: 37
  },
  rect: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)"
  },
  metric: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 23,
    marginLeft: 48
  },
  rect1: {
    width: 151,
    height: 71,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 3
  },
  imperial: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 23,
    marginLeft: 37
  },
  rectRow: {
    height: 71,
    flexDirection: "row",
    marginTop: 243,
    marginLeft: 36,
    marginRight: 34
  },
  rect2: {
    width: 122,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    marginTop: 250,
    marginLeft: 250
  },
  next: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 40
  }
});

export default Registration03;
