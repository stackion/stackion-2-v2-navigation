import { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    useWindowDimensions
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Btn} from "./button";
import DefaultStyle from "../styles/defaults";
import Colors from "../styles/colors";
import { QuickMenu } from "./modals"

const InAppHBF = props => {
    const {height} = useWindowDimensions();
    const [quickMenuVisibleHeight, setQuickMenuVisibleHeight] = useState(0);
    /*
    // props properties
    
    props.headerTitleText
    onPress={props.whenHeaderMenuBtnIsPressed}
    props.children  jsx {(...)}
    props.activePage == "home" || "wallet"
    props.quickMenuOpen = true || false
    */
   /*
   //remember to add button click events for navigation and menu trigger in the footer
   */
    return (
        <View style={[DefaultStyle.WHSpanParent, {backgroundColor : Colors.white}]}>
            <QuickMenu height={quickMenuVisibleHeight} closeModalBtnPressed={() => setQuickMenuVisibleHeight(0)} />
            <View style={[DefaultStyle.WSpanParent, style.headerCont]}>
                <Btn style={[style.headerMenuBtn, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="user" color={Colors.blue2} />
                )} onPress={props.whenHeaderMenuBtnIsPressed} />
                <Text style={style.headerTitleText}>
                    {props.headerTitleText}
                </Text>
            </View>
            <View style={[ DefaultStyle.WSpanParent, style.bodyCont, DefaultStyle.centeredX]}>
                <ScrollView contentContainerStyle={[DefaultStyle.centeredX]} style={[DefaultStyle.WSpanParent, {paddingTop : 30, marginBottom : 50}, /*, style.bodyContScrollView*/]}>
                    {props.children}
                    <View style={{height : 200}}></View>
                </ScrollView>
            </View>
            <View style={[DefaultStyle.WSpanParent, style.footerCont]}>
                <Btn style={[style.footerBtns, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="home" size={16} color={props.activePage == "home" ? Colors.black : Colors.black46}/>
                )} textStyle={[style.footerBtnIcon]} onPress={() => {
                    props.navigation.navigate("Dashboard")
                }} />
                <Btn style={[style.footerBtns, style.quickMenuDisplayBtn, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="exchange" size={16} color={Colors.black}/>
                )} textStyle={[style.footerBtnIcon]} onPress={() => setQuickMenuVisibleHeight(height)} />
                <Btn style={[style.footerBtns, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="wallet" size={16} color={props.activePage == "wallet" ? Colors.black : Colors.black46}/>
                )} textStyle={[style.footerBtnIcon]} onPress={() => {
                    props.navigation.navigate("Wallet")
                }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    blayout : {
        borderColor : Colors.black,
        borderWidth : 4,
        borderStyle : "solid"
    },
    headerCont : {
        height : "12%",
        maxHeight : 70,
        flexDirection : "row",
        alignItems : "center",
        paddingLeft : 10,
    },
    headerMenuBtn : {
        height : 30,
        width : 30,
        borderRadius : 15,
        backgroundColor : Colors.black
    },
    headerTitleText : {
        fontSize : 20,
        fontWeight : 400,
        color : Colors.black31,
        marginLeft : 15,
        fontFamily : "Comfortaa-Medium",
        fontWeight : 300
    },
    bodyCont : {
        flexGrow : 1,
        maxHeight : 600
    },
    bodyContScrollView : {
        maxWidth : 320,
        minWidth : 200,
    },
    footerCont : {
        height : "12%",
        maxHeight : 70,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        borderTopColor : Colors.blackF2,
        borderTopWidth : 0.8,
        borderTopStyle : "solid",
        position : "absolute",
        bottom : 0,
        zIndex : 1,
        backgroundColor : Colors.white
    },
    footerBtns : {
        height : 38,
        width : 38,
    },
    quickMenuDisplayBtn : {
        backgroundColor : Colors.defaultBlue,
        borderRadius : 50
    }
})

export default InAppHBF;