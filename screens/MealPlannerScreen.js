import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity, Animated, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {firebaseApp, db} from '../config/DatabaseConfig';


const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const MealPlannerScreen = (props) => {
    const [items, setItems] = useState({});
    const [uid, setUid] = useState('')
    const [itemKey, setItemKey] = useState("")

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

            db.ref('/userAgendas/'+currentUserID).once('value', (snapshot) =>{
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
                //onPress={() => this.displayRecipeModal(true)}

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
});

export default MealPlannerScreen;
