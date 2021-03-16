import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    backImg: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    },
    backImg_imageStyle: {},
    registrationText: {
      color: "rgba(255,255,255,1)",
      fontSize: 40,
      marginTop: Expo.Constants.statusBarHeight,
      marginLeft: '20%'
    },
    inputStyle: {
        backgroundColor: "#E35614",
        justifyContent: 'center',
        width: 250,
        marginTop: 10,
        marginLeft: SCREEN_WIDTH / 5
    },
    signUpBtn: {
      width: 214,
      height: 59,
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 0,
      borderColor: "#000000",
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      marginLeft: SCREEN_WIDTH / 4
    },
    signUpTxt: {
      color: "rgba(249,71,35,1)",
      fontSize: 24
    },
    loremIpsum1: {
      color: "rgba(255,255,255,1)",
      fontSize: 30,
      marginTop: 56,
      marginLeft: 37
    },
    button: {
      width: 151,
      height: 71,
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 157,
      marginLeft: 112
    },
    beginner: {
      color: "rgba(249,71,35,1)",
      fontSize: 20,
      marginTop: 23,
      marginLeft: 40
    },
    button2: {
      width: 151,
      height: 71,
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 15,
      marginLeft: 112
    },
    intermediate: {
      color: "rgba(249,71,35,1)",
      fontSize: 20,
      marginTop: 24,
      marginLeft: 23
    },
    button3: {
      width: 151,
      height: 71,
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 13,
      marginLeft: 112
    },
    advanced: {
      color: "rgba(249,71,35,1)",
      fontSize: 20,
      marginTop: 24,
      marginLeft: 31
    },
    button4: {
      width: 122,
      height: 52,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 25,
      marginTop: 222,
      marginLeft: 216
    },
    next1: {
      color: "rgba(249,71,35,1)",
      fontSize: 20,
      marginTop: 14,
      marginLeft: 40
    }
  });