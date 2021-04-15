import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";


import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config/config.json';

import { db, firebaseApp } from '../config/DatabaseConfig';
import styles from '../styles/MainStyles.js';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';

import ViewRecipeModal from '../components/ViewRecipeModal';


const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';

const CustomIcon = createIconSetFromFontello(fontelloConfig, 'CustomIcons');

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

        //this.handler = this.handler.bind(this);

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
            recipes: [],
            indexToKey: [], // basically, helps me figure out which recipe you just liked. things like index 0 is key 1234, which pertains to a certain recipe in the DB
            isVisible: false,
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
            currentRecipeName: "",
            CONTENT: [],
            isEgg: false,
            isGluten: false,
            isDairy: false,
            isSoy: false,
            isFish: false,
            isShellfish: false,
            isNuts: false,
            isEnd: false,
            rating: 0,
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
        this.setState({ isVisible: show })
    }

    //Triggers like animation, might need Ben to handle DB stuff in here
    likeRecipe() {
        const k = this.state.recipes[this.state.currentIndex].key
        this.saveRecipe(k)
        if(this.state.currentIndex == (this.state.recipes.length - 1)){
            this.setState({isEnd: true}) 
        }
        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 })
        })
    }



    //triggers dislike animation

    skipRecipe() {
        const k = this.state.recipes[this.state.currentIndex].key
        if(this.state.currentIndex == (this.state.recipes.length - 1)){
            this.setState({isEnd: true})
        }
        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 })
        })
    }

    resetAllergens() {
        this.setState(
            { isEgg: false },
            { isGluten: false },
            { isDairy: false },
            { isSoy: false },
            { isFish: false },
            { isShellfish: false },
            { isNuts: false },
        );
    }


    // Given a key, saved the recipe under the user's UID in Firebase
    saveRecipe(key) {
        var recipeObj;
        // Get the recipe
        db.ref('/recipes/' + key).on('value', (snapshot) => {
            recipeObj = snapshot.val();
        });
        // Send the recipe up to be stored as the User's saved recipe
        var currentUserID = firebaseApp.auth().currentUser.uid;
        db.ref('/savedRecipes/' + currentUserID).push(recipeObj).then(() => console.log('Data sent'));
    }

    viewCurrentRecipe() {
        const k = this.state.recipes[this.state.currentIndex].key
        this.getRecipeTitle(k)
        this.viewRecipe(k)
        this.displayRecipeModal(true)
        this.setState({ currentIndex: this.state.currentIndex }, () => {
            this.position.setValue({ x: 0, y: 0 })
        })
    }

    viewCurrentRecipe2() {
        this.displayRecipeModal(true)
    }


    // Given a key, give the recipe to view for the user
    viewRecipe(key) {
        var name, allergens, ingredients, instructions, nuts, gluten, shellfish, dairy, fish, eggs, soy;
        var recipeObj;
        var newContent;
        // Get the recipe
        db.ref('/recipes/'+key).on('value', (snapshot) =>{
            recipeObj = snapshot.val();
        });
        // Extract the data into vars for easier use
        name = recipeObj.name;
        ingredients = recipeObj.ingredients;
        instructions = recipeObj.instructions;
        nuts = recipeObj.nuts ? "nuts, " : '';
        recipeObj.nuts ? this.setState({ isNuts: true }) : this.setState({ isNuts: false });
        gluten = recipeObj.gluten ? 'gluten, ' : '';
        recipeObj.gluten ? this.setState({ isGluten: true }) : this.setState({ isGluten: false });
        shellfish = recipeObj.shellfish ? 'shellfish, ' : '';
        recipeObj.shellfish ? this.setState({ isShellfish: true }) : this.setState({ isShellfish: false });
        dairy = recipeObj.dairy ? 'dairy, ' : '';
        recipeObj.dairy ? this.setState({ isDairy: true }) : this.setState({ isDairy: false });
        fish = recipeObj.fish ? 'fish, ' : '';
        recipeObj.fish ? this.setState({ isFish: true }) : this.setState({ isFish: false });
        eggs = recipeObj.eggs ? 'eggs, ' : '';
        recipeObj.eggs ? this.setState({ isEgg: true }) : this.setState({ isEgg: false });
        soy = recipeObj.soy ? "soy, " : '';
        recipeObj.soy ? this.setState({ isSoy: true }) : this.setState({ isSoy: false });
        // Consolidate the allergens before the Alert
        allergens = nuts+gluten+shellfish+dairy+fish+eggs+soy;
        // Show info to user

        newContent = []
        newContent.push({
            title: 'Allergens',
            content: allergens,
        })
        newContent.push({
            title: 'Ingredients',
            content: ingredients,
        })
        newContent.push({
            title: 'Instructions',
            content: instructions,
        })
        this.setState({ CONTENT : newContent })

    }

    getRecipeTitle(){
        const k = this.state.recipes[this.state.currentIndex].key
        var name;
        var recipeObj;
        // Get the recipe
        db.ref('/recipes/' + k).once('value', (snapshot) => {
            recipeObj = snapshot.val();
        });
        name = recipeObj.name;
        rating = recipeObj.totalRating
        this.setState({ currentRecipeName: name,
                        rating: rating });
    }

    componentDidMount() {
        // Retrieve recipes from Firebase
        db.ref('/recipes').on('value', (snapshot) => {
            var returnArray = [];

            snapshot.forEach( (snap) => {
                returnArray.push({
                    key: snap.key,
                    name: snap.val().name,
                    uri: snap.val().downloadUrl
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
                        if(this.state.currentIndex == (this.state.recipes.length - 1)){
                            this.setState({isEnd: true})
                        }
                        console.log(this.state.isEnd)
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
                        if(this.state.currentIndex == (this.state.recipes.length - 1)){
                            this.setState({isEnd: true})
                        }
                        console.log(this.state.isEnd)
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
                        this.getRecipeTitle(k)
                        this.viewRecipe(k)
                        this.displayRecipeModal(true)
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

    getRecipeTitleTemp = key => {
        const k = this.state.recipes[this.state.currentIndex].key
        var name;
        var recipeObj;
        // Get the recipe
        db.ref('/recipes/' + key).on('value', (snapshot) => {
            recipeObj = snapshot.val();
        });
        name = recipeObj.name;
        //this.setState({ currentRecipeName: name });
        return (name);
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
                        key={item.key} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - (SCREEN_HEIGHT / 5.5), width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                        </Animated.View>
                        {/* <View style={styles.recipe_title_container}>
                            <Text
                                numberOfLines={1}
                                style={styles.recipe_title}>{item.name}</Text>
                        </View> */}
                        <ImageBackground
                            source={{uri: item.uri}}
                            style={styles.image2}
                            imageStyle={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}>
                            <BackgroundImage
                                style={styles.image2}
                                imageStyle={{ flex: 1, opacity: 0.5, height: null, width: null, resizeMode: 'stretch', borderRadius: 20 }}
                                source={require("../assets/images/recipeGradient.png")}
                                testID='currentImage' >
                                    <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 575, marginLeft: 20, color: 'white' }}>
                                        {item.name}
                                    </Text>
                                </BackgroundImage>
                        </ImageBackground>

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
                        <View style={styles.recipe_title_container}>
                            <Text
                                numberOfLines={1}
                                style={styles.recipe_title}>{item.name}</Text>
                        </View>
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
                {/* Toggle end of recipe view */}
                {this.state.isEnd ?
                    (
                        <Text>You've reached the end! Would you like to restart?</Text>
                    ) 
                    : null}
                
                <View style={{ flex: 1 }}
                    testID="testLocation1">

                    <ViewRecipeModal
                        currentRecipeName={this.state.currentRecipeName}
                        CONTENT={this.state.CONTENT}
                        isModalVisible={this.state.isVisible}
                        isEgg={this.state.isEgg}
                        isGluten={this.state.isGluten}
                        isNuts={this.state.isNuts}
                        isDairy={this.state.isDairy}
                        isSoy={this.state.isSoy}
                        isFish={this.state.isFish}
                        isShellfish={this.state.isShellfish}
                        activeSections={this.state.activeSections}
                        multipleSelect={this.state.multipleSelect}
                        setSections={this.setSections}
                        displayRecipeModal={this.displayRecipeModal.bind(this)}
                        starRating={this.state.rating}
                        >
                    </ViewRecipeModal>


                    <View style={{height: '1.5%' }}>
                    </View>
                    <View style={{ flex: 1 }} testID='recipeStackView'>
                        {this.renderRecipes()}
                    </View>
                    <View style={{ height: '10%' }}>
                        <View style={styles.skip_buttonRow}>
                            <TouchableOpacity
                                onPress={() => this.skipRecipe()}
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
                                onPress={() => this.viewCurrentRecipe()}
                                style={styles.magnify_button}
                            >
                                <MaterialCommunityIconsIcon name="magnify" style={styles.magnifyIcon}></MaterialCommunityIconsIcon>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.likeRecipe()}
                                style={styles.like_button}
                            >
                                <IoniconsIcon name="md-heart" style={styles.icon2}></IoniconsIcon>
                                {/*<CustomIcon name="gluten_allergen" size={60} color='white'></CustomIcon>*/}
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </ImageBackground>

        );
    }
}
