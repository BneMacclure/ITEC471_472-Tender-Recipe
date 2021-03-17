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

import styles from '../styles/RegisterScreenStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
class Registration02 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      btn1Act:false,
      btn2Act:false,
      btn3Act:false
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/Gradient.png")}
          resizeMode="cover"
          style={styles.backImg}
          imageStyle={styles.backImg_imageStyle}
        >
          <Text style={styles.reg2Header}>What is your skill level?</Text>
          {/* Spacer */}
          <View style={{marginTop:100}}></View>
          <TouchableOpacity 
            onPress={() => this.setState({btn1Act: !this.state.btn1Act, btn2Act: false, btn3Act: false})}
            style={this.state.btn1Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn1Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Beginner</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setState({btn2Act: !this.state.btn2Act, btn1Act: false, btn3Act: false})}
            style={this.state.btn2Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn2Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Intermediate</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setState({btn3Act: !this.state.btn3Act, btn2Act: false, btn1Act: false})}
            style={this.state.btn3Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn3Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Advanced</Text>
          </TouchableOpacity>
          {/* Spacer */}
          <View style={{marginTop:200}}></View>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Registration03')}
              style={styles.nextBtn}>
            <Text style={styles.nextBtnTxt}>Next</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
  
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   image1: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT
//   },
//   image1_imageStyle: {},
//   loremIpsum1: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 30,
//     marginTop: 56,
//     marginLeft: 37
//   },
//   button: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 157,
//     marginLeft: 112
//   },
//   beginner: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 23,
//     marginLeft: 40
//   },
//   button2: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 15,
//     marginLeft: 112
//   },
//   intermediate: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 24,
//     marginLeft: 23
//   },
//   button3: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 13,
//     marginLeft: 112
//   },
//   advanced: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 24,
//     marginLeft: 31
//   },
//   button4: {
//     width: 122,
//     height: 52,
//     backgroundColor: "rgba(255,255,255,1)",
//     borderRadius: 25,
//     marginTop: 222,
//     marginLeft: 216
//   },
//   next1: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 14,
//     marginLeft: 40
//   }
// });

export default Registration02;