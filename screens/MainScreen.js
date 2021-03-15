import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { db, firebaseApp } from '../config/DatabaseConfig';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';


const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native';

const CONTENT = [
    {
        title: 'Allergens',
        content: 'Dairy, Gluten',
    },
    {
        title: 'Ingredients',
        content: '2 cups of berries, 2 cups of butter, 1.5 cups of AP flour, 1 egg, 1 cup sugar',
    },
    {
        title: 'Instructions',
        content: 'Mix the flour and butter to form crust. Chill. Cook the berries. Add to crust. Bake immediately.',
    },
];

const SELECTORS = [
    {
        title: 'First',
        value: 0,
    },
    {
        title: 'Third',
        value: 2,
    },
    {
        title: 'None',
    },
];

export default class MainScreenInfo extends React.Component {

    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
            recipes: [],
            indexToKey: [], // basically, helps me figure out which recipe you just liked. things like index 0 is key 1234, which pertains to a certain recipe in the DB
            isVisible: false,
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
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


    displayRecipeModal(show) {
        this.setState({isVisible: show})
    }

    //Triggers like animation, might need Ben to handle DB stuff in here
    likeRecipe() {
        const k = this.state.recipes[this.state.currentIndex].key
        this.saveRecipe(k)
        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 })
        })
    }


    // Given a key, saved the recipe under the user's UID in Firebase
    saveRecipe(key) {
        var recipeObj;
        // Get the recipe
        db.ref('/recipes/'+key).on('value', (snapshot) =>{
            recipeObj = snapshot.val();
        });
        // Send the recipe up to be stored as the User's saved recipe
        var currentUserID = firebaseApp.auth().currentUser.uid;
        db.ref('/savedRecipes/'+currentUserID).push(recipeObj).then(() => console.log('Data sent'));
    }

    // Given a key, give the recipe to view for the user
    viewRecipe(key) {
        var name, ingredients, instructions, nuts, gluten, shellfish, dairy, fish, eggs, soy;
        var recipeObj;
        // Get the recipe
        db.ref('/recipes/'+key).on('value', (snapshot) =>{
            recipeObj = snapshot.val();
        });
        // Extract the data into vars for easier use
        name = recipeObj.name.name;
        ingredients = recipeObj.ingredients.ingredients;
        instructions = recipeObj.instructions.instructions;
        nuts = recipeObj.nuts.isSelectedNuts ? "nuts, " : '';
        gluten = recipeObj.gluten.isSelectedGluten ? 'gluten, ' : '';
        shellfish = recipeObj.shellfish.isSelectedShellfish ? 'shellfish, ' : '';
        dairy = recipeObj.dairy.isSelectedDairy ? 'dairy, ' : '';
        fish = recipeObj.fish.isSelectedFish ? 'fish, ' : '';
        eggs = recipeObj.eggs.isSelectedEggs ? 'eggs, ' : '';
        soy = recipeObj.soy.isSelectedSoy ? "soy, " : '';
        // Consolidate the allergens before the Alert
        allergens = nuts+gluten+shellfish+dairy+fish+eggs+soy;
        // Show info to user
        Alert.alert(
            name,
            "Ingredients:\n"
            +ingredients
            +"\nInstructions:\n"
            +instructions+"\n"
            +"Allergens:\n"
            +allergens,
            [
                {text: "OK", onPress: () => console.log("View recipe OK pressed") }
            ],
            { cancelable: false }
        )
    }

    componentDidMount() {
        // Retrive recipes from Firebase
        db.ref('/recipes').on('value', (snapshot) => {
        var returnArray = [];
        
        snapshot.forEach( (snap) => {
            returnArray.push({
                key: snap.key,
                uri: snap.val().imageSource.imageSource
            });
        });
    
        this.setState({ recipes: returnArray })
        });
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {

                //swipe right
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        const k = this.state.recipes[this.state.currentIndex].key
                        this.saveRecipe(k)
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe left
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        const k = this.state.recipes[this.state.currentIndex].key
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe down
                else if (gestureState.dy > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        const k = this.state.recipes[this.state.currentIndex].key
                        this.viewRecipe(k)
                        this.setState({ currentIndex: this.state.currentIndex }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }

                //swipe up
                else if (gestureState.dy < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        const k = this.state.recipes[this.state.currentIndex].key
                        this.viewRecipe(k)
                        this.setState({ currentIndex: this.state.currentIndex }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                        friction: 4
                    }).start()
                }
            }
        })
    }

    updateIndexToKey = (i, key) => {
        var tempArray = this.state.indexToKey;
        tempArray[i] = key;
        this.setState({ indexToKey: tempArray });
    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    }

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={styles.header}
                //style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    }

    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text animation={isActive ? 'bounceInUp' : undefined}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    renderRecipes = () => {

        return this.state.recipes.map((item, i) => {


            if (i < this.state.currentIndex) {
                return null
            }
            else if (i == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.key} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{uri: item.uri}} />

                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View

                        key={item.key} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>

                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>

                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{uri: item.uri}} />

                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        const { multipleSelect, activeSections } = this.state;
        return (
            <ImageBackground
                source={require("../assets/images/main_bg2.png")}
                resizeMode="cover"
                style={styles.background}
                imageStyle={styles.background_imageStyle}
            >
                <View style={{ flex: 1 }}>

                    <Modal
                        animationType = "slide"
                        transparent={true}
                        hasBackdrop={true}
                        backdropColor={"#000"}
                        backdropOpacity={0.70}
                        isVisible={this.state.isVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has now been closed.');
                        }}>




                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{
                                width: '100%',
                                height: '50%',
                                backgroundColor: "#fff",
                                borderColor: "#000", borderWidth: 2,
                                borderStyle: "dashed",
                                borderRadius: 1
                            }}>
                        <ScrollView style={styles.svContentContainer}>
                            <Text style={styles.title}>Berry Tart</Text>

                            <Accordion
                                activeSections={activeSections}
                                sections={CONTENT}
                                touchableComponent={TouchableOpacity}
                                expandMultiple={multipleSelect}
                                renderHeader={this.renderHeader}
                                renderContent={this.renderContent}
                                duration={400}
                                onChange={this.setSections}
                            />

                                <View style={styles.exitRecipeContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.displayRecipeModal(!this.state.isVisible);
                                        }}
                                        style={styles.exitBtn}
                                    >
                                        <Text style={styles.exitRecipeText}>Exit View</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            </View>
                            </View>
                    </Modal>

                    <View style={{ height: 10 }}>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderRecipes()}
                    </View>
                    <View style={{ height: 10 }}>

                    </View>
                    <View style={styles.skip_buttonRow}>
                        <TouchableOpacity
                            onPress={() => this.displayRecipeModal(true)} //here to test the modal
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
                            //onPress={() => this.likeRecipe()}
                            onPress={() => this.props.navigation.navigate('MealPlannerScreen')}
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




    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#FD8014',
        padding: 20,
        marginBottom: 5,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
    svContentContainer: {
        paddingTop: 30,
    },


    exitRecipeContainer: {
        height: 196,
        paddingTop: 30,
        alignSelf: "center",
        width: '80%',
    },

    exitBtn: {

        height: 56,
        backgroundColor: "#e35514",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center"
    },

    exitRecipeText: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center",
        fontWeight: "bold",
    },

});