import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Share, Picker } from "react-native";
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
const CustomMysteryBox = createIconSetFromFontello(fontelloConfig, 'CustomIconsMysteryBox');
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default class MyRecipes extends Component {
  
  constructor(props) {
    super(props)

      this.state = {
          //isVisible: false,
          isDateTimePickerVisible: false,
          rec_data: [],
          selectedRecipe: '',
          uid: '',
          starCount: 0.0,
          isRateModalVisible: false,
    }
  }

  // sorts recipes by name
  orderData() {
    this.state.rec_data.sort(function(a, b) {
      var name1 = a.name; //.toUpperCase();
      var name2 = b.name; //.toUpperCase();
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    });
  };

  async shareRecipe (key){
    var currentUserID = firebaseApp ? firebaseApp.auth().currentUser.uid : '';
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
    db.ref('/savedRecipes/'+currentUserID).child(key).remove();
    console.log(key);
  };
  
  toggleModal(){
    this.setState({isModalVisible: !isModalVisible})
  };

  componentDidMount() {
    var currentUserID = firebaseApp.auth().currentUser.uid;

    this.setState({uid: currentUserID})

    console.log(currentUserID)
    
    db.ref('/savedRecipes/'+currentUserID).once('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients, instructions, imageSource, dairy, eggs, fish, gluten, nuts, shellfish, soy, downloadURL;
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
          "soy": soy
        });
      });
      this.setState({rec_data: returnArray});
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

    onStarRatingPress = (rating) => {
        this.setState({ starCount:rating })
        
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

      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.filterRow}>
          <Picker
				style={styles.filterPicker}
				onValueChange={(value) => {
					this.setState({pickerValue: value});
					//alert("Hello");
				}}
				>
				<Picker.Item label="Filter" value="0"></Picker.Item>
				<Picker.Item label="Breakfast" value="1"></Picker.Item>
				<Picker.Item label="Lunch" value="1"></Picker.Item>
				<Picker.Item label="Dinner" value="1"></Picker.Item>
			</Picker>
        </View>
      </ImageBackground>
	  
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
				  <Text style={styles.recText}>{item.recName}</Text>
				  <TouchableOpacity style={styles.trashButton} onPress={() => this.unsaveRecipe(item.id)}>
				    <FontAwesomeIcon name="trash-o" style={styles.icon}></FontAwesomeIcon>
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
                              { isRateModalVisible: true }
                          );
                      }}
                      >
                      <IoniconsIcon name="ios-star-outline" style={styles.rateIcon}></IoniconsIcon>
                  </TouchableOpacity>
			</ImageBackground>		
		  )
    }}
		keyExtractor={(item) => item.id}
	  />
	  
    </View>
  );}
}
