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
    StatusBar,
    Dimensions
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {firebaseApp} from '../config/DatabaseConfig';
import styles from '../styles/LoginStyles.js';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const LoginScreen = (props) => {
    //
    const [loading, setLoading] = useState(false);
    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    const [email, setEmail] = useState(""); // email for login
    const [password, setPassword] = useState(""); // password for login
    // Function for login. Uses firebase authentication
    const loginFunc = () => {
      //activates the activity indicator's animation
      startLoading();
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

    // Function for login. Uses firebase authentication
    const debugLoginFunc = () => {
        //activates the activity indicator's animation
        startLoading();
        // check if valid login
        firebaseApp
        .auth()
        .signInWithEmailAndPassword("test@radford.edu", "password")
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
            <StatusBar
                backgroundColor="#E35614"
                />
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
                        testID='emailInput'
                        placeholder="Email"
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
                        testID='passwordInput'
                        placeholder="Password"
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
                        testID='loginButton'
                    >
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('RegisterScreen')}
                        testID='registerButton'
                        //onPress={registerFunc} //insert navigation
                        style={styles.signupBtn}
                    >
                        <Text style={styles.signUp}>Sign up</Text>
                    </TouchableOpacity>
                    {/*DEBUG BUTTON*/}
                    <TouchableOpacity
                        onPress={ debugLoginFunc }
                        //onPress={registerFunc} //insert navigation
                        style={styles.signupBtn}
                    >
                        <Text style={styles.signUp}>Debug Login</Text>
                    </TouchableOpacity>
                </View>

                <ActivityIndicator
                    animating={loading}
                    color="rgba(254,242,94,1)"
                    size="large"
                    style={styles.activityIndicator}
                ></ActivityIndicator>

            </ImageBackground>
        </View>
    );
}

export default LoginScreen;