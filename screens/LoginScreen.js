import React, { Component , useState} from "react";
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
import {firebaseApp} from '../config/DatabaseConfig';


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function LoginScreen(props) {
    const [email, setEmail] = useState(""); // email for login
    const [password, setPassword] = useState(""); // password for login
    // Function for login. Uses firebase authentication
    const loginFunc = () => {
      // check if valid login
      firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate('Main Screen'))
      .catch(error => Alert.alert(
          "Login",
          "Invalid login information",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        )
      )
    };

    // Function for registering an account. Uses firbase's authentication API to signup
    const registerFunc = () => {
        if(email === '' && password === '') {
            Alert.alert('Enter details to signup!')
          } 
        else {
            firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => Alert.alert(
                "Register",
                "You're registered! Enjoy!",
                [
                    {text: "OK", onPress: () => console.log("Register OK pressed") }
                ],
                { cancelable: false }
            ))
            .catch(error => Alert.alert(
                "Register",
                "Invalid information",
                [
                    {text: "OK", onPress: () => console.log("OK pressed") }
                ],
                { cancelable: false }
            ))
        }
    };

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
                        placeholder=" Email"
                        placeholderTextColor="rgba(230, 230, 230,1)"
                        inlineImagePadding={0}
                        selectionColor="rgba(52,250,215,1)"
                        style={styles.textInput}
                        onChangeText={(email) => setEmail(email)}
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
                        onChangeText={(password) => setPassword(password)}
                    ></TextInput>
                </View>


                <View style={styles.loginBtnRow}>
                    <TouchableOpacity
                        onPress={ loginFunc } //insert navigation
                        style={styles.loginBtn}
                    >
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={registerFunc} //insert navigation
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

        color: "rgba(253,253,253,1)",
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
        marginLeft: 4
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
        color: "#121212",
        height: 35,
        width: 275,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,1)", 
        fontSize: 16
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

export default LoginScreen;