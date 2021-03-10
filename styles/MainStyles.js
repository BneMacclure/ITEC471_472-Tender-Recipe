import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },

    skip_buttonRow: {
        height: 60,
        flexDirection: "row",
        marginTop: 65,
        alignSelf: 'center',
        padding: 70
    },

    skip_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100
    },
    icon: {
        //color: "rgba(80,220,232,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        marginTop: 8,
        marginLeft: 12
    },
    recipe_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        marginLeft: 43
    },
    icon4: {
        //color: "rgba(80,207,12,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        marginTop: 10,
        marginLeft: 15
    },
    like_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        justifyContent: "center",
        marginLeft: 39
    },
    icon2: {
        //color: "rgba(244,57,8,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        alignSelf: "center"
    },

    background: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    background_imageStyle: {},
    materialHeader1: {
        height: '100%',
        width: '100%',
        position: "absolute",
        top: 0,
        left: 0
    },
});