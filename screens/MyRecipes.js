import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Share, Picker, StatusBar } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { db, firebaseApp } from '../config/DatabaseConfig';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styles from '../styles/MyRecipesStyle.js';
import Modal from 'react-native-modal';
import { Modal as RateModal } from "react-native-modal";
import StarRating from 'react-native-star-rating';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config/config.json';
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';
import { Alert } from "react-native";
import ViewRecipeModal from '../components/ViewRecipeModal';
const CustomMysteryBox = createIconSetFromFontello(fontelloConfig, 'CustomIconsMysteryBox');
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default class MyRecipes extends Component {

  constructor(props) {
    super(props)

      props.navigation.setOptions({
        headerRight: () => (
          <View
              style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  height: StatusBar.currentHeight,
              }}>

              <TouchableOpacity style={{
                  width: 37,
                  height: 37,
                  marginRight: 5,
                  //backgroundColor: "#E6E6E6",
                  backgroundColor: "#fff",
                  borderRadius: 100,
              }}>
                  <CustomMysteryBox
                      name="gluten_allergen"
                      size={32}
                      color={'#e35514'}
                      onPress={() => this.showRandomRecipe()}
                      alignSelf={"center"}
                      style={{ alignSelf: "center", marginTop: 3 }}>
                  </CustomMysteryBox>

              </TouchableOpacity>
              <TouchableOpacity style={{
                  width: 37,
                  height: 37,
                  marginRight: 3,
                  //backgroundColor: "#E6E6E6",
                  backgroundColor: "#fff",
                  borderRadius: 100,
              }}>
                  <FontAwesomeIcon
                      name="home"
                      size={32}
                      color={'#e35514'}
                      alignSelf={"center"}
                      style={{alignSelf: "center", marginTop:2}}
                      onPress={() => { props.navigation.navigate('Main Screen') }}

                  />

              </TouchableOpacity>
          </View>
      ),
      })

      this.state = {
          //isVisible: false,
          isDateTimePickerVisible: false,
          rec_data: [],
          selectedRecipe: '',
          uid: '',
          starCount: 0.0,
          isRateModalVisible: false,
          isViewRecipeVisible: false,
          currentRecipeName: "",
          CONTENT: [],
          isEgg: false,
          isGluten: false,
          isDairy: false,
          isSoy: false,
          isFish: false,
          isShellfish: false,
          isNuts: false,
          rating: 0,
          activeSections: [],
          multipleSelect: false,
    }
  }

  showRandomRecipe() {

    this.displayRecipeModal(true)

    // Only do this if there are saved Recipes to choose from
    if (this.state.rec_data.length == 0) {
      Alert.alert('No saved recipes to choose from. Go save some recipes in order to generate a random one')
    }
    else {
      // Choose a recipe
      var index = Math.floor(Math.random() * this.state.rec_data.length)
      var  ingredients, instructions, dairy, eggs, fish, gluten, nuts, shellfish, soy, totalRating, allergens, name;
      var recipeObj = this.state.rec_data[index]
      var newContent;

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
      allergens = nuts+gluten+shellfish+dairy+fish+eggs+soy;

      name = recipeObj.recName;
      this.setState({currentRecipeName: name})
      ingredients = recipeObj.ingredients;
      instructions = recipeObj.instructions;

      totalRating = recipeObj.totalRating
      this.setState({
        rating: totalRating
      })

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


      // Populate the modal's states and Show it
      this.setState({
        CONTENT: newContent,
      })
    }
  }

  displayRecipeModal(show) {
    this.setState({ isViewRecipeVisible: show })
  }

  // sorts recipes by name
  orderData(unsorted) {
    unsorted.sort(function(a, b) {
    var name1 = a.recName.toUpperCase();
    var name2 = b.recName.toUpperCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });
    console.log(unsorted);
    this.setState({rec_data: unsorted});
  };

  async shareRecipe (key){
    var currentUserID = this.state.uid
    db.ref('/savedRecipes/'+currentUserID).child(key).on('value', (snapshot) => {
      data = snapshot.val()
      this.state.msg = data.name
      this.state.msg += "\n \n"
      this.state.msg += data.ingredients
      this.state.msg += data.instructions
      console.log("msg1:" + this.state.msg)
    })
    console.log("msg2:" + this.state.msg)
		try {
			const result = await Share.share({
			message:
			this.state.msg,
		});
		if (result.action === Share.sharedAction) {
			if (result.activityType) {
			// shared with activity type of result.activityType
			} else {
			// shared
			}
		} else if (result.action === Share.dismissedAction) {
			// dismissed
		}
		} catch (error) {
		alert(error.message);
	}
  };

  // removes a recipe from the MyRecipes list
  unsaveRecipe(key) {

    var currentUserID = firebaseApp ? firebaseApp.auth().currentUser.uid : '';
    console.log(key);
    db.ref('/savedRecipes/'+this.state.currentUserID).child(key).remove();
    console.log(key);
  };

  toggleModal(){
    this.setState({isModalVisible: !isModalVisible})
  };

  componentDidMount() {
    var currentUserID = firebaseApp ? firebaseApp.auth().currentUser.uid : '';

    this.setState({uid: currentUserID})

    console.log(currentUserID)

    db.ref('/savedRecipes/'+currentUserID).on('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients, instructions, imageSource, dairy, eggs, fish, gluten, nuts, shellfish, soy, downloadURL, totalRating;
        var child = childSnapshot.val();
        var id = childSnapshot.key;
        recname = child.name;
        ingredients = child.ingredients;
        instructions = child.instructions;
        downloadURL = child.downloadUrl;
        dairy = child.dairy;
        eggs = child.eggs;
        fish = child.fish;
        gluten = child.gluten;
        nuts = child.nuts;
        shellfish = child.shellfish;
        soy = child.soy;
        totalRating = child.totalRating;
        returnArray.push({ // push data into a single object in the array
          "id": id,
          "recName": recname,
          "ingredients": ingredients,
          "instructions": instructions,
          "downloadURL": downloadURL,
          "dairy": dairy,
          "eggs": eggs,
          "fish": fish,
          "gluten": gluten,
          "nuts": nuts,
          "shellfish": shellfish,
          "soy": soy,
          "totalRating": totalRating
        });
      });
      this.orderData(returnArray);
    });

    console.log(this.state.rec_data);

    };

    // show the time picker modal
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
        console.log("Show date time picker has been set to true");
    };

    // hide the time picker modal
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
        console.log("Show date time picker has been set to false");
    };

    // show the time picker modal
    showModal = () => {
        this.setState({ isModalVisible: true });
        console.log("Show date time picker has been set to true");
    };

    // hide the time picker modal
    hideModal = () => {
        this.setState({ isModalVisible: false });
        console.log("Show date time picker has been set to false");
    };

    numberfyMonth = (monthStr) => {
      if (monthStr === 'Jan') {
        return '01'
      }
      else if (monthStr === 'Feb') {
        return '02'
      }
      else if (monthStr === 'Mar') {
        return '03'
      }
      else if (monthStr === 'Apr') {
        return '04'
      }
      else if (monthStr === 'May') {
        return '05'
      }
      else if (monthStr === 'Jun') {
        return '06'
      }
      else if (monthStr === 'Jul') {
        return '07'
      }
      else if (monthStr === 'Aug') {
        return '08'
      }
      else if (monthStr === 'Sep') {
        return '09'
      }
      else if (monthStr === 'Oct') {
        return '10'
      }
      else if (monthStr === 'Nov') {
        return '11'
      }
      else if (monthStr === 'Dec') {
        return '12'
      }
    }

    formatDate = (date) => {
      var newDate = ''
      var res = date.split(" ")
      // "Wed Mar 17 2021 18:04:50 GMT-0400 (EDT)"
      var year = res[3]
      var day = res[2]
      var month = this.numberfyMonth(res[1])
      var time = res[4]

      newDate = year + '-' + month + '-' + day

      return newDate
    }

    // helper method to update the recipe's rating
    updateRecipeRating(id) {
      var sumOfRatings = 0.0
      var numOfRatings = 0.0
      // Count the number of ratings and sum up the ratings
      db.ref('/recipes/'+id+'/ratings').once('value', (snapshot) => {
          console.log('snapshot: '+snapshot)
          snapshot.forEach( (childSnapshot) => {
            data = childSnapshot.val()
            console.log('printing data: '+data)
            sumOfRatings = sumOfRatings + data.rating
            numOfRatings++
          })
      })

      var rating = sumOfRatings/numOfRatings
      console.log('New Rating: '+ sumOfRatings)

      // Update the rating field for the recipe
      db.ref('/recipes/'+id).update({
        totalRating: rating,
      })

    }

    truncateRecName = (name) => {
        var temp = '';
        if(name.length > 14)
        {
            temp = name.slice(0, -(name.length - 16))
            temp += '...'
            return temp;
        }
        else
        return name
    }

    onStarRatingPress = (rating) => {
        this.setState({ starCount:rating })
        console.log("Submitting Rating")
        // Update the rating by the user
        console.log('updating the recipe: ' + this.state.selectedRecipe)

        var recipeID = ''
        // Get the recipe ID
        db.ref('/recipes/').once('value', (snapshot) => {
          snapshot.forEach( (childSnapshot) => {
            data = childSnapshot.val()
            n = data.name
            if (n === this.state.selectedRecipe) {
              recipeID = childSnapshot.key
            }
          })
        })

        console.log('Recipe ID: '+recipeID)

        db.ref('/recipes/'+recipeID+'/ratings/'+this.state.uid).set({
          rating: rating,
        })

        // Update the total rating for the recipe
        this.updateRecipeRating(recipeID)



        // Tell the user it's all done
        setTimeout(() => {
          //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
          Alert.alert(
            "Rating Submission",
            "Rating Submission Successful",
            [
              { text: "OK", onPress: () => this.setState({
                starCount: 0,
                isRateModalVisible: false
              }) }
            ]
          );
      }, 1500);

        console.log('Rating Submitted: ' + rating)

    }

    setSections = sections => {
      this.setState({
          activeSections: sections.includes(undefined) ? [] : sections,
      });
    }

    // Once a date is it's time to submit it to the DB
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        // get the recipe
        var recipe = {}
        for (i = 0; i < this.state.rec_data.length; i++) {
          if (this.state.rec_data[i].recName == this.state.selectedRecipe) {
            recipe = {
              "recName": this.state.rec_data[i].recName,
              "ingredients": this.state.rec_data[i].ingredients,
              "instructions": this.state.rec_data[i].instructions,
              "downloadURL": this.state.rec_data[i].downloadURL,
              "dairy": this.state.rec_data[i].dairy,
              "eggs": this.state.rec_data[i].eggs,
              "fish": this.state.rec_data[i].fish,
              "gluten": this.state.rec_data[i].gluten,
              "nuts": this.state.rec_data[i].nuts,
              "shellfish": this.state.rec_data[i].shellfish,
              "soy": this.state.rec_data[i].soy,
              "dateTime": this.formatDate(date.toString())
            }
          }
        }
        console.log(recipe)
        db.ref('/userAgendas/'+this.state.uid).push(recipe)
        .then(() => this.hideDateTimePicker())
        .catch(() => console.log('failure has been achieved'))


    }

  render() {
    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                hasBackdrop={true}
                backdropColor={"#000"}
                backdropOpacity={0.70}
                isVisible={this.state.isRateModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has now been closed.');
                }}>


                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{
                        width: '100%',
                        height: '30%',
                        backgroundColor: "#fff",
                        borderColor: "#000", borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 1,
                        alignContent: 'center',
                    }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#FD8017' }}>
                            <Text style={styles.title}>Rate this recipe?</Text>
                            <TouchableOpacity>
                                <EntypoIcon
                                    name="circle-with-cross"
                                    style={styles.exitModalIcon}
                                    size={50}
                                    onPress={() => {
                                        this.setState(
                                            { isRateModalVisible: false }
                                        );
                                    }}
                                ></EntypoIcon>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '75%', alignContent: 'center', alignSelf: 'center', marginRight: 10, marginTop: '15%' }}>
                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'#e35514'}
                                halfStarEnabled
                                starPadding={10}
                                animation='bounce'
                            />
                            <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 18, paddingTop: 10}}>Tap a star to give a rating!</Text>
                        </View>
                    </View>
                </View>


                </Modal>

            <View style={{
                justifyContent: "center",
                alignItems: "center", }}>
                <DateTimePickerModal
                    isVisible={this.state.isDateTimePickerVisible}
                    mode="datetime"
                    onConfirm={(date) => this.handleDatePicked(date)}
                    onCancel={() => this.hideDateTimePicker()}
                />
            </View>


	  <FlatList
		data = {this.state.rec_data}
		renderItem={({item}) => {
		  return (
			<ImageBackground
				source={{uri: item.downloadURL}}
				resizeMode="cover"
				style={styles.image2}
				imageStyle={styles.image2_imageStyle}
				>

          <ImageBackground
            style={styles.image2}
            imageStyle={{ flex: 1, opacity: 0.5, height: null, width: null, resizeMode: 'stretch', borderRadius: 20 }}
            source={require("../assets/images/recipeGradient.png")}
            testID='currentImage' >
                <Text
                style={styles.recText}
                NumberOfLines={1}>{this.truncateRecName(item.recName)}</Text>

                <TouchableOpacity style={styles.trashButton} onPress={() => this.unsaveRecipe(item.id)}>
                  <FontAwesomeIcon name="trash" style={styles.icon}></FontAwesomeIcon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton}
                  onPress={() => {
                    this.showDateTimePicker();
                    this.setState(
                      {selectedRecipe: item.recName,}
                      );
                    }
                  }>
                  <FontAwesomeIcon name="plus-circle" style={styles.addIcon}></FontAwesomeIcon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rateButton}
                    onPress={() => {
                        this.setState(
                            { isRateModalVisible: true,
                              selectedRecipe: item.recName }
                        );
                    }}
                    >
                    <IoniconsIcon name="ios-star" style={styles.rateIcon}></IoniconsIcon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButton}
                    onPress={() => {
                        this.setState(
                            { isRateModalVisible: true,
                              selectedRecipe: item.recName }
                        );
                    }}
                    >
                    <EntypoIcon name="share" style={styles.shareIcon}></EntypoIcon>
                </TouchableOpacity>
          </ImageBackground>
			</ImageBackground>
		  )
    }}
		keyExtractor={(item) => item.id}
	  />

      <ViewRecipeModal
          currentRecipeName={this.state.currentRecipeName}
          CONTENT={this.state.CONTENT}
          isModalVisible={this.state.isViewRecipeVisible}
          isEgg={this.state.isEgg}
          isGluten={this.state.isGluten}
          isNuts={this.state.isNuts}
          isDairy={this.state.isDairy}
          isSoy={this.state.isSoy}
          isFish={this.state.isFish}
          isShellfish={this.state.isShellfish}
          activeSections={this.state.activeSections}
          multipleSelect={this.state.multipleSelect}
          starRating={this.state.rating}
          setSections={this.setSections}
          displayRecipeModal={this.displayRecipeModal.bind(this)}
        >
      </ViewRecipeModal>


    </View>
  );}
}
