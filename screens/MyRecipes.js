import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, FlatList, TouchableOpacity, Dimensions, Picker } from "react-native";
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
	}
];

const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

const Item = ({recName},{imgPath}) => (
	 <ImageBackground
		source={require("../assets/images/cheese-pizza.jpg")}
		resizeMode="cover"
		style={styles.image2}
		imageStyle={styles.image2_imageStyle}
	  >
		<Text style={styles.recName}>{recName}</Text>
	 </ImageBackground>
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
		data = {DATA}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
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
    width: SCREEN_WIDTH,
    height: 46,
    flexDirection: "row",
  },
  image_imageStyle: {},
  filter: {
    color: "#121212",
    height: 30,
    fontSize: 20,
    marginTop: 0
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
    flex: 1,
    marginRight: 17,
    marginLeft: 272,
    marginTop: 14
  },
  filterPicker: {
	bottom: 10,
	marginLeft: 0
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
  image2: {
    width: SCREEN_WIDTH,
    height: 140,
    marginTop: 1
  },
  image2_imageStyle: {},
  cheesePizza: {
    color: "rgba(255,255,255,1)",
    fontSize: 35,
    marginTop: 84,
    marginLeft: 8
  },
});

export default MyRecipes;