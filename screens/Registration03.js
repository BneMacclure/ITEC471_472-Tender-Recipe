import React, { Component } from "react";
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
class Registration03 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      btn1Act:false,
      btn2Act:false
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
            What is your preferred {"\n"} measurement units?
          </Text>
          <View style={styles.rectRow}>
            <TouchableOpacity 
              onPress={() => this.setState({btn1Act: !this.state.btn1Act, btn2Act: false})}
              style={this.state.btn1Act? styles.horzInpBtnActive : styles.horzInpBtnInactive}>
              <Text style={this.state.btn1Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Metric</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({btn2Act: !this.state.btn2Act, btn1Act: false})}
              style={this.state.btn2Act? styles.horzInpBtnActive : styles.horzInpBtnInactive}>
              <Text style={this.state.btn2Act? styles.inpBtnTxtActive : styles.inpBtnTxtInactive}>Imperial</Text>
            </TouchableOpacity>
          </View>
          {/* Spacer */}
          <View style={{marginTop:330}}></View>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Registration04')}
            style={styles.nextBtn}>
            <Text style={styles.nextBtnTxt}>Next</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
  
}

export default Registration03;
