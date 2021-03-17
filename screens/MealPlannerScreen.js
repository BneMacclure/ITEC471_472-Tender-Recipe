import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity, Animated } from 'react-native';
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


    const rightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0]
        })
        return (
            <>
                <TouchableOpacity onPress={() => alert('Delete button pressed')}>
                    <View style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center', marginTop: 15, borderRadius: 3, }}>
                        <Animated.Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: '600',
                                transform: [{ scale }],
                            }}>
                            Delete
                        </Animated.Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    };

    const loadItems = (day) => {
        setTimeout(() => {
            // for (let i = -15; i < 85; i++) {
            //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            //     const strTime = timeToString(time);
            //     if (!items[strTime]) {
            //         items[strTime] = [];
            //         const numItems = Math.floor(Math.random() * 3 + 1);
            //         for (let j = 0; j < numItems; j++) {
            //             items[strTime].push({
            //                 name: 'Item for ' + strTime + ' #' + j,
            //                 height: Math.max(50, Math.floor(Math.random() * 150)),
            //             });
            //         }
            //     }
            // }
            // Get current user
            var currentUserID = ''
            firebaseApp.auth().onAuthStateChanged((user) => {
            var currentUserID = firebaseApp.auth().currentUser.uid;
            })




            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

    const renderItem = (item) => {
        return (
            <Swipeable renderRightActions={rightActions}>
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
                                <Avatar.Image size={80} source={require('../assets/images/waffles.jpg')} />
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
});

export default MealPlannerScreen;
