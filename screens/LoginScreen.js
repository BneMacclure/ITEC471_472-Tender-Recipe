import React, { Component , useState} from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    Alert,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Image as ReactImage } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {firebaseApp} from '../config/DatabaseConfig';
import styles from '../styles/LoginStyles.js';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
//import { TextInput } from 'react-native-paper';

import Svg, { Image, Circle, ClipPath } from 'react-native-svg';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const {Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat} = Animated

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)

        //STATE VARIABLES
        this.state = {
            email: "", //email for login
            password: "", //password for login
            loading: false,
            isReady: false,
        }

        this.buttonOpacity = new Value(1)
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                    ])
            }
        ]);
        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                    ])
            }
        ]);
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-SCREEN_HEIGHT / 1.05, 0],
            extrapolate: Extrapolate.CLAMP,
        });
        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP,
        });
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP,
        });
        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP,
        });
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP,
        });
    }
    //

    startLoading() {
        this.setState({loading: true})
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    };

    // Function for login. Uses firebase authentication

    loginFunc() {
      //activates the activity indicator's animation
      this.startLoading();
      console.log(this.state.email)
      console.log(this.state.password)
      // check if valid login
      firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main Screen'))
      .catch(error => Alert.alert(
          "Login",
          "Invalid login information" + error,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        )
      )
    };

    // Function for login. Uses firebase authentication
    debugLoginFunc() {
        //activates the activity indicator's animation
        this.startLoading();
        // check if valid login
        firebaseApp
        .auth()
        .signInWithEmailAndPassword("Sleep@sleep.com", "Password")
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
    registerFunc() {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
          }
        else {
            firebaseApp
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
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

    render() {
        return (

            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#E35614"
                />
                <ImageBackground
                    source={require("../assets/images/login_bg.png")}
                    resizeMode="cover"
                    style={styles.image}
                    imageStyle={styles.bgStyle}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                        <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                            <Svg height={SCREEN_HEIGHT+50} width={SCREEN_WIDTH}>
                                <ClipPath id="clip">
                                    <Circle r={SCREEN_HEIGHT+50} cx={SCREEN_WIDTH / 2} />
                                </ClipPath>
                                <Image
                                    href={require('../assets/images/login_splash_bg.jpg')}
                                    width= {SCREEN_WIDTH}
                                    height={SCREEN_HEIGHT+50}
                                    preserveAspectRatio='xMidYMid slice'
                                    clipPath="url(#clip)"
                                />
                            </Svg>

                        </Animated.View>
                            <View style={{ height: SCREEN_HEIGHT / 3, justifyContent: 'center' }}>

                                {/*DISPLAY LOGIN BUTTON FOR THE FRONT PAGE. IT DOES NOT LOGIN, IT TRIGGERS THE FRONT IMAGE TO RECEDE.*/}
                                <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                    <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                        <Text style={styles.loginCover}>LOG IN</Text>
                                    </Animated.View>
                                </TapGestureHandler>

                                {/*REGISTER BUTTON FOR THE FRONT PAGE. IT SHOULD REDIRECT TO REGISTRATION PAGE.*/}
                                <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                                        //style={styles.button}
                                        testID='registerButton'
                                    >
                                        <Text style={styles.signUp}>SIGN UP</Text>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View style={{ zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform: [{ translateY: this.textInputY }], height: SCREEN_HEIGHT / 1.11, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>

                                    {/*LITTLE 'X' BUTTON TO CLOSE OUT LOGIN PAGE*/}
                                    <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                        <Animated.View style={styles.closeButton}>
                                            <Animated.Text style={{ fontSize: 15, transform: [{rotate:concat(this.rotateCross, 'deg')}]}}>X</Animated.Text>
                                        </Animated.View>
                                    </TapGestureHandler>

                                    {/*LOGO*/}
                                    <View style={{ height: SCREEN_HEIGHT / 1.2, alignContent: 'center' }}>
                                    <ReactImage
                                        source={require("../assets/images/logo.png")}
                                        resizeMode="contain"
                                        style={styles.logo}
                                    ></ReactImage>
                                    <Text style={styles.tenderRecipes}>Tender Recipes</Text>

                                    {/*USERNAME AND PASSWORD TEXTINPUTS*/}
                                    <KeyboardAvoidingView
                                        behavior='padding'
                                        keyboardVerticalOffset={
                                            Platform.select({
                                                ios: () => 0,
                                                android: () => -200
                                            })()
                                        } enabled>
                                        <View style={styles.usernameGroup}>
                                        <IoniconsIcon name="md-person" style={styles.icon}></IoniconsIcon>
                                            <TextInput
                                                testID='emailInput'
                                                placeholder="Email"
                                                placeholderTextColor="rgba(150,150,150,1)"
                                                inlineImagePadding={0}
                                                selectionColor="rgba(52,250,215,1)"
                                                autoCapitalize="none"
                                                style={styles.textInput}
                                                onChangeText={(email) => this.setState({ email: email })}
                                            ></TextInput>
                                        </View>

                                        <View style={styles.passwordGroup}>
                                            <EntypoIcon name="lock" style={styles.icon2}></EntypoIcon>
                                            <TextInput
                                                testID='passwordInput'
                                                placeholder="Password"
                                                placeholderTextColor="rgba(150,150,150,1)"
                                                selectionColor="rgba(52,250,215,1)"
                                                secureTextEntry={true}
                                                style={styles.textInput2}
                                                onChangeText={(password) => this.setState({ password: password })}
                                            ></TextInput>
                                        </View>
                                    </KeyboardAvoidingView>

                                    {/*ACTUAL LOGIN BUTTON. LOGIN FUNCTIONALITY GOES HERE.*/}
                                    <Animated.View style={styles.loginBtn}>
                                        <TouchableOpacity
                                            onPress={() => this.loginFunc()}
                                            style={styles.loginBtn}
                                            testID='loginButton'
                                        >
                                            <Text style={styles.login}>LOG IN</Text>
                                        </TouchableOpacity>
                                    </Animated.View>

                                    <ActivityIndicator
                                        animating={this.state.loading}
                                        color="rgba(254,242,94,1)"
                                        size="large"
                                        style={styles.activityIndicator}
                                    ></ActivityIndicator>
                                    </View>
                                </Animated.View>
                            </View>
                        </View>

                    </ImageBackground>
            </View>

        );
    }
}
