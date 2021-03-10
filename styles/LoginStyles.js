import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1
    },
    image_imageStyle: {},
    logo: {
        width: 200,
        height: 200,
        borderRadius: 57,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,1)",
        marginTop: SCREEN_HEIGHT / 15,
        alignSelf: "center"
    },
    tenderRecipes: {
        fontFamily: 'BigShouldersDisplay_700Bold',
        color: "rgba(251,251,251,1)",
        fontSize: 36,
        marginTop: 10,
        alignSelf: "center"
    },
    iconRow: {
        height: 35,
        flexDirection: "row",
        marginTop: 69,
        marginLeft: 31,
        marginRight: 26
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 31,
        height: 34,
        width: 28,
        marginTop: 1,
        marginRight: 1
    },
    textInput: {
        //fontFamily: "helvetica-regular",

        color: "rgba(255,255,255,1)",
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,1)",    
        lineHeight: 14,
        letterSpacing: 1,
        textAlign: "left",
        //inlineImageLeft: "0",

        fontSize: 16,
        height: 35,
        marginLeft: 4,
        paddingLeft: 8
    },
    icon2Row: {
        height: 35,
        flexDirection: "row",
        marginTop: 26,
        marginLeft: 27,
        marginRight: 26
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 31,
        height: 35,
        width: 34
    },
    textInput2: {
        //fontFamily: "helvetica-regular",
        color: "rgba(255,255,255,1)",
        height: 35,
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,1)", 
        fontSize: 16,
        letterSpacing: 1,
        paddingLeft: 8
    },

    textInputShadow: {
        shadowColor: "rgba(206,203,203,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    
    loginBtn: {
        width: 149,
        height: 36,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 10,
        justifyContent: "center"
    },
    login: {
        //fontFamily: "roboto-regular",
        color: "rgba(249,71,35,1)",
        alignSelf: "center"
    },
    signupBtn: {
        width: 149,
        height: 36,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginLeft: 4,
    },
    signUp: {
        //fontFamily: "roboto-regular",
        color: "rgba(249,71,35,1)",
        alignSelf: "center"
    },
    loginBtnRow: {
        height: 36,
        flexDirection: "row",
        marginTop: 30,
        alignSelf: "center",
        shadowColor: "rgba(206,203,203,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    activityIndicator: {
        marginTop: 50,
        alignSelf: "center"
    },

    usernameGroup: {
        width: 276,
        height: 35,
        flexDirection: "row",
        marginTop: 60,
        alignSelf: "center",
        marginRight: 30
    },
    passwordGroup: {
        width: 276,
        height: 35,
        flexDirection: "row",
        marginTop: 26,
        alignSelf: "center",
        marginRight: 30
    }

});