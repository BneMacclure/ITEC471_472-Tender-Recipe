import React, { Component, useState, useEffect } from "react";
import { db, firebaseApp } from '../config/DatabaseConfig';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillLevel, setLevel] = useState('');
  const [prefMeasurement, setMeasurement] = useState('');
  const [allergies, setAllergies] = useState('');

  /* Pulls data from the Firebase database */
  const retrieveData = () => {

    var currentUserID = firebaseApp.auth().currentUser.uid;
    db.ref('/userInfo/'+currentUserID).on('value', (snapshot) => {
      data = snapshot.val()
      setName(data.name)
      setLevel(data.skillLevel)
      setMeasurement(data.prefMeasurement)
      setAllergies(data.allergies)
    });
    setEmail(firebaseApp.auth().currentUser.email);
  }

  useEffect(() => {
    retrieveData();
  });

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/Gradient.png")}
          resizeMode="stretch"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        >
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 116 104" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(230, 230, 230,1)"
                cx={58}
                cy={52}
                rx={58}
                ry={52}
              ></Ellipse>
            </Svg>
            <Icon name="ios-person" style={styles.icon}></Icon>
          </View>
          <Text style={styles.johnDoe}>{name}</Text>
        </ImageBackground>
        <View style={styles.emailContStack}>
          <View style={styles.emailCont}>
            <Text style={styles.email}>Email: {email}</Text>
          </View>
          <View style={styles.skillCont}>
            <Text style={styles.skillLevel}>Skill Level: {skillLevel}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.beginner}>Beginner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1}>
                <Text style={styles.intermediate}>Intermediate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2}>
                <Text style={styles.advanced}>Advanced</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.measurementsCont}>
          <View style={styles.preferredRow}>
            <Text style={styles.preferred}>Preferred Measurements:</Text>
            <Text style={styles.us}>{prefMeasurement}</Text>
          </View>
        </View>
        <View style={styles.skillCont1}>
          <Text style={styles.allergies}>Allergies</Text>
          <Text style={styles.allergiesList}>
            {allergies}
          </Text>

        </View>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.changePassword}>Change Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.deleteAccount}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('MyRecipes')}
        style={styles.myRecipesButton}>
            <Text style={styles.myRecipesText}>My recipes</Text>
        </TouchableOpacity>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: 375,
    height: 289
  },
  image_imageStyle: {},
  ellipse: {
    top: 9,
    width: 116,
    height: 104,
    position: "absolute",
    left: 0
  },
  icon: {
    top: 0,
    left: 18,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 107,
    height: 117,
    width: 80
  },
  ellipseStack: {
    width: 116,
    height: 117,
    marginTop: 86,
    marginLeft: 122
  },
  johnDoe: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 40,
    marginTop: 11,
    marginLeft: 96
  },
  emailCont: {
    top: 0,
    left: 0,
    width: 360,
    height: 46,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  email: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 19
  },
  skillCont: {
    width: 360,
    height: 70,
    position: "absolute",
    backgroundColor: "rgba(218,218,218,1)",
    top: 44,
    left: 0
  },
  skillLevel: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 9,
    marginLeft: 19
  },
  button: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginTop: 1
  },
  beginner: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 14
  },
  button1: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginLeft: 27,
    marginTop: 1
  },
  intermediate: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 1
  },
  button2: {
    width: 82,
    height: 18,
    backgroundColor: "#E6E6E6",
    marginLeft: 31
  },
  advanced: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 10
  },
  buttonRow: {
    height: 19,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 21,
    marginRight: 35
  },
  emailContStack: {
    width: 360,
    height: 114
  },
  measurementsCont: {
    width: 360,
    height: 46,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    marginTop: 1,
    marginLeft: 1
  },
  preferred: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20
  },
  us: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginLeft: 69
  },
  preferredRow: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    marginRight: 24,
    marginLeft: 16,
    marginTop: 14
  },
  skillCont1: {
    width: 360,
    height: 68,
    backgroundColor: "rgba(218,218,218,1)"
  },
  allergies: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 17
  },
  allergiesList: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 16,
    marginTop: 6,
    marginLeft: 17
  },
  button3: {
    width: 360,
    height: 36,
    backgroundColor: "rgba(164,164,164,1)",
    marginTop: 150
  },
  changePassword: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 10,
    marginLeft: 111
  },
  button4: {
    width: 360,
    height: 36,
    backgroundColor: "rgba(230,0,0,1)"
  },
  deleteAccount: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 10,
    marginLeft: 123
  },
  myRecipesButton: {
    width: 76,
    height: 59,
    backgroundColor: "#E6E6E6",
    marginTop: -131,
    marginLeft: 284
  },
  myRecipesText: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 21,
    marginLeft: 7
  }
});

export default Profile;
