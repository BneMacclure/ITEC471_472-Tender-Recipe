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

class Registration04 extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      btn1Act:false,
      btn2Act:false,
      btn3Act:false,
      btn4Act:false
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
          <Text style={styles.reg2Header}>
            What type of diet?
          </Text>
          {/* Spacer */}
          <View style={{marginTop:100}}></View>
          <TouchableOpacity 
            onPress={() => this.setState({btn1Act: !this.state.btn1Act, btn2Act: false, btn3Act: false, btn4Act: false})}
            style={this.state.btn1Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn1Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setState({btn2Act: !this.state.btn2Act, btn1Act: false, btn3Act: false, btn4Act: false})}
            style={this.state.btn2Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn2Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setState({btn3Act: !this.state.btn3Act, btn1Act: false, btn2Act: false, btn4Act: false})}
            style={this.state.btn3Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn3Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Pescatarian</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setState({btn4Act: !this.state.btn4Act, btn1Act: false, btn2Act: false, btn3Act: false})}
            style={this.state.btn4Act? styles.vertInpBtnActive : styles.vertInpBtnInactive}>
            <Text style={this.state.btn4Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>None</Text>
          </TouchableOpacity>
          {/* Spacer */}
          <View style={{marginTop:150}}></View>
          <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Registration05')}
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
//     height: SCREEN_HEIGHT,
//   },
//   image1_imageStyle: {},
//   loremIpsum1: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 30,
//     marginTop: 53,
//     marginLeft: 91
//   },
//   button1: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 124,
//     marginLeft: 114
//   },
//   vegan: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 23,
//     marginLeft: 47
//   },
//   button2: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 10,
//     marginLeft: 113
//   },
//   vegetarian: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 23,
//     marginLeft: 27
//   },
//   button4: {
//     width: 151,
//     height: 71,
//     backgroundColor: "rgba(255,255,255,1)",
//     marginTop: 8,
//     marginLeft: 113
//   },
//   neither: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 24,
//     marginLeft: 39
//   },
//   button3: {
//     width: 122,
//     height: 52,
//     backgroundColor: "rgba(255,255,255,1)",
//     borderRadius: 25,
//     marginTop: 232,
//     marginLeft: 217
//   },
//   next1: {
//     color: "rgba(249,71,35,1)",
//     fontSize: 20,
//     marginTop: 14,
//     marginLeft: 40
//   }
// });

export default Registration04;
