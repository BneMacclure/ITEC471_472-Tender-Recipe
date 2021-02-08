import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    Alert,
    Dimensions
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function LoginScreen(props) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/images/login_bg.png")}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <Image
                    source={require("../assets/images/logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                ></Image>
                <Text style={styles.tenderRecipes}>Tender Recipes</Text>


                <View style={styles.usernameGroup}>
                    <IoniconsIcon name="md-person" style={styles.icon}></IoniconsIcon>
                    <TextInput
                        placeholder=" Username"
                        placeholderTextColor="rgba(230, 230, 230,1)"
                        inlineImagePadding={0}
                        selectionColor="rgba(52,250,215,1)"
                        style={styles.textInput}
                    ></TextInput>
                </View>
                <View style={styles.passwordGroup}>
                    <EntypoIcon name="lock" style={styles.icon2}></EntypoIcon>
                    <TextInput
                        placeholder=" Password"
                        placeholderTextColor="rgba(230, 230, 230,1)"
                        selectionColor="rgba(52,250,215,1)"
                        secureTextEntry={true}
                        style={styles.textInput2}
                    ></TextInput>
                </View>


                <View style={styles.loginBtnRow}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Untitled1")} //insert navigation
                        style={styles.loginBtn}
                    >
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Untitled1")} //insert navigation
                        style={styles.signupBtn}
                    >
                        <Text style={styles.signUp}>Sign up</Text>
                    </TouchableOpacity>
                </View>


                <ActivityIndicator
                    color="rgba(254,242,94,1)"
                    size="large"
                    style={styles.activityIndicator}
                ></ActivityIndicator>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
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

        color: "rgba(253,253,253,1)",
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,1)",
        shadowColor: "rgba(206,203,203,1)",
        shadowOffset: {
            height: 3,
            width: 3
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
        lineHeight: 14,
        letterSpacing: 1,
        textAlign: "left",
        //inlineImageLeft: "0",

        fontSize: 16,
        height: 35,
        marginLeft: 4
    },
    iconRow: {
        height: 35,
        flexDirection: "row",
        marginTop: 69,
        marginLeft: 31,
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
        color: "#121212",
        height: 35,
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,1)",
        shadowColor: "rgba(206,203,203,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
        fontSize: 16
    },
    icon2Row: {
        height: 35,
        flexDirection: "row",
        marginTop: 26,
        marginLeft: 27,
        marginRight: 26
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
        alignSelf: "center"
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

export default LoginScreen;