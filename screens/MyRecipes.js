import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Picker } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import { db, firebaseApp } from '../config/DatabaseConfig';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styles from '../styles/MyRecipesStyle.js';
<<<<<<< HEAD
import { data } from "cypress/types/jquery";
=======
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
>>>>>>> a646547ba375468c9dd784b5536c9144ec114635
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default class MyRecipes extends Component {
  
  constructor(props) {
    super(props)

<<<<<<< HEAD
    this.state = {
      rec_data: [],
      currentUserID = firebaseApp.auth().currentUser.uid
=======
      this.state = {
          //isVisible: false,
          isDateTimePickerVisible: false,
          rec_data: [],
          selectedRecipe: '',
          uid: '',
          isModalVisible: false
>>>>>>> a646547ba375468c9dd784b5536c9144ec114635
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



  

  shareRecipe(key) {
    console.log(key);
    db.ref('/savedRecipes/'+currentUserID).child(key).on('value', (snapshot) => {
      db.ref('/userInfo/'+currentUserID).child().on('value', (userSnapshot) => {
        userSnapshot.forEach(childSnapshot) {
          userData = childSnapshot.val();
          recipeData = snapshot.val();
          var templateParams = {
            from_name: userData.name,
            to_name: "Insert name here", // replace with name variable from field
            to_email: "Insert email here", // replace with email variable from field
            recipe_name: recipeData.name,
            recipe_ingredients: recipeData.ingredients,
            recipe_instructions: recipeData.instructions
          }
          emailjs.send('service_z7eytox', 'template_4zzkqrh', templateParams);e
        }

      })

    })
  }

  // removes a recipe from the MyRecipes list
  unsaveRecipe(key) {
<<<<<<< HEAD
=======

    var currentUserID = firbeaseApp ? firebaseApp.auth().currentUser.uid : '';
>>>>>>> a646547ba375468c9dd784b5536c9144ec114635
    console.log(key);
    db.ref('/savedRecipes/'+currentUserID).child(key).remove();
    console.log(key);
  };
  
  toggleModal(){
    this.setState({isModalVisible: !isModalVisible})
  };

  componentDidMount() {
<<<<<<< HEAD
=======
    var currentUserID = firebaseApp.auth().currentUser.uid;

    this.setState({uid: currentUserID})

>>>>>>> a646547ba375468c9dd784b5536c9144ec114635
    console.log(currentUserID)
    
    db.ref('/savedRecipes/'+currentUserID).on('value', (snapshot) => {
      var returnArray = [];
      snapshot.forEach(function(childSnapshot) { // iterate through each recipe
        var recname, ingredients, instructions, imageSource, dairy, eggs, fish, gluten, nuts, shellfish, soy;
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
          <TouchableOpacity style={{width: 50,height: 30,marginLeft: 20, marginTop: 15}}
             onPress={() => this.showModal()}>
            <Text style={{fontSize: 10}}>Show Modal</Text>
          </TouchableOpacity>
          {/* Share Modal */}
          <Modal 
            style={{alignItems: 'center', justifyContent: 'center',}}
            isVisible = {this.state.isModalVisible}>
            <View style={{height: 300, width: 300, backgroundColor: "white"}}>
              <Text>Share (Recipe Name)</Text>
              <TextInput 
                mode="flat"
                label="Email"
                // onChangeText = {(email) => setEmail(email)}
                theme={{ colors: {placeholder: 'black', text: 'black', primary: 'black'} }}
                style={styles.inputStyle}>
              </TextInput>
              <TextInput 
                mode="flat"
                label="Recipients Name"
                // onChangeText = {(email) => setEmail(email)}
                theme={{ colors: {placeholder: 'black', text: 'black', primary: 'black'} }}
                style={styles.inputStyle}>
              </TextInput>
              <TouchableOpacity style={{width: 50,height: 30,marginLeft: 10, marginTop: 15}}
                onPress={() => this.hideModal()}>
                <Text style={{fontSize: 10}}>Hide Modal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: 50,height: 30,marginLeft: 10, marginTop: 15}}
                onPress={() => this.hideModal()}>
                <Text style={{fontSize: 10}}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
              <View style={styles.iconRow}>
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
                    <Icon name="share" style={styles.shareIcon}></Icon>
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
              </View>
          </ImageBackground>		
        )
      }}
      keyExtractor={(item) => item.id}
      />
	  
    </View>
  );}
}
