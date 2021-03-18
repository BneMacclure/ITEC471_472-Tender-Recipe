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

import styles from '../styles/RegisterScreenStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function Registration04({navigation, route}) {
  const [diet, setDiet] = useState("Neither");
  const {name, email, phone, skillLevel, prefMeasurement, password} = route.params;
  const [btn1Act, setbtn1Act] = useState(false);
  const [btn2Act, setbtn2Act] = useState(false);
  const [btn3Act, setbtn3Act] = useState(false);
  const [btn4Act, setbtn4Act] = useState(false);

  const registerFunc4 = () => {
    navigation.navigate('Registration05', { name: name, email: email, phone: phone, password: password, skillLevel: skillLevel,
    prefMeasurement: prefMeasurement, diet: diet })
  }

  const setBtns = (btnNum) => {
    setbtn1Act(btnNum == 1? true: false); 
    setbtn2Act(btnNum == 2? true: false);
    setbtn3Act(btnNum == 3? true: false);
    setbtn4Act(btnNum == 4? true: false);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="cover"
        style={styles.backImg}
        imageStyle={styles.backImg_imageStyle}
      >
        <Text style={styles.reg2Header}>
          What type of diet?
        </Text>
        {/* Spacer */}
        <View style={{marginTop:100}}></View>
        <TouchableOpacity 
          onPress={() => {
            setBtns(1)
            setDiet("Vegan")
          }}
          style={btn1Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
          <Text style={btn1Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Vegan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            setBtns(2)
            setDiet("Vegetarian")
          }}
          style={btn2Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
          <Text style={btn2Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            setBtns(3)
            setDiet("Pescatarian")
          }}
          style={btn3Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
          <Text style={btn3Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Pescatarian</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            setBtns(4)
            setDiet("None")
          }}
          style={btn4Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
          <Text style={btn4Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>None</Text>
        </TouchableOpacity>
        {/* Spacer */}
        <View style={{marginTop:150}}></View>
        <TouchableOpacity 
            onPress={() => registerFunc4()}
            style={styles.nextBtn}>
          <Text style={styles.nextBtnTxt}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <ImageBackground
  //       source={require("../assets/images/Gradient.png")}
  //       resizeMode="cover"
  //       style={styles.image1}
  //       imageStyle={styles.image1_imageStyle}
  //     >
  //       <Text style={styles.loremIpsum1}>
  //         Are you vegan {"\n"}or vegetarian?
  //       </Text>
  //       <TouchableOpacity
  //       style={styles.button1}
  //       onPress={() => setDiet("Vegan")}>
  //         <Text style={styles.vegan}>Vegan</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //       style={styles.button2}
  //       onPress={() => setDiet("Vegetarian")}>
  //         <Text style={styles.vegetarian}>Vegetarian</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //       style={styles.button4}
  //       onPress={() => setDiet("Neither")}>
  //         <Text style={styles.neither}>Neither</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity 
  //           onPress={() => registerFunc4()}
  //           style={styles.button3}>
  //         <Text style={styles.next1}>Next</Text>
  //       </TouchableOpacity>
  //     </ImageBackground>
  //   </View>
  // );
}

export default Registration04;
