import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";

function LoginScreen(props) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/images/angryimg_(1)1.png")}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <Image
                    source={require("../assets/images/output-onlinepngtools_(2)1.png")}
                    resizeMode="contain"
                    style={styles.image2}
                ></Image>
                <Text style={styles.tenderRecipes}>Tender Recipes</Text>
                <View style={styles.iconRow}>
                    <IoniconsIcon name="md-person" style={styles.icon}></IoniconsIcon>
                    <TextInput
                        placeholder=" Username"
                        placeholderTextColor="rgba(230, 230, 230,1)"
                        inlineImagePadding={0}
                        selectionColor="rgba(52,250,215,1)"
                        style={styles.textInput}
                    ></TextInput>
                </View>
                <View style={styles.icon2Row}>
                    <EntypoIcon name="lock" style={styles.icon2}></EntypoIcon>
                    <TextInput
                        placeholder=" Password"
                        placeholderTextColor="rgba(230, 230, 230,1)"
                        selectionColor="rgba(52,250,215,1)"
                        secureTextEntry={true}
                        style={styles.textInput2}
                    ></TextInput>
                </View>
                <View style={styles.loginStackRow}>
                    <View style={styles.loginStack}>
                        <Text style={styles.login}>Login</Text>
                        <TouchableOpacity style={styles.button}></TouchableOpacity>
                    </View>
                    <View style={styles.signUpStack}>
                        <Text style={styles.signUp}>Sign up</Text>
                        <TouchableOpacity style={styles.button1}></TouchableOpacity>
                    </View>
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
    image2: {
        width: 200,
        height: 200,
        borderRadius: 57,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,1)",
        borderStyle: "solid",
        marginTop: 57,
        marginLeft: 80
    },
    tenderRecipes: {
        fontFamily: "big-shoulders-display-700",
        color: "rgba(251,251,251,1)",
        fontSize: 36,
        marginTop: 17,
        marginLeft: 89
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 31,
        height: 34,
        width: 23,
        marginTop: 1
    },
    textInput: {
        fontFamily: "helvetica-regular",
        color: "rgba(253,253,253,1)",
        width: 276,
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
        inlineImageLeft: "0",
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
        width: 31
    },
    textInput2: {
        fontFamily: "helvetica-regular",
        color: "#121212",
        height: 35,
        width: 276,
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
    login: {
        top: 11,
        position: "absolute",
        fontFamily: "helvetica-regular",
        color: "rgba(249,71,35,1)",
        letterSpacing: 1,
        fontSize: 14,
        left: 55
    },
    button: {
        top: 0,
        position: "absolute",
        backgroundColor: "rgba(253,253,253,1)",
        borderRadius: 10,
        left: 0,
        height: 36,
        width: 150
    },
    loginStack: {
        width: 150,
        height: 36
    },
    signUp: {
        top: 11,
        position: "absolute",
        fontFamily: "helvetica-regular",
        color: "rgba(249,71,35,1)",
        letterSpacing: 1,
        fontSize: 14,
        left: 48
    },
    button1: {
        top: 0,
        position: "absolute",
        backgroundColor: "rgba(253,253,253,1)",
        borderRadius: 10,
        left: 0,
        height: 36,
        width: 150
    },
    signUpStack: {
        width: 150,
        height: 36,
        marginLeft: 6
    },
    loginStackRow: {
        height: 36,
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 27,
        marginRight: 27
    },
    activityIndicator: {
        marginTop: 34,
        marginLeft: 161
    }
});

export default LoginScreen;
