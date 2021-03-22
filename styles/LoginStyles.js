import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        flex: 1,
        
    },
    image: {
        flex: 1
    },
    bgStyle: {
    },
    logo: {
        width: SCREEN_WIDTH / 3, //2, 3
        height: SCREEN_HEIGHT / 6.6, //5.6, 6.6
        borderRadius: 57,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,1)",
        marginTop: SCREEN_HEIGHT / 20,
        alignSelf: "center"
    },
    tenderRecipes: {
        fontFamily: 'BigShouldersDisplay_700Bold',
        color: "rgba(251,251,251,1)",
        fontSize: 48,
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
        fontSize: 35,
        height: 35,
        width: 33,
        marginTop: 3,
        marginRight: 1
    },
    textInput: {
        //fontFamily: "helvetica-regular",

        color: "rgba(249,71,35,1)",
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(235,235,235,1)",    
        lineHeight: 14,
        letterSpacing: 1,
        textAlign: "left",
        //inlineImageLeft: "0",
        backgroundColor: 'white',
        fontSize: 18,
        height: 45,
        marginLeft: 4,
        paddingLeft: 8,
        justifyContent: "center",
        textAlignVertical: "center"
    },
    icon2Row: {
        height: 40,
        flexDirection: "row",
        marginTop: 26,
        marginLeft: 27,
        marginRight: 26
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 38,
        height: 38,
        width: 34,
        marginTop: 2,
        marginRight: 5
    },
    textInput2: {
        //fontFamily: "helvetica-regular",
        color: "rgba(249,71,35,1)",
        backgroundColor: 'white',
        height: 45,
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(235,235,235,1)", 
        fontSize: 18,
        letterSpacing: 1,
        paddingLeft: 8,
        justifyContent: "center",
        textAlignVertical: "center"
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
        backgroundColor: 'white',
        height: 50,
        width: SCREEN_WIDTH / 1.2,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 50,
    },
    login: {
        //fontFamily: "roboto-regular",
        color: "rgba(249,71,35,1)",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 20
    },
    loginCover: {
        //fontFamily: "roboto-regular",
        color: "rgba(249,71,35,1)",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 18,
    },
    signupBtn: {
        width: 149,
        height: 36,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 10,
        marginLeft: 4,
    },
    signUp: {
        //fontFamily: "roboto-regular",
        color: "rgba(249,71,35,1)",
        alignSelf: "center",
        //justifyContent: "center",
        paddingTop: 7,
        fontSize: 18,
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
        //marginTop: 60,
        marginTop: SCREEN_WIDTH / 10,
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
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: "rgba(225,225,225,1)",

    },

    textInputTutorial: {
        height: 35,
        borderRadius: 10,
        borderWidth: 3,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: "rgba(255,255,255,1)",
        lineHeight: 14,
        letterSpacing: 1,
        textAlign: "left",
        //inlineImageLeft: "0",

        fontSize: 16,
        marginLeft: 4,
        paddingLeft: 8,
        textAlignVertical: "center"
    },

    closeButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: SCREEN_WIDTH / 2 - 20

    }

});