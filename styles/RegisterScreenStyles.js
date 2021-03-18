import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    backImg: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      alignItems: 'center'
    },
    backImg_imageStyle: {},
    registrationText: {
      color: "rgba(255,255,255,1)",
      fontSize: 40,
      marginTop: Constants.statusBarHeight,
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
    reg2Header: {
      color: "rgba(255,255,255,1)",
      fontSize: 32,
      marginTop: Constants.statusBarHeight,
      // marginLeft: '15%'
    },
    vertInpBtnInactive: {
      width: 200,
      height: 71,
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 20,
      // marginLeft: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    vertInpBtnActive: {
      width: 200,
      height: 71,
      backgroundColor: "transparent",
      borderWidth: 4,
      borderColor: "rgba(227,24,20,1)",
      marginTop: 20,
      // marginLeft: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    horzInpBtnInactive: {
      width: 200,
      height: 71,
      backgroundColor: "rgba(255,255,255,1)",
      marginTop: 20,
      // marginLeft: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    horzInpBtnActive: {
      width: 200,
      height: 71,
      backgroundColor: "transparent",
      borderWidth: 4,
      borderColor: "rgba(227,24,20,1)",
      marginTop: 20,
      // marginLeft: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    inpBtnTxtInactive: {
      color: "rgba(249,71,35,1)",
      fontSize: 24
    },
    inpBtnTxtActive: {
      color: "white",
      fontSize: 24
    },
    nextBtn: {
      width: 122,
      height: 52,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 25,
      marginLeft: SCREEN_WIDTH - 150,
      alignItems: 'center',
      justifyContent: 'center'
    },
    nextBtnTxt: {
      color: "rgba(249,71,35,1)",
      fontSize: 20
    },
    rectRow: {
      height: 71,
      flexDirection: "row",
      marginTop: 175
    },
    allergyBtnRow: {
      height: 44,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 25,
      marginRight: 24
    },
    allergyBtnInactive: {
      width: 105,
      height: 44,
      backgroundColor: "rgba(255,255,255,1)",
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    allergyBtnActive: {
      width: 105,
      height: 44,
      backgroundColor: "transparent",
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4,
      borderColor: "rgba(227,24,20,1)",
    },
    allergyBtnTxtInactive: {
      color: "rgba(249,71,35,1)",
      fontSize: 20
    },
    allergyBtnTxtActive: {
      color: "white",
      fontSize: 20
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
    }
  });