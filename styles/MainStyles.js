import { StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height - 20
const SCREEN_WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },

    skip_buttonRow: {
        height: 60,
        flexDirection: "row",
        marginTop: 10,
        alignSelf: 'center',
    },

    skip_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100
    },
    icon: {
        //color: "rgba(80,220,232,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 45,
        marginTop: 6,
        alignSelf: "center"
    },
    recipe_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        marginLeft: '6%'
    },
    calendar_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        marginLeft: '6%',
    },
    magnify_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        marginLeft: '6%',
    },
    icon4: {
        //color: "rgba(80,207,12,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 43,
        marginTop: 8,
        alignSelf: "center"
    },
    calendarIcon: {
        //color: "rgba(80,207,12,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        marginTop: 10,
        alignSelf: "center"
    },
    magnifyIcon: {
        color: "rgba(255,255,255,1)",
        fontSize: 50,
        marginTop: 6,
        alignSelf: "center"
    },
    like_button: {
        width: 64,
        height: 60,
        //backgroundColor: "#E6E6E6",
        backgroundColor: "#f94723",
        borderRadius: 100,
        justifyContent: "center",
        marginLeft: '6%'
    },
    icon2: {
        //color: "rgba(244,57,8,1)",
        color: "rgba(255,255,255,1)",
        fontSize: 45,
        alignSelf: "center",
        justifyContent: "center"
    },

    background: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    background_imageStyle: {},
    materialHeader1: {
        height: '100%',
        width: '100%',
        position: "absolute",
        top: 0,
        left: 0
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
        paddingBottom: 10,
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
    content: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
    svContentContainer: {
        paddingTop: 30,
    },


    exitRecipeContainer: {
        height: 196,
        paddingTop: 40,
        alignSelf: "center",
        width: '80%',
    },

    exitBtn: {

        height: 56,
        backgroundColor: "#e35514",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center"
    },

    exitRecipeText: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center",
        fontWeight: "bold",
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
        //size: 60,
        color: '#6E6A68',
        fontSize: 50,
    },

    recipe_title: {
        fontSize: 45,
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'BigShouldersDisplay_700Bold',
        marginLeft: 6,
        marginRight: 6, 
    },

    recipe_title_container: {
        justifyContent: 'center',
        backgroundColor: '#f5a023',
        height: '8%',
    },
});