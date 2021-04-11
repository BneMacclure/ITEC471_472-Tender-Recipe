import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config/config.json';
const CustomIcon = createIconSetFromFontello(fontelloConfig, 'CustomIcons');

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

export default class ViewRecipeModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSections: PropTypes.array,
            //true
            collapsed: PropTypes.bool,
            multipleSelect: PropTypes.bool,
            currentRecipeName: PropTypes.string,
            isModalVisible: PropTypes.bool,
            CONTENT: PropTypes.array,
            isEgg: PropTypes.bool,
            isGluten: PropTypes.bool,
            isDairy: PropTypes.bool,
            isSoy: PropTypes.bool,
            isFish: PropTypes.bool,
            isShellfish: PropTypes.bool,
            isNuts: PropTypes.bool,
            setSections: PropTypes.func,
            onChange: PropTypes.func,
            starRating: PropTypes.double,
        }

/*        this.propTypes = {
            isModalVisible: PropTypes.bool,
            CONTENT: PropTypes.array,
            isEgg: PropTypes.bool,
            isGluten: PropTypes.bool,
            isDairy: PropTypes.bool,
            isSoy: PropTypes.bool,
            isFish: PropTypes.bool,
            isShellfish: PropTypes.bool,
            isNuts: PropTypes.bool,
        }

        this.defaultProps = {
            collapsed: false,
        }
        */
    }

    displayRecipeModal(show) {
        this.setState({ isModalVisible: show })
    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }



    setContent = data => {
        this.setSate({ CONTENT : data });
    }

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={styles.header}
                //style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    }

    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Animatable.Text animation={isActive ? 'bounceInUp' : undefined}>
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isVisible = nextProps.propVisible;
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                hasBackdrop={true}
                backdropColor={"#000"}
                backdropOpacity={0.70}
                isVisible={this.props.isModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has now been closed.');
                }}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{
                        width: '100%',
                        height: '65%',
                        backgroundColor: "#fff",
                        borderColor: "#000", borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 1
                    }}>
                        <ScrollView style={styles.svContentContainer}>
                            <Text style={styles.title}>{this.props.currentRecipeName}</Text>
                            <Collapsible collapsed={false} align="center">
                                <View style={{ flex: 1, marginBottom: 5 }}>
                                <StarRating
                                disabled={true}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.props.starRating}
                                selectedStar={() => {}}
                                fullStarColor={'red'}
                                halfStarEnabled
                                />
                                    <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'center', marginLeft: '4.5%' }}>

                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="gluten_allergen"
                                                //size={45}
                                                style={[this.props.isGluten ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="peanut_allergen"
                                                //size={45}
                                                style={[this.props.isNuts ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="egg_allergen"
                                                //size={45}
                                                style={[this.props.isEgg ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="dairy_allergen"
                                                //size={45}
                                                style={[this.props.isDairy ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="fish_allergen"
                                                //size={45}
                                                style={[this.props.isFish ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="shellfish_allergen"
                                                //size={45}
                                                style={[this.props.isShellfish ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.allergen_icon}
                                        >
                                            <CustomIcon name="soy_allergen"
                                                //size={45}
                                                style={[this.props.isSoy ? styles.allergen_active : styles.allergen_inactive]}>
                                            </CustomIcon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Collapsible>



                            <Accordion
                                activeSections={this.props.activeSections}
                                sections={this.props.CONTENT}
                                touchableComponent={TouchableOpacity}
                                expandMultiple={this.props.multipleSelect}
                                renderHeader={this.renderHeader}
                                renderContent={this.renderContent}
                                duration={400}
                                onChange={this.props.setSections}
                            />


                            <View style={styles.exitRecipeContainer}>
                                <TouchableOpacity
                                    onPress={() => this.props.displayRecipeModal(false)}
                                    style={styles.exitBtn}
                                >
                                    <Text style={styles.exitRecipeText}>Exit View</Text>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    svContentContainer: {
    },

    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '300',
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: '7%',
        //fontFamily: 'BigShouldersDisplay_700Bold'
    },

    allergen_icon: {
        width: 50,
        height: 50,
        //backgroundColor: "#E6E6E6",
        //backgroundColor: "#f94723",
        borderRadius: 100,
        justifyContent: "center",
        marginLeft: '0.5%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
        overflow: "hidden"
    },

    allergen_active: {
        color: '#e35514',
        fontSize: 50,
    },

    allergen_inactive: {
        color: '#6E6A68',
        fontSize: 50,
    },

    exitRecipeContainer: {
        height: 196,
        paddingTop: 40,
        alignSelf: "center",
        width: '80%',
    },

    exitRecipeText: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center",
        fontWeight: "bold",
    },

    exitBtn: {
        height: 56,
        backgroundColor: "#e35514",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center"
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    header: {
        backgroundColor: '#FD8014',
        padding: 20,
        marginBottom: 5,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    //PropTypes.string.isRequired, onPress: PropTypes.func.isRequired
});

ViewRecipeModal.propTypes = { propVisible: PropTypes.bool };
