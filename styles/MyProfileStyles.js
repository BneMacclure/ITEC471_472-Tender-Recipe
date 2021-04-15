import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
  container: {
	  flex: 1,
	  backgroundColor: '#ffffff'
	},
  icon2: {
    color: "white",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 139,
    marginLeft: 137
  },
	image: {
	  width: SCREEN_WIDTH,
	  height: 393,
	  borderBottomLeftRadius: 25,
	  borderBottomRightRadius: 25,
	  alignItems: 'center',
	  marginTop: -65,
	  overflow: "hidden"
	},
	image_imageStyle: {},
 	image2_imageStyle: {
    	borderRadius: 100,
  	},
	image2: {
	  width: 182,
	  height: 182,
	  borderRadius: 100,
	  marginTop: 106,
	},
	johnDoe: {
	  color: "rgba(255,255,255,1)",
	  fontSize: 45,
	  fontWeight: 'bold',
	  marginTop: 27,
	},
	loremIpsum: {
	  color: "#121212",
	  fontSize: 25,
	  marginTop: 10,
	  marginLeft: 16
	},
	divider: {
		marginTop: 10,
	},
  row: {
    flexDirection: "row",
    alignItems: 'center'
  },
  arrowIcon: {
      top: 5,
      left: SCREEN_WIDTH - 40,
      position: 'absolute',
      color: "black",
      fontSize: 45,
  },
  profileBtn: {
    justifyContent: 'center'
  },
  deleteTxt: {
    color: '#ff0000',
	  fontSize: 25,
	  marginTop: 10,
	  marginLeft: 16
  },
  });