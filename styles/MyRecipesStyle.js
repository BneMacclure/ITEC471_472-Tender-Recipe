import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,1)"
    },
    image: {
      width: SCREEN_WIDTH,
      height: 46,
      flexDirection: "row",
    },
    image_imageStyle: {},
    filter: {
      color: "#121212",
      height: 30,
      fontSize: 20,
      marginTop: 0
    },
    icon: {
      color: "rgba(0,0,0,1)",
      fontSize: 40,
      height: 40,
      width: 31,
      marginLeft: 1,
      marginTop: 2
    },
    trashButton: {
      width: 30,
      height: 30,
      marginLeft: '90%',
      bottom: 45
    },
    filterRow: {
      height: 22,
      flex: 1,
      marginRight: 17,
      marginLeft: 272,
      marginTop: 14
    },
    filterPicker: {
      bottom: 10,
      marginLeft: 0
    },
    item: {
      backgroundColor: '#8c8c8c',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    image2: {
      width: SCREEN_WIDTH,
      height: 140,
      marginTop: 1
    },
    image2_imageStyle: {},
    recText: {
      color: "rgba(255,255,255,1)",
      fontSize: 35,
      marginTop: 84,
      marginLeft: 8
    },
    addButton: {
        width: 30,
        height: 30,
        marginLeft: '80%',
        bottom: 73
    },

    addIcon: {
        color: "rgba(0,0,0,1)",
        fontSize: 38,
        height: 40,
        width: 41,
        marginLeft: 1,
        marginTop: 2
    },
  });