import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
function Registration05(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <Text style={styles.loremIpsum1}>Do you have any{"\n"} allergies?</Text>
        <View style={styles.button1Row}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.wheat}>Wheat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5}>
            <Text style={styles.dairy}>Dairy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button6}>
            <Text style={styles.gluten}>Gluten</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button8Row}>
          <TouchableOpacity style={styles.button8}>
            <Text style={styles.eggs}>Eggs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button9}>
            <Text style={styles.fish}>Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button10}>
            <Text style={styles.shellfish}>Shellfish</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button11Row}>
          <TouchableOpacity style={styles.button11}>
            <Text style={styles.treeNuts}>Tree nuts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button12}>
            <Text style={styles.peanuts}>Peanuts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button13}>
            <Text style={styles.soybeans}>Soybeans</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.other}>Other:</Text>
        <TextInput placeholder="" style={styles.nameInput1}></TextInput>
        <TouchableOpacity 
            onPress={() => props.navigation.navigate('Login Page')}
            style={styles.button7}>
          <Text style={styles.finish}>Finish</Text>
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
    marginTop: 54,
    marginLeft: 75
  },
  button1: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)"
  },
  wheat: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 22
  },
  button5: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 10
  },
  dairy: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center"
  },
  button6: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 11
  },
  gluten: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 22
  },
  button1Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 71,
    marginLeft: 25,
    marginRight: 24
  },
  button8: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)"
  },
  eggs: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 29
  },
  button9: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 10
  },
  fish: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 33
  },
  button10: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 11
  },
  shellfish: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 14
  },
  button8Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 25,
    marginRight: 24
  },
  button11: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)"
  },
  treeNuts: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10
  },
  button12: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 10
  },
  peanuts: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15
  },
  button13: {
    width: 102,
    height: 44,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 11
  },
  soybeans: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 6
  },
  button11Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 25,
    marginRight: 24
  },
  other: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 25
  },
  nameInput1: {
    color: "#121212",
    height: 47,
    width: 246,
    marginLeft: 25
  },
  button7: {
    width: 122,
    height: 52,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 25,
    marginTop: 281,
    marginLeft: 216
  },
  finish: {
    color: "rgba(249,71,35,1)",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 34
  }
});

export default Registration05;
