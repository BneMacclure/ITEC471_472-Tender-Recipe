import React, { useState, Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView,
    Dimensions
} from "react-native";
import NativeForms from "native-forms";
import { NativeFormsWebView } from "native-forms";
import { WebView } from "react-native-webview";
import { CheckBox } from 'react-native-elements';
//import { ScrollView } from "react-native-gesture-handler";

//<NativeForms form="https://my.nativeforms.com/vVDct0mcvZWPmZic4JlRvpmNy0Db" />
//use this component within the render() method. This code will display form in your application.
//Replace form prop with your form's address

//render on screen
//<NativeForms form="https://my.nativeforms.com/QW1AHTN1jZm4GTxkFTJ1Db" />

//export default class CreateRecipeScreen extends React.Component {
//    render() {
//        return(
//            <WebView source={{ uri: 'https://my.nativeforms.com/QW1AHTN1jZm4GTxkFTJ1Db' }}/>
//            );
//    }
//}

import NutsCheckbox from "../components/NutCheckbox/components/MaterialCheckboxWithLabel";
import GlutenCheckbox from "../components/GlutenCheckbox/components/MaterialCheckboxWithLabel";
import ShellfishCheckbox from "../components/ShellfishCheckbox/components/MaterialCheckboxWithLabel";
import DairyCheckbox from "../components/DairyCheckbox/components/MaterialCheckboxWithLabel";
import FishCheckbox from "../components/FishCheckbox/components/MaterialCheckboxWithLabel";
import EggsCheckbox from "../components/EggsCheckbox/components/MaterialCheckboxWithLabel";
import SoyCheckbox from "../components/SoyCheckbox/components/MaterialCheckboxWithLabel";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function CreateRecipeScreen(props) {
    const [isSelected, setSelection] = useState(false);
    const [imageSource, setImageSource] = useState(null);
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/logo.png")}
                resizeMode="contain"
                style={styles.image1}
            ></Image>
            <Text style={styles.whatsYourRecipe}>What's your recipe?</Text>
            <ScrollView style={styles.scrollableView} contentContainerStyle={styles.svContentContainer}>
                    <View style={styles.recipeFillIn}>
                        <ImageBackground
                            source={require("../assets/images/recipefield_bbg.jpg")}
                            resizeMode="contain"
                            style={styles.fieldsBackground}
                            imageStyle={styles.fieldsBackground_imageStyle}
                        >
                            <View style={styles.fillInBadge}>
                                <Text style={styles.fillInBelow}>FILL IN BELOW</Text>
                            </View>
                            <View style={styles.recipeFields}>
                                <Text style={styles.recipeNameText}>Recipe Name</Text>
                                <TextInput
                                    placeholder=""
                                    multiline={false}
                                    enablesReturnKeyAutomatically={true}
                                    style={styles.recipeName}
                                ></TextInput>
                                <Text style={styles.recipeIngredientsText}>The Ingredients</Text>
                                <TextInput
                                    placeholder=""
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    style={styles.recipeIngredients}
                                ></TextInput>
                                <Text style={styles.theInstructionsText}>The Instructions</Text>
                                <TextInput
                                    placeholder=""
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    style={styles.recipeInstructions}
                                ></TextInput>
                            </View>
                    </ImageBackground>

                    <ImageBackground
                        source={require("../assets/images/checkboxfield_bbg.jpg")}
                        resizeMode="contain"
                        style={styles.checkboxBackground}
                        imageStyle={styles.checkBoxBackground_imageStyle}
                    >
                        <View style={styles.checkEachBadge}>
                            <Text style={styles.fillInBelow}>SELECT ALL THAT APPLY</Text>
                        </View>




                        <NutsCheckbox
                            style={styles.nutsMaterialCheckbox}
                        ></NutsCheckbox>
                        <GlutenCheckbox
                            style={styles.glutenMaterialCheckbox}
                        ></GlutenCheckbox>
                        <ShellfishCheckbox
                            style={styles.shellfishMaterialCheckbox}
                        ></ShellfishCheckbox>
                        <DairyCheckbox
                            style={styles.dairyMaterialCheckbox}
                        ></DairyCheckbox>
                        <FishCheckbox
                            style={styles.fishMaterialCheckbox}
                        ></FishCheckbox>
                        <EggsCheckbox
                            style={styles.eggsMaterialCheckbox}
                        ></EggsCheckbox>
                        <SoyCheckbox
                            style={styles.soyMaterialCheckbox}
                        ></SoyCheckbox>
                    </ImageBackground>   

                    <View style={[styles.imagerPickerContainer, styles.imagePickerContent, { backgroundColor: '#F5A023' }]}>
                        <Text>Simple image picker</Text>
                    </View>



                    <View style={styles.submitRecipeContainer}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Main Screen')} //DEBUG
                            style={styles.submitBtn}
                        >
                            <Text style={styles.submitRecipeText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleContainer: {
    },

    image1: {
        width: 78,
        height: 78,
        marginTop: 30,
        alignSelf: 'center'
    },
    whatsYourRecipe: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 20,
        alignSelf: 'center'
    },
    recipeFillIn: {
        width: 292,
        height: '100%',
        marginTop: 50,
        alignSelf: "center"
    },
    fieldsBackground: {
        width: 591,
        height: 592,
        marginTop: -124,
        marginLeft: -135
    },
    fieldsBackground_imageStyle: {},
    fillInBadge: {
        width: 110,
        height: 24,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
        marginTop: 87,
        marginLeft: 226
    },
    fillInBelow: {
        //fontFamily: "roboto-300",
        color: "rgba(222,5,5,1)",
        fontSize: 12,
        marginTop: 2,
        alignSelf: "center"
    },
    recipeFields: {
        flex: 1,
        marginBottom: 428,
        marginTop: 8,
        marginLeft: 135,
        marginRight: 164
    },
    recipeNameText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginLeft: 1
    },
    recipeName: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 40,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)"
    },
    recipeIngredientsText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 9,
        marginLeft: 1
    },
    recipeIngredients: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 105,
        width: 292,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        marginLeft: 1
    },
    theInstructionsText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 9,
        marginLeft: 1
    },
    recipeInstructions: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 105,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)"
    },


    checkEachBadge: {
        width: 170,
        height: 24,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
        marginTop: 87,
        alignSelf: 'center',
        marginRight: 20
    },
    recipeCheckboxes: {
        flex: 1,
        marginBottom: 428,
        marginTop: 13,
        marginLeft: 135,
        marginRight: 164
    },

    checkboxBackground: {
        width: 591,
        height: 792,
        marginTop: -124,
        marginLeft: -135

    },
    checkboxBackground_imageStyle: {},



    scrollableView: {
        width: SCREEN_WIDTH,
        margin: 20,
        alignSelf: 'center',
        padding: 20,
    },

    svContentContainer: {
        justifyContent: 'space-between'

    },

    checkboxContainer: {
        flexDirection: "row",
    },
    nutsMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    label: {

    },
    glutenMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    shellfishMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    dairyMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    fishMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    eggsMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },
    soyMaterialCheckbox: {
        height: 48,
        width: 292,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        marginTop: 30,
        alignSelf: 'center',
        marginRight: 24
    },

    imagePickerContainer: {
        flex: 1
    },

    imagePickerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 591,
        height: 692,
        marginLeft: -135
    },

    submitRecipeContainer: {
        height: 96,
        marginTop: 30,
        alignSelf: "center",
    },

    submitBtn: {
        width: SCREEN_WIDTH / 1.1,
        height: 56,
        backgroundColor: "rgba(249,71,35,1)",
        borderRadius: 10,
        justifyContent: "center"
    },

    submitRecipeText: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center"
    },

});

export default CreateRecipeScreen;