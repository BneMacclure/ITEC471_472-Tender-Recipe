import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    },
    image_imageStyle: {},
    registration: {
      color: "rgba(255,255,255,1)",
      fontSize: 40,
      marginTop: Expo.Constants.statusBarHeight,
      marginLeft: '20%'
    },
    labelText: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 71
    },
    inputStyle: {
        backgroundColor: "#E35614",
        // height: 60,
        width: 250,
        marginTop: 10,
        marginLeft: 71,
        // borderWidth: 1,
        // borderColor: "#D9D5DC"
    },
    button: {
      width: 214,
      height: 59,
      backgroundColor: "rgba(255,255,255,1)",
      borderWidth: 0,
      borderColor: "#000000",
      borderRadius: 25,
      marginTop: 30,
      marginLeft: 81
    },
    signUp: {
      color: "rgba(249,71,35,1)",
      fontSize: 24,
      marginTop: 14,
      marginLeft: 66
    }
  });