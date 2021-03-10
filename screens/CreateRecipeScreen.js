import React, { useState, Component, useEffect } from "react";
import {
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import NativeForms from "native-forms";
import { NativeFormsWebView } from "native-forms";
import { WebView } from "react-native-webview";
import { CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import CheckedIcon from "react-native-vector-icons/FontAwesome";
import styles from '../styles/CreateRecipeStyles.js';
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
                "Please enter all of the following: \nImage\nName\nIngredients\nInstructions",
                [
                    {text: "OK", onPress: () => console.log("Register OK pressed") }
                ],
                { cancelable: false }
            )
        }
        
    }
    
    return (
        <View style={styles.container}>

            {/*Static header. It's not in the scrollview so it can remain on the screen*/}
            <View style={styles.titleContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    resizeMode="contain"
                    style={styles.image1}
                ></Image>
                <Text style={styles.whatsYourRecipe}>What's your recipe?</Text>
            </View>

            <ScrollView style={styles.scrollableView} contentContainerStyle={styles.svContentContainer}>           
                {/*Recipe textbox fill-in secion*/}
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
                                        onChangeText={(name) => setName(name)}
                                    ></TextInput>
                                </View>
                                <Text style={styles.recipeIngredientsText}>The Ingredients</Text>
                                <TextInput
                                    placeholder=""
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    style={styles.recipeIngredients}
                                    onChangeText={(ingredients) => setIngredients(ingredients)}
                                ></TextInput>
                                <Text style={styles.theInstructionsText}>The Instructions</Text>
                                <TextInput
                                    placeholder=""
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    style={styles.recipeInstructions}
                                    onChangeText={(instructions) => setInstructions(instructions)}
                                ></TextInput>
                            </View>
                        </ImageBackground> 
                    </View>

                    {/*Recipe checkbox secion*/}
                    <View style={styles.selectContainer}>
                    <ImageBackground
                        source={require("../assets/images/checkbox_bbg.jpg")}
                        resizeMode="contain"
                        style={styles.checkboxBackground}
                        imageStyle={styles.checkBoxBackground_imageStyle}
                    >
                        <View style={styles.checkEachBadge}>
                            <Text style={styles.fillInBelow}>SELECT ALLERGENS THAT APPLY</Text>
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
                    </View>

                    {/*Recipe photo upload section*/}
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
                                    {imageSource && <Image source={{ uri: imageSource }} resizeMode="cover" style={{ width: 163, height: 243 }} />}
                                </View>
                                <TouchableOpacity onPress={pickImage} style={styles.browseButton}>
                                    <Text style={styles.browsePhotos}>BROWSE PHOTOS</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>

                    {/*Submit button*/}
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



export default CreateRecipeScreen;