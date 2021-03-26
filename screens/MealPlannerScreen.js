import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, ImageBackground, Picker, TouchableOpacity, Animated, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { firebaseApp, db } from '../config/DatabaseConfig';
import Modal from 'react-native-modal';

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
    const [selectedValue, setSelectedValue] = useState(0);

    const deleteFromAgenda = () => {

    }


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
                    console.log(data)
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

    const displayRecipeModal = () => {

    }

    const renderItem = (item) => {
        // console.log("item")
        // console.log(item)
        return (
            //onSwipeableRightOpen={() => deleteItemPrompt(item.key)}>
            <Swipeable renderRightActions={rightActions} onSwipeableRightOpen={setItemKey(item.key)}>
                <TouchableOpacity style={{ marginTop: 15 }}>
                    <Card>
                        <Card.Content>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text>{item.name}</Text>
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
                            <View style={{ borderRadius: 35, backgroundColor: '#fff', width: '35%', height: '75%', marginTop: 6, marginRight: '50%', alignContent: "center", justifyContent: "center",}}>
                                <Picker
                                    style={{ height: 50, width: 120, marginLeft: 10}}
                                    itemStyle={{ backgroundColor: "black", color: "blue", fontSize: 17 }}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                                >
                                    <Picker.Item label="Filter" value="0"></Picker.Item>
                                    <Picker.Item label="Breakfast" value="1"></Picker.Item>
                                    <Picker.Item label="Lunch" value="1"></Picker.Item>
                                    <Picker.Item label="Dinner" value="1"></Picker.Item>
                                </Picker>
                            </View>

                            <TouchableOpacity>
                                <EntypoIcon
                                    name="circle-with-cross"
                                    style={styles.exitModalIcon}
                                    size={50}
                                    onPress={() => setIsVisible(false)}
                                ></EntypoIcon>
                            </TouchableOpacity>
                        </View>
                        <FlatList>
                            {/*
                            data = {this.state.rec_data}
                            renderItem={({ item }) => {
                                return (
                                    <ImageBackground
                                        source={{ uri: item.downloadURL }}
                                        resizeMode="cover"
                                        style={styles.recipeImageContainer}
                                        imageStyle={styles.recipeImage}
                                    >

                                        <Text style={styles.recipeText}>{item.recName}</Text>
                                        <TouchableOpacity style={styles.trashButton} onPress={() => this.unsaveRecipe(item.id)}>
                                            <FontAwesomeIcon name="trash-o" style={styles.icon}></FontAwesomeIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.addButton}
                                            onPress={() => {
                                                this.showDateTimePicker();
                                                this.setState(
                                                    { selectedRecipe: item.recName, }
                                                );
                                            }
                                            }>
                                            <FontAwesomeIcon name="plus-circle" style={styles.addIcon}></FontAwesomeIcon>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )
                            }}
                            keyExtractor={(item) => item.id}
                            */}
                            </FlatList>
                    </View>
                </View>

            </Modal>


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
        marginTop: 1
    },
    recipeImage: {},
    recipeText: {
        color: "rgba(255,255,255,1)",
        fontSize: 35,
        marginTop: 84,
        marginLeft: 8
    },
});

export default MealPlannerScreen;
