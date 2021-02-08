import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
const Users = [
    { id: "1", uri: require('../assets/images/waffles.jpg') },
    { id: "2", uri: require('../assets/images/potato_wedges.jpg') },
    { id: "3", uri: require('../assets/images/salmon.jpg') },
    { id: "4", uri: require('../assets/images/burgers.jpg') },
    { id: "5", uri: require('../assets/images/choco_chip_cookies.jpg') },
]

export default class MainScreenInfo extends React.Component {

    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })

    }
    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {

                //swipe right
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe left
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe down
                else if (gestureState.dy > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe up
                else if (gestureState.dy < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {

        return Users.map((item, i) => {


            if (i < this.state.currentIndex) {
                return null
            }
            else if (i == this.state.currentIndex) {

                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={item.uri} />

                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View

                        key={item.id} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={item.uri} />

                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            <ImageBackground
                source={require("../assets/images/main_bg2.png")}
                resizeMode="cover"
                style={styles.background}
                imageStyle={styles.background_imageStyle}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ height: 10 }}>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderUsers()}
                    </View>
                    <View style={{ height: 10 }}>

                    </View>
                    <View style={styles.skip_buttonRow}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={styles.skip_button}
                        >
                            <MaterialCommunityIconsIcon
                                name="heart-off"
                                style={styles.icon}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateRecipeScreen')}
                            style={styles.recipe_button}
                        >
                            <FontAwesomeIcon name="pencil" style={styles.icon4}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={styles.like_button}
                        >
                            <IoniconsIcon name="md-heart" style={styles.icon2}></IoniconsIcon>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        );
    }
}


const styles = StyleSheet.create({
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