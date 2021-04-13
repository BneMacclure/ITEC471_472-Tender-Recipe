import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// const [item4Checked, setItem4Checked] = useState(false);

export class ShoppingListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <CheckBox
                        name={this.props.name}
                        checked={this.state.checked}
                        containerStyle={styles.checkBox}
                        onPress={() => this.setState({ checked: !this.state.checked})}
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