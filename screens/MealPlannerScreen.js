import React, { Component, useEffect, useState, setState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, ImageBackground, Picker, TouchableOpacity, Animated, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { firebaseApp, db } from '../config/DatabaseConfig';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal';
import ViewRecipeModal from '../components/ViewRecipeModal';

const SCREEN_WIDTH = Dimensions.get('window').width

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const MealPlannerScreen = (props) => {
    const [items, setItems] = useState({});
    const [uid, setUid] = useState('')
    const [itemKey, setItemKey] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [isRecipeVisible, setIsRecipeVisible] = useState(false);
    const [rec_data, setRecData] = useState([]);
    const [num, setNum] = useState(0);

    const [CONTENT, setCONTENT] = useState([]);
    const [activeSections, setActiveSections] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [isViewRecipeVisible, setViewRecipeVisible] = useState(false);
    const [isEgg, setIsEgg] = useState(false);
    const [isGluten, setIsGluten] = useState(false);
    const [isNuts, setIsNuts] = useState(false);
    const [isDairy, setIsDairy] = useState(false);
    const [isSoy, setIsSoy] = useState(false);
    const [isFish, setIsFish] = useState(false);
    const [isShellfish, setIsShellfish] = useState(false);
    const [rating, setRating] = useState(0.0);



    const deleteFromAgenda = () => {

    }

    useEffect(() => {
        var currentUserID = firebaseApp.auth().currentUser.uid;

        setUid(currentUserID)


        db.ref('/savedRecipes/'+currentUserID).once('value', (snapshot) => {
        var returnArray = [];
        snapshot.forEach(function(childSnapshot) { // iterate through each recipe
            var recname, ingredients, instructions, dairy, eggs, fish, gluten, nuts, shellfish, soy, downloadURL, rating;
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
            rating = child.totalRating;
            console.log(recname+"Rating:*************************: "+rating)

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
            "rating" : rating
            });
        });
        setRecData(returnArray)
        loadItems('')
        });
    }, num)

    const getRecipe = (name) => {
        var index = -1;
        for(var i = 0; i < rec_data.length; i++)
        {
            if(rec_data[i].recName == name)
            {
                index = i;
                i = rec_data.length;
            }
        }
        var recipeObj = rec_data[index]
        var allergens, ingredients, instructions, nuts, gluten, shellfish, dairy, fish, eggs, soy;
        var newContent;
        setRecipeName(name);
        ingredients = recipeObj.ingredients;
        instructions = recipeObj.instructions;
        nuts = recipeObj.nuts ? "nuts, " : '';
        recipeObj.nuts ? setIsNuts(true) : setIsNuts(false);
        gluten = recipeObj.gluten ? 'gluten, ' : '';
        recipeObj.gluten ? setIsGluten(true) : setIsGluten(false);
        shellfish = recipeObj.shellfish ? 'shellfish, ' : '';
        recipeObj.shellfish ? setIsShellfish(true) : setIsShellfish(false);
        dairy = recipeObj.dairy ? 'dairy, ' : '';
        recipeObj.dairy ? setIsDairy(true) : setIsDairy(false);
        fish = recipeObj.fish ? 'fish, ' : '';
        recipeObj.fish ? setIsFish(true) : setIsFish(false);
        eggs = recipeObj.eggs ? 'eggs, ' : '';
        recipeObj.eggs ? setIsEgg(true) : setIsEgg(false);
        soy = recipeObj.soy ? "soy, " : '';
        recipeObj.soy ? setIsSoy(true) : setIsSoy(false);
        setRating(recipeObj.rating)
        console.log('Rating: '+recipeObj.rating)

        allergens = nuts+gluten+shellfish+dairy+fish+eggs+soy;

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
        setCONTENT(newContent)

    };

    const setSections = sections => {
        setActiveSections(sections.includes(undefined) ? [] : sections)
    };

    const displayRecipeModal = (visibility) => {
        setViewRecipeVisible(visibility)
    };

    const rightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0]
        })
        return (
            <>
                <TouchableOpacity onPress={() => deleteItemPrompt(itemKey)}>
                    <View style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center', marginTop: 15, borderRadius: 3, }}>
                        <Icon name="trash" style={styles.trashIcon}></Icon>
                    </View>
                </TouchableOpacity>
            </>
        )
    };

    const loadItems = (day) => {
        console.log("loading items......")
        setTimeout(() => {
            // Get current user
            var currentUserID = firebaseApp.auth().currentUser.uid;

            setUid(currentUserID)

            var loading = {}

            db.ref('/userAgendas/'+currentUserID).on('value', (snapshot) =>{
                snapshot.forEach((childSnapshot) => {
                    var data = childSnapshot.val()
                    if(!items[data.dateTime]) {
                        loading[data.dateTime] = [{"name": data.recName, "src": data.downloadURL, "date": data.dateTime, "key": childSnapshot.key}]
                    }
                })
            })

            console.log('Finished loading')
            console.log(loading)




            setItems(loading);
        }, 1000);
    };

    // show the time picker modal
    const showDateTimePicker = () => {
        setIsDateTimePickerVisible(true);
        console.log("Show date time picker has been set to true");
    };

     // hide the time picker modal
    const hideDateTimePicker = () => {
        setIsDateTimePickerVisible(false);
        console.log("Show date time picker has been set to false");
    };

    // show the recipe modal
    const showModal = () => {
        setIsModalVisible(true);
        console.log("");
    };

    // hide the recipe modal
    const hideModal = () => {
        setIsModalVisible(false);
        console.log("");
    };

    const numberfyMonth = (monthStr) => {
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

    const formatDate = (date) => {
        var newDate = ''
        var res = date.split(" ")
        // "Wed Mar 17 2021 18:04:50 GMT-0400 (EDT)"
        var year = res[3]
        var day = res[2]
        var month = numberfyMonth(res[1])
        var time = res[4]

        newDate = year + '-' + month + '-' + day

        return newDate
    }

    // Once a date is it's time to submit it to the DB
    const handleDatePicked = (date) => {
        console.log("A date has been picked: ", date);
        // get the recipe
        var recipe = {}
        for (i = 0; i < rec_data.length; i++) {
          if (rec_data[i].recName == selectedRecipe) {
            recipe = {
              "recName": rec_data[i].recName,
              "ingredients": rec_data[i].ingredients,
              "instructions": rec_data[i].instructions,
              "downloadURL": rec_data[i].downloadURL,
              "dairy": rec_data[i].dairy,
              "eggs": rec_data[i].eggs,
              "fish": rec_data[i].fish,
              "gluten": rec_data[i].gluten,
              "nuts": rec_data[i].nuts,
              "shellfish": rec_data[i].shellfish,
              "soy": rec_data[i].soy,
              "dateTime": formatDate(date.toString())
            }
          }
        }
        console.log(recipe)
        db.ref('/userAgendas/'+uid).push(recipe)
        .then(() => {
            hideDateTimePicker()
            setNum(num+1)
        })
        .catch(() => console.log('failure has been achieved'))
    }

    const deleteItemPrompt = (itemKey) => {
        Alert.alert(
            "Delete Item",
            "Are you sure you wish to delete this item from your agenda?",
            [
              {
                text: "NO",
                onPress: () => console.log("NO Pressed"),
                style: "cancel"
              },
              { text: "YES", onPress: () => deleteItem(itemKey) },
            ],
            {cancellable: false}
          );
    }

    const deleteItem = (itemKey) => {
        db.ref('/userAgendas/'+uid+"/"+itemKey).set(null).then(() => {
            console.log('removed successfully'+itemKey)
            loadItems('')
        })
    }

    const renderItem = (item) => {
        // console.log("item")
        // console.log(item)
        return (
            //onSwipeableRightOpen={() => deleteItemPrompt(item.key)}>
            <Swipeable renderRightActions={rightActions} onSwipeableRightOpen={setItemKey(item.key)}>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => {
                        setIsRecipeVisible(true)
                        setSelectedRecipe(item.name)
                        getRecipe(item.name)
                        setViewRecipeVisible(true)
                        }}>
                    <Card>
                        <Card.Content>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text
                                numberOfLines={1}
                                style={styles.cardTitle}>{item.name}</Text>
                                <Avatar.Image size={80} source={{uri: item.src}} />
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                hasBackdrop={true}
                backdropColor={"#000"}
                backdropOpacity={0.70}
                isVisible={isVisible}
                >

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{
                        width: '100%',
                        height: '80%',
                        backgroundColor: "#EBE5E4",
                        borderColor: "#000", borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 1
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "#FD8017", height: '8%'}}>
                            <TouchableOpacity>
                                <EntypoIcon
                                    name="circle-with-cross"
                                    style={styles.exitModalIcon}
                                    size={50}
                                    onPress={() => setIsVisible(false)}
                                ></EntypoIcon>
                            </TouchableOpacity>
                        </View>
                        <FlatList

                            data = {rec_data}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.recipeImageContainer}
                                            onPress={() => {
                                                showDateTimePicker();
                                                //setIsVisible(false)
                                                setSelectedRecipe(item.recName);
                                            }
                                            }>
                                        <ImageBackground
                                            source={{ uri: item.downloadURL }}
                                            resizeMode="cover"
                                            style={styles.recipeImageContainer}
                                            imageStyle={styles.recipeImage}
                                        >

                                            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#FD8017", height: '30%', marginTop: '25%'}}>

                                            <Text
                                            numberOfLines={1}
                                            style={styles.recipeText}>{item.recName}</Text>

                                            <TouchableOpacity style={styles.magnifyButton}>
                                            <MaterialCommunityIconsIcon
                                                name="magnify"
                                                size={35}
                                                style={styles.addRecipeIcon}
                                                onPress={() => {
                                                    getRecipe(item.recName)
                                                    setViewRecipeVisible(true)
                                                }}>
                                            </MaterialCommunityIconsIcon>
                                            </TouchableOpacity>

                                            </View>

                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item) => item.id}

                        />
                    </View>
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center", }}>
                    <DateTimePickerModal
                        isVisible={isDateTimePickerVisible}
                        mode="datetime"
                        onConfirm={(date) => {
                            handleDatePicked(date)
                            setIsVisible(false)}}
                        onCancel={() => hideDateTimePicker()}
                    />
                </View>

            </Modal>

            <ViewRecipeModal
                       currentRecipeName={recipeName}
                       CONTENT={CONTENT}
                       isModalVisible={isViewRecipeVisible}
                       isEgg={isEgg}
                       isGluten={isGluten}
                       isNuts={isNuts}
                       isDairy={isDairy}
                       isSoy={isSoy}
                       isFish={isFish}
                       isShellfish={isShellfish}
                       activeSections={activeSections}
                       multipleSelect={multipleSelect}
                       starRating={rating}
                       setSections={setSections}
                       displayRecipeModal={displayRecipeModal.bind(this)}
                       >
                   </ViewRecipeModal>

            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                renderItem={renderItem}
                theme={{
                    dotColor: 'orange',
                    selectedDayBackgroundColor: 'orange',
                    //agendaDayTextColor: 'orange',
                    //agendaDayNumColor: 'orange',
                    agendaTodayColor: '#e35514',
                    //calendarBackground: '#e35514',
                    backgroundColor: '#F1F1F8',
                }}
            />
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={styles.addButton}
            >
                <MaterialCommunityIconsIcon
                    name="plus"
                    style={styles.icon}
                ></MaterialCommunityIconsIcon>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    agendaStyle: {
        marginTop: 10,
    },
    icon: {
        //color: "rgba(80,220,232,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 100,
        marginTop: -10,
        marginLeft: -10,
    },
    addButton: {
        width: 80,
        height: 80,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        //alignSelf: 'center',
        top: '88%',
        left: '74%',
        position: "absolute",
        shadowColor: '#000', // IOS
        shadowOffset: { height: 5, width: 1 }, // IOS
        shadowOpacity: 0.7, // IOS
        shadowRadius: 2, //IOS
        elevation: 20,
    },
    trashIcon: {
        //color: "rgba(80,207,12,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        paddingHorizontal: 10,
        alignSelf: "center"
    },
    exitModalIcon: {
        //color: "#f94723",
        color: "#fff",
    },
    recipeImageContainer: {
        width: SCREEN_WIDTH,
        height: 140,
        marginTop: 1,
        marginBottom: 6,
    },
    recipeImage: {},
    recipeText: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        width: '70%',
        marginTop: -6,
        marginLeft: 6,
        justifyContent: 'flex-start'
    },
    addRecipeIcon: {
        //color: "#f94723",
        color: "#FD8017",
    },
    magnifyButton: {
        backgroundColor: "#fff",
        borderRadius: 100,
        height: 35,
        width: 35,
        marginTop: 3,
        marginRight: '12%'
    },
    cardTitle: {
        width: '70%',
        fontSize: 18,
    }
});

export default MealPlannerScreen;
