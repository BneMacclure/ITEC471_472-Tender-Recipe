import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export class ShoppingListItem extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <CheckBox
                        title={this.props.title}
                        checked={this.props.checked}
                        containerStyle={styles.checkBox}
                        onPress={() => this.props.itemFunc(!this.props.checked)}
                    />
                    <View style={styles.textBox}>
                        <Text style={styles.countText}>{this.props.count}</Text>
                    </View>
                </View>       
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    checkBox: {
        width: SCREEN_WIDTH - 50
    },
    textBox: {
        backgroundColor: "white",
        width: 35,
        height: 44,
        justifyContent: 'center',
        marginTop: 6,
        marginLeft: -8
    },
    countText: {
        textAlign: 'center'
    },
    row: {
        flexDirection: "row",
    }

  });