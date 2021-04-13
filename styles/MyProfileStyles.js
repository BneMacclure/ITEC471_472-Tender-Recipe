import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: "#fff"
    },
    image: {
      width: SCREEN_WIDTH,
      height: 289,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image_imageStyle: {},
    ellipse: {
      top: '5%',
      left: '5%',
      width: 116,
      height: 116,    
    },
    icon: {
      top: '1%',
      // left: '6%',
      position: "absolute",
      color: "rgba(128,128,128,1)",
      fontSize: 107,
      height: 117,
      width: 100
    },
    ellipseStack: {
      width: 116,
      height: 117,
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: 86,
      // marginLeft: 122
    },
    johnDoe: {
      color: "#121212",
      fontSize: 40,
      marginTop: 10,
      // marginLeft: (SCREEN_WIDTH / 4)
    },
    emailCont: {
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: 46,
      position: "absolute",
      backgroundColor: "#E6E6E6"
    },
    email: {
      color: "#121212",
      fontSize: 20,
      marginTop: 11,
      marginLeft: 19
    },
    skillCont: {
      width: SCREEN_WIDTH,
      height: 70,
      position: "absolute",
      backgroundColor: "rgba(218,218,218,1)",
      justifyContent: 'center',
      top: 44,
      left: 0
    },
    skillLevel: {
      color: "#121212",
      fontSize: 20,
      // marginTop: 9,
      marginLeft: 19
    },
    skillPicker: {
      bottom: 5,
      left: 10
    },
    button: {
      width: 82,
      height: 18,
      backgroundColor: "#E6E6E6",
      marginTop: 1
    },
    beginner: {
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
    infoRow: {
      flexDirection: "row",
    },
    emailContStack: {
      width: SCREEN_WIDTH,
      height: 114
    },
    measurementsCont: {
      width: SCREEN_WIDTH,
      height: 50,
      backgroundColor: "#E6E6E6",
      marginTop: 0,
      marginLeft: 0
    },
    measPicker: {
      bottom: 5,
      marginLeft: 10
    },
    preferred: {
      color: "#121212",
      fontSize: 20
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
      width: SCREEN_WIDTH,
      height: 68,
      backgroundColor: "rgba(218,218,218,1)"
    },
    allergies: {
      color: "#121212",
      fontSize: 20,
      marginTop: 10,
      marginLeft: 17
    },
    allergiesList: {
      color: "#121212",
      fontSize: 16,
      marginTop: 6,
      marginLeft: 17
    },
    changePasswordButton: {
      width: '50%',
      height: 36,
      left: -5,
      borderRadius: 10,
      justifyContent: "center",
      backgroundColor: "rgba(164,164,164,1)"
    },
    changePasswordText: {
      color: "#121212",
      alignSelf: "center"
    },
    deleteAccountButton: {
      width: '50%',
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      backgroundColor: "rgba(230,0,0,1)",
      left: 5,
    },
    deleteAccount: {
      color: "#121212",
      alignSelf: "center"
    },
    button3Row: {
      height: 36,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 17,
      marginRight: 15
    },
    myRecipesButton: {
      width: 155,
      height: 37,
      backgroundColor: "#E6E6E6",
      borderRadius: 10,
      justifyContent: "center",
      marginTop: 10,
      marginLeft: '30%'
    },
    myRecipesText: {
      color: "#121212",
      alignSelf: "center"
    }
  });