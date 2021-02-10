import React, { useState, Component, useEffect } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
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
import { db } from "../config/DatabaseConfig";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Alert } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const CreateRecipeScreen = (props) =>  {
    const [isSelectedNuts, setSelectionNuts] = useState(false);
    const [isSelectedGluten, setSelectionGluten] = useState(false);
    const [isSelectedShellfish, setSelectionShellfish] = useState(false);
    const [isSelectedDairy, setSelectionDairy] = useState(false);
    const [isSelectedFish, setSelectionFish] = useState(false);
    const [isSelectedEggs, setSelectionEggs] = useState(false);
    const [isSelectedSoy, setSelectionSoy] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageSource, setImageSource] = useState(null);

    const changeNutSelected = () => {
        if (isSelectedNuts) {
            setSelectionNuts(false)
        }
        else {
            setSelectionNuts(true)
        }
    }

    const changeGlutenSelected = () => {
        if (isSelectedGluten) {
            setSelectionGluten(false)
        }
        else {
            setSelectionGluten(true)
        }
    }

    const changeShellfishSelected = () => {
        if (isSelectedShellfish) {
            setSelectionShellfish(false)
        }
        else {
            setSelectionShellfish(true)
        }
    }

    const changeDairySelected = () => {
        if (isSelectedDairy) {
            setSelectionDairy(false)
        }
        else {
            setSelectionDairy(true)
        }
    }

    const changeFishSelected = () => {
        if (isSelectedFish) {
            setSelectionFish(false)
        }
        else {
            setSelectionFish(true)
        }
    }

    const changeEggsSelected = () => {
        if (isSelectedEggs) {
            setSelectionEggs(false)
        }
        else {
            setSelectionEggs(true)
        }
    }

    const changeSoySelected = () => {
        if (isSelectedSoy) {
            setSelectionSoy(false)
        }
        else {
            setSelectionSoy(true)
        }
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 5],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImageSource(result.uri);
        }
      };

    const submitRecipeFunc = () => {
        if (name != '' && ingredients != '' && instructions != '' && imageSource != null) {
            db.ref('/recipes').push({
                name: {name},
                ingredients: {ingredients},
                instructions: {instructions},
                imageSource: {imageSource},
                soy: {isSelectedSoy},
                eggs: {isSelectedEggs},
                gluten: {isSelectedGluten},
                dairy: {isSelectedDairy},
                fish: {isSelectedFish},
                shellfish: {isSelectedShellfish},
                nuts: {isSelectedNuts},
            }).then(() => console.log('Data sent'));
            
            props.navigation.navigate('Main Screen');
        }
        else {
            Alert.alert(
                "Create Recipe",
                "Need these fields: \nImage\nName\nIngredients\nInstructions",
                [
                    {text: "OK", onPress: () => console.log("Register OK pressed") }
                ],
                { cancelable: false }
            )
        }
        
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    resizeMode="contain"
                    style={styles.image1}
                ></Image>
                <Text style={styles.whatsYourRecipe}>What's your recipe?</Text>
            </View>

            <ScrollView style={styles.scrollableView} contentContainerStyle={styles.svContentContainer}>


                <View style={styles.recipeFillIn}>
                    <View style={styles.fieldsBackgroundStack}>
                        <ImageBackground
                            source={require("../assets/images/checkboxfield_bbg.jpg")}
                            resizeMode="contain"
                            style={styles.fieldsBackground}
                            imageStyle={styles.fieldsBackground_imageStyle}
                        >
                            <View style={styles.fillInBadge}>
                                <Text style={styles.fillInBelow}>FILL IN BELOW</Text>
                            </View>
                            <View style={styles.recipeFields}>
                                <View style={styles.recipeNameTextStack}>
                                    <Text style={styles.recipeNameText}>Recipe Name</Text>
                                    <TextInput
                                        placeholder=""
                                        multiline={false}
                                        enablesReturnKeyAutomatically={true}
                                        style={styles.recipeName}
                                    ></TextInput>
                                </View>
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
                    </View>

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
                            onPress={changeNutSelected}
                        ></NutsCheckbox>
                        <GlutenCheckbox
                            style={styles.glutenMaterialCheckbox}
                            onPress={changeGlutenSelected}
                        ></GlutenCheckbox>
                        <ShellfishCheckbox
                            style={styles.shellfishMaterialCheckbox}
                            onPress={changeShellfishSelected}
                        ></ShellfishCheckbox>
                        <DairyCheckbox
                            style={styles.dairyMaterialCheckbox}
                            onPress={changeDairySelected}
                        ></DairyCheckbox>
                        <FishCheckbox
                            style={styles.fishMaterialCheckbox}
                            onPress={changeFishSelected}
                        ></FishCheckbox>
                        <EggsCheckbox
                            style={styles.eggsMaterialCheckbox}
                            onPress={changeEggsSelected}
                        ></EggsCheckbox>
                        <SoyCheckbox
                            style={styles.soyMaterialCheckbox}
                            onPress={changeSoySelected}
                        ></SoyCheckbox>
                    </ImageBackground>   

                    
                    <View style={styles.recipePhotoUpload}>
                        <ImageBackground
                            source={require("../assets/images/recipefield_bbg.jpg")}
                            resizeMode="contain"
                            style={styles.uploadBackground}
                            imageStyle={styles.uploadBackground_imageStyle}
                        >
                            <View style={styles.uploadBadge}>
                                <Text style={styles.uploadAPicture}>UPLOAD A PICTURE!</Text>
                            </View>
                            <View style={styles.uploadContent}>
                                <View style={styles.iconContainer}>
                                    <Icon name="cloud-upload" style={styles.uploadicon}></Icon>
                                </View>
                                <Text style={styles.tapTheButtonBelow}>Tap the button Below</Text>
                                <Text style={styles.aPhoto}>Can't wait to see it!</Text>
                                <View style={styles.uploadPreviewContainer}>
                                    {imageSource && <Image source={{ uri: imageSource }} resizeMode="cover" style={{ width: 164, height: 243 }} />}
                                </View>
                                <TouchableOpacity onPress={pickImage} style={styles.browseButton}>
                                    <Text style={styles.browsePhotos}>BROWSE PHOTOS</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>


                    <View style={styles.submitRecipeContainer}>
                        <TouchableOpacity
                            onPress={submitRecipeFunc} //DEBUG
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
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 6
    },

    image1: {
        width: 78,
        height: 78,
        marginTop: 15,
        alignSelf: 'center'
    },
    whatsYourRecipe: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 20,
        marginTop: 12,
        alignSelf: "center"
    },
    recipeFillIn: {
        width: 292,
        height: '100%',
        marginTop: 35,
        alignSelf: "center"
    },
    fieldsBackground: {
        top: 12,
        left: 0,
        width: 591,
        height: 592,

    },
    fieldsBackground_imageStyle: {},
    fillInBadge: {
        top: -10,
        width: 110,
        height: 24,
        position: "absolute",
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
        left: 220
    },
    fillInBelow: {
        //fontFamily: "roboto-300",
        color: "rgba(222,5,5,1)",
        fontSize: 12,
        marginTop: 4,
        alignSelf: "center"
    },
    recipeFields: {
        flex: 1,
        marginBottom: 527,
        marginTop: 25,
        marginLeft: 129,
        marginRight: 170
    },
    recipeNameText: {
        left: 0,
        position: "absolute",
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        top: 0
    },
    recipeName: {
        position: "absolute",
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 40,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        top: 30,
        left: 0,
        right: 0
    },
    recipeNameTextStack: {
        height: 61
    },
    recipeIngredientsText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 15,
        marginLeft: 1
    },
    recipeIngredients: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 204,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)"
    },
    theInstructionsText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        marginTop: 8,
        marginLeft: 1
    },
    recipeInstructions: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        height: 204,
        width: 292,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        alignSelf: "center"
    },
    fieldsBackgroundStack: {
        width: 591,
        height: 604,
        marginTop: -37,
        marginLeft: -129
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
        marginTop: -24,
        marginLeft: -135

    },
    checkboxBackground_imageStyle: {},



    scrollableView: {
        width: SCREEN_WIDTH,
        margin: 10,
        alignSelf: 'center',
    },

    svContentContainer: {
        justifyContent: 'space-between'

    },

    checkboxContainer: {
        flexDirection: "row",
    },
    nutsMaterialCheckbox: {
        height: 48,
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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
        width: SCREEN_WIDTH / 1.2,
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






    recipePhotoUpload: {
        width: 292,
        height: 590,
        marginTop: 1,
        alignSelf: "center"
    },
    uploadBackground: {
        width: 870,
        height: 896,
        marginTop: -183,
        marginLeft: -135
    },
    uploadBackground_imageStyle: {},

    uploadBadge: {
        width: 147,
        height: 24,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
        marginTop: 146,
        marginLeft: 208
    },
    uploadAPicture: {
        //fontFamily: "roboto-300",
        color: "rgba(222,5,5,1)",
        fontSize: 12,
        marginTop: 2,
        alignSelf: "center"
    },
    uploadContent: {
        width: SCREEN_WIDTH / 1.2,
        height: 514,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 110
    },
    iconContainer: {
        width: 74,
        height: 74,
        backgroundColor: "rgba(239,115,15,1)",
        borderRadius: 100,
        justifyContent: "center",
        marginTop: 35,
        alignSelf: "center"
    },
    uploadicon: {
        color: "rgba(255,255,255,1)",
        fontSize: 52,
        alignSelf: "center"
    },
    tapTheButtonBelow: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        fontSize: 18,
        marginTop: 10,
        alignSelf: "center"
    },
    aPhoto: {
        //fontFamily: "roboto-regular",
        color: "#121212",
        marginTop: 1,
        alignSelf: "center"
    },
    uploadPreviewContainer: {
        width: 165,
        height: 245,
        backgroundColor: "#E6E6E6",
        borderWidth: 1,
        borderColor: "#000000",
        borderStyle: "dashed",
        marginTop: 9,
        alignSelf: "center"
    },
    browseButton: {
        width: 198,
        height: 42,
        backgroundColor: "rgba(249,71,35,1)",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000000",
        borderStyle: "solid",
        justifyContent: "center",
        marginTop: 15,
        alignSelf: "center"
    },
    browsePhotos: {
        //fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        alignSelf: "center"
    },


















    submitRecipeContainer: {
        height: 96,
        marginTop: 10,
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