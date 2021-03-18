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

import styles from '../styles/RegisterScreenStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function Registration03({navigation, route}) {
  const [measurement, setMeasurement] = useState("Imperial");
  const {name, email, phone, skillLevel, password} = route.params;
  const [btn1Act, setbtn1Act] = useState(false);
  const [btn2Act, setbtn2Act] = useState(false);

  const registerFunc3 = () => {
    navigation.navigate('Registration04', { name: name, email: email, phone: phone, password: password, skillLevel: skillLevel, prefMeasurement: measurement })
  }

  const setBtns = (btnNum) => {
    setbtn1Act(btnNum == 1? true: false); 
    setbtn2Act(btnNum == 2? true: false);
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
          What is your preferred {"\n"} measurement units?
        </Text>
        <View style={styles.rectRow}>
          <TouchableOpacity 
            onPress={() =>{
              setBtns(1)
              setMeasurement("Metric")
            }}
            style={btn1Act? styles.horzInpBtnActive : styles.horzInpBtnInactive}>
            <Text style={btn1Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Metric</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              setBtns(2)
              setMeasurement("Imperial")
            }}
            style={btn2Act? styles.horzInpBtnActive : styles.horzInpBtnInactive}>
            <Text style={btn2Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Imperial</Text>
          </TouchableOpacity>
        </View>
        {/* Spacer */}
        <View style={{marginTop:330}}></View>
        <TouchableOpacity 
          onPress={() => registerFunc3()}
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
  //       style={styles.image}
  //       imageStyle={styles.image_imageStyle}
  //     > 
  //       <Text style={styles.loremIpsum}>
  //         What is your preferred {"\n"} measurement units?
  //       </Text>
  //       <View style={styles.rectRow}>
  //         <TouchableOpacity
  //         style={styles.rect}
  //         onPress={() => setMeasurement("Metric")}>
  //           <Text style={styles.metric}>Metric</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.rect1}
  //         onPress={() => setMeasurement("Imperial")}>
  //           <Text style={styles.imperial}>Imperial</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <TouchableOpacity 
  //         onPress={() => registerFunc3()}
  //         style={styles.rect2}>
  //         <Text style={styles.next}>Next</Text>
  //       </TouchableOpacity>
  //     </ImageBackground>
  //   </View>
  // );
}

export default Registration03;
