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
import CheckedIcon from "react-native-vector-icons/FontAwesome";
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
          aspect: [3, 4],
          quality: 1,
        });

          let options = {
              maxWidth: SCREEN_WIDTH,
              maxHeight: SCREEN_HEIGHT,
          };
    
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
                        source={require("../assets/images/checkbox_bbg.jpg")}
                        resizeMode="contain"
                        style={styles.checkboxBackground}
                        imageStyle={styles.checkBoxBackground_imageStyle}
                    >
                        <View style={styles.checkEachBadge}>
                            <Text style={styles.fillInBelow}>SELECT ALL THAT APPLY</Text>
                        </View>


                        <View style={styles.checkBoxColumn}>
                            <CheckBox
                                title='Gluten'
                                onValueChange={setSelectionGluten}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedGluten}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedGluten}
                                onPress={() => setSelectionGluten(!isSelectedGluten)}     
                            />
                            <CheckBox value={isSelectedNuts}
                                title='Nuts'
                                onValueChange={setSelectionNuts}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedNuts}
                                checkedIcon={"check-square"}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checkedColor={'#F94723'}
                                checked={isSelectedNuts}
                                onPress={() => setSelectionNuts(!isSelectedNuts)}
                            />
                            <CheckBox value={isSelectedShellfish}
                                title='Shellfish'
                                onValueChange={setSelectionShellfish}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedShellfish}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedShellfish}
                                onPress={() => setSelectionShellfish(!isSelectedShellfish)}
                            />
                            <CheckBox value={isSelectedDairy}
                                title='Dairy'
                                onValueChange={setSelectionDairy}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedGluten}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedDairy}
                                onPress={() => setSelectionDairy(!isSelectedDairy)}
                            />
                            <CheckBox value={isSelectedEggs}
                                title='Eggs'
                                onValueChange={setSelectionEggs}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedEggs}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedEggs}
                                onPress={() => setSelectionEggs(!isSelectedEggs)}
                            />
                            <CheckBox value={isSelectedFish}
                                title='Fish'
                                onValueChange={setSelectionFish}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedFish}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedFish}
                                onPress={() => setSelectionFish(!isSelectedFish)}
                            />
                            <CheckBox value={isSelectedSoy}
                                title='Soy'
                                onValueChange={setSelectionSoy}
                                size={35}
                                containerStyle={styles.checkboxContainerStyle}
                                value={isSelectedSoy}
                                checkedIcon={"check-square"}
                                checkedColor={'#F94723'}
                                textStyle={styles.checkboxText}
                                uncheckedColor={'#F94723'}
                                checked={isSelectedSoy}
                                onPress={() => setSelectionSoy(!isSelectedSoy)}
                            />
                        </View>

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
                                <Text style={styles.aPhoto}>See your photo here!</Text>
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

    scrollableView: {
        width: SCREEN_WIDTH,
        alignSelf: 'center',
    },

    svContentContainer: {
        justifyContent: 'space-between'

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
        color: "rgba(222,5,5,1)",
        fontSize: 12,
        marginTop: 2,
        alignSelf: "center"
    },
    recipeFields: {
        flex: 1,
        marginBottom: 527,
        marginTop: 20,
        marginLeft: SCREEN_WIDTH / 4,
        marginRight: 170
    },
    recipeNameText: {
        left: 0,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontWeight: "bold",
        fontSize: 20,
        top: 0
    },
    recipeName: {
        width: SCREEN_WIDTH / 1.2,
        color: "#121212",
        height: 40,
        marginTop: 30,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
    },
    recipeNameTextStack: {
        height: 61
    },
    recipeIngredientsText: {
        color: "rgba(255,255,255,1)",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 15,
        marginLeft: 1
    },
    recipeIngredients: {
        width: SCREEN_WIDTH / 1.2,
        color: "#121212",
        height: 204,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        textAlignVertical: 'top',
        paddingLeft: 8,
        paddingTop: 2
    },
    theInstructionsText: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 8,
        marginLeft: 1
    },
    recipeInstructions: {
        width: SCREEN_WIDTH / 1.2,
        color: "#121212",
        height: 204,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        textAlignVertical: 'top',
        paddingLeft: 8,
        paddingTop: 2
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
        height: 715,
        marginTop: -24,
        marginLeft: -135

    },
    checkboxBackground_imageStyle: {},

    checkBoxColumn: {
        flex: 1,
        width: SCREEN_WIDTH / 1.15,
        height: 63,
        marginTop: 15,
        marginLeft: SCREEN_WIDTH / 4
    },

    checkboxContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    checkboxText: {
        fontSize: 20,
        color: "rgba(111,111,111,1)",
        paddingBottom: 4
    },

    checkboxContainer: {
        flexDirection: "row",
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
        color: "#121212",
        fontSize: 18,
        marginTop: 10,
        alignSelf: "center"
    },
    aPhoto: {
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
        alignSelf: "center",
        fontWeight: "bold",
    },

});

export default CreateRecipeScreen;