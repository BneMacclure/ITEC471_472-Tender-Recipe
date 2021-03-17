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

import styles from '../styles/RegisterScreenStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
class Registration05 extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      wheatAct:false,
      dairyAct:false,
      glutenAct:false,
      eggsAct:false,
      fishAct:false,
      shellfishAct:false,
      treeNutAct:false,
      peanutAct:false,
      soybeanAct:false
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
          <Text style={styles.reg2Header}>Do you have any{"\n"} allergies?</Text>
          {/* Spacer */}
          <View style={{marginTop:100}}></View>
          <View style={styles.allergyBtnRow}>
            <TouchableOpacity 
              onPress={() => this.setState({wheatAct: !this.state.wheatAct})}
              style={this.state.wheatAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.wheatAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Wheat</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({dairyAct: !this.state.dairyAct})}
              style={this.state.dairyAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.dairyAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Dairy</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({glutenAct: !this.state.glutenAct})}
              style={this.state.glutenAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.glutenAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Gluten</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.allergyBtnRow}>
            <TouchableOpacity 
              onPress={() => this.setState({eggsAct: !this.state.eggsAct})}
              style={this.state.eggsAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.eggsAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({fishAct: !this.state.fishAct})}
              style={this.state.fishAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.fishAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Fish</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({shellfishAct: !this.state.shellfishAct})}
              style={this.state.shellfishAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.shellfishAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Shellfish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.allergyBtnRow}>
            <TouchableOpacity 
              onPress={() => this.setState({treeNutAct: !this.state.treeNutAct})}
              style={this.state.treeNutAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.treeNutAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Tree nuts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({peanutAct: !this.state.peanutAct})}
              style={this.state.peanutAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.peanutAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Peanuts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({soybeanAct: !this.state.soybeanAct})}
              style={this.state.soybeanAct? styles.allergyBtnActive : styles.allergyBtnInactive}>
              <Text style={this.state.soybeanAct? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Soybeans</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.other}>Other:</Text>
          {/* Spacer */}
          <View style={{marginTop: 225}}></View>
          <TextInput placeholder="" style={styles.nameInput1}></TextInput>
          <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Login Page')}
              style={styles.nextBtn}>
            <Text style={styles.nextBtnTxt}>Finish</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
  
}

export default Registration05;
