import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const DATA = [
	{
		recName: "Spaghetti"
	},
	{
		recName: "sCum"
	},
	{
		recName: "Papas Special Sauce ;)"
	},
];

const Item = ({recName}) => (
	<View style={styles.item}>
		<Text style={styles.recName}>{recName}</Text>
		<TouchableOpacity style={styles.trashButton}>
			<Icon name="trash" style={styles.icon}></Icon>
		</TouchableOpacity>
	</View>
);

function MyRecipes(props) {
  const renderItem = ({ item }) => (
	<Item recName={item.recName} />
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Gradient.png")}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.filterRow}>
          <Text style={styles.filter}>Filter</Text>
          <Icon name="chevron-down" style={styles.icon}></Icon>
        </View>
      </ImageBackground>
	  
	  <FlatList
		data = {DATA}
		renderItem={renderItem}
		keyExtractor={item => item.id}
	  />
	  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  image: {
    width: 360,
    height: 46,
    flexDirection: "row",
    marginTop: 23
  },
  image_imageStyle: {},
  filter: {
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 14,
    fontSize: 20,
    marginTop: 4
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    height: 22,
    width: 20,
    marginLeft: 6
  },
  trashButton: {
    width: 30,
    height: 30,
    backgroundColor: "#E6E6E6",
    marginLeft: 31
  },
  filterRow: {
    height: 22,
    flexDirection: "row",
    flex: 1,
    marginRight: 17,
    marginLeft: 272,
    marginTop: 14
  },
  item: {
    backgroundColor: '#8c8c8c',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default MyRecipes;