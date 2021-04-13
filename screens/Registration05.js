import React, { Component, useState } from "react";
import { db, firebaseApp } from '../config/DatabaseConfig';
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
//import { set } from "cypress/types/lodash";

import styles from '../styles/RegisterScreenStyles.js';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function Registration05({navigation, route}) {
  const [wheat, setWheat] = useState(false);
  const [dairy, setDairy] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [fish, setFish] = useState(false);
  const [gluten, setGluten] = useState(false);
  const [treeNuts, setTreeNuts] = useState(false);
  const [peanuts, setPeanuts] = useState(false);
  const [shellfish, setShellfish] = useState(false);
  const [soy, setSoy] = useState(false);
  const [other, setOther] = useState("");
  const {name, email, phone, skillLevel, prefMeasurement, password, diet} = route.params;
  const [wheatAct, setWheatAct] = useState(false);
  const [dairyAct, setDairyAct] = useState(false);
  const [glutenAct, setGlutenAct] = useState(false);
  const [eggsAct, setEggsAct] = useState(false);
  const [fishAct, setFishAct] = useState(false);
  const [shellfishAct, setShellfishAct] = useState(false);
  const [treeNutAct, setTreeNutAct] = useState(false);
  const [peanutAct, setPeanutAct] = useState(false);
  const [soybeanAct, setSoybeanAct] = useState(false);

  const registerFunc5 = () => {
    firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        var currentUserID = firebaseApp.auth().currentUser.uid;
        var allergies = {
          wheat: wheat,
          dairy: dairy,
          eggs: eggs,
          fish: fish,
          gluten: gluten,
          treeNuts: treeNuts,
          peanuts: peanuts,
          shellfish: shellfish,
          soy: soy,
          other: other
        }
        db.ref('/userInfo/' + currentUserID).push({
          name: name,
          phone: phone,
          skillLevel: skillLevel,
          prefMeasurement: prefMeasurement,
          allergies: allergies,
          diet: diet
        }).then(() => {
          navigation.navigate('Main Screen')
        })

      })
    })
  }

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
		  TestID='wheat'
            onPress={() => setWheat(!wheat)}
            style={wheat? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={wheat? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Wheat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
		  TestID='dairy'
            onPress={() => setDairy(!dairy)}
            style={dairy? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={dairy? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Dairy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
		  TestID='gluten'
            onPress={() => setGluten(!gluten)}
            style={gluten? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={gluten? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Gluten</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.allergyBtnRow}>
          <TouchableOpacity 
		  TestID='egg'
            onPress={() => setEggs(!eggs)}
            style={eggs? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={eggs? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Eggs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
		  TestID='fish'
            onPress={() => setFish(!fish)}
            style={fish? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={fish? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity
			TestID='shellfish'
            onPress={() => setShellfish(!shellfish)}
            style={shellfish? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={shellfish? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Shellfish</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.allergyBtnRow}>
          <TouchableOpacity 
		  TestID='treenuts'
            onPress={() => setTreeNuts(!treeNuts)}
            style={treeNuts? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={treeNuts? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Tree nuts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
		  TestID='peanuts'
            onPress={() => setPeanuts(!peanuts)}
            style={peanuts? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={peanuts? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Peanuts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
		  TestID='soy'
            onPress={() =>  setSoy(!soy)}
            style={soy? styles.allergyBtnActive : styles.allergyBtnInactive}>
            <Text style={soy? styles.allergyBtnTxtActive : styles.allergyBtnTxtInactive}>Soybeans</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.other}>Other:</Text>
        {/* Spacer */}
        <View style={{marginTop: 225}}></View>
        <TextInput placeholder="" style={styles.nameInput1}></TextInput>
        <TouchableOpacity 
			TestID='nextBn5'
            onPress={() => registerFunc5()}
            style={styles.nextBtn}>
          <Text style={styles.nextBtnTxt}>Finish</Text>
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
  //       <Text style={styles.loremIpsum1}>Do you have any{"\n"} allergies?</Text>
  //       <View style={styles.button1Row}>
  //         <TouchableOpacity
  //         style={styles.button1}
  //         onPress={() => setWheat(!wheat)}>
  //           <Text style={styles.wheat}>Wheat</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button5}
  //         onPress={() => setDairy(!dairy)}>
  //           <Text style={styles.dairy}>Dairy</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button6}
  //         onPress={() => setGluten(!gluten)}>
  //           <Text style={styles.gluten}>Gluten</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View
  //       style={styles.button8Row}
  //       onPress={() => setEggs(!eggs)}>
  //         <TouchableOpacity style={styles.button8}>
  //           <Text style={styles.eggs}>Eggs</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button9}
  //         onPress={() => setFish(!fish)}>
  //           <Text style={styles.fish}>Fish</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button10}
  //         onPress={() => setShellfish(!shellfish)}>
  //           <Text style={styles.shellfish}>Shellfish</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.button11Row}>
  //         <TouchableOpacity
  //         style={styles.button11}
  //         onPress={() => setTreeNuts(!treeNuts)}>
  //           <Text style={styles.treeNuts}>Tree nuts</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button12}
  //         onPress={() => setPeanuts(!peanuts)}>
  //           <Text style={styles.peanuts}>Peanuts</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //         style={styles.button13}
  //         onPress={() => setSoy(!soy)}>
  //           <Text style={styles.soybeans}>Soybeans</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <Text style={styles.other}>Other:</Text>
  //       <TextInput
  //       placeholder=""
  //       style={styles.nameInput1}
  //       onChangeText={(other) => setOther(other)}></TextInput>
  //       <TouchableOpacity 
  //           onPress={() => registerFunc5()}
  //           style={styles.button7}>
  //         <Text style={styles.finish}>Finish</Text>
  //       </TouchableOpacity>
  //     </ImageBackground>
  //   </View>
  // );
}

export default Registration05;
