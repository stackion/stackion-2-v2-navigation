import { useState } from "react";
import {
    Text,
    View,
    ScrollView
} from "react-native";
import { 
    ScaledSheet as StyleSheet,
    moderateScale,
    verticalScale
} from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Btn} from "./button";
import DefaultStyle from "../styles/defaults";
import Colors from "../styles/colors";
import { QuickMenu } from "./modals";

export const InAppHB = props => {
    return (
        <View style={[DefaultStyle.WHSpanParent, {backgroundColor : Colors.white}]}>
            <View style={[DefaultStyle.WSpanParent, style.headerCont, props.headerStyle]}>
                <Text style={[style.headerTitleText, {
                    textAlign : "center"
                }]}>
                    {props.headerTitleText}
                </Text>
            </View>
            <View style={[ DefaultStyle.WSpanParent, style.bodyCont, DefaultStyle.centeredX, {
                marginTop : verticalScale(40)
            }]}>
                <ScrollView contentContainerStyle={[DefaultStyle.centeredX]} style={[DefaultStyle.WSpanParent, /*, style.bodyContScrollView*/]} refreshControl={props.refreshControl}>
                    {props.children}
                    <View style={{height : verticalScale(200)}}></View>
                </ScrollView>
            </View>
        </View>
    )
}

const InAppHBF = props => {
    const [quickMenuVisibility, setQuickMenuVisibility] = useState(false);
    return (
        <View style={[DefaultStyle.WHSpanParent, {backgroundColor : Colors.white}]}>
            <QuickMenu navigation={props.navigation} visibility={quickMenuVisibility} closeModalBtnPressed={() => setQuickMenuVisibility(false)} />
            <View style={[DefaultStyle.WSpanParent, style.headerCont]}>
                <Btn style={[style.headerMenuBtn, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="user" color={Colors.blue2} />
                )} onPress={props.whenHeaderMenuBtnIsPressed} />
                <Text style={style.headerTitleText}>
                    {props.headerTitleText}
                </Text>
            </View>
            <View style={[ DefaultStyle.WSpanParent, style.bodyCont, DefaultStyle.centeredX]}>
                <ScrollView contentContainerStyle={[DefaultStyle.centeredX]} style={[DefaultStyle.WSpanParent, {paddingTop : verticalScale(30), marginBottom : verticalScale(50)}, /*, style.bodyContScrollView*/]} refreshControl={props.refreshControl}>
                    {props.children}
                    <View style={{height : verticalScale(200)}}></View>
                </ScrollView>
            </View>
            <View style={[DefaultStyle.WSpanParent, style.footerCont]}>
                <Btn style={[style.footerBtns, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="home" size={moderateScale(16)} color={props.activePage == "home" ? Colors.black : Colors.black46}/>
                )} textStyle={[style.footerBtnIcon]} onPress={() => {
                    props.navigation.navigate("Dashboard")
                }} />
                <Btn style={[style.footerBtns, style.quickMenuDisplayBtn, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="exchange" size={moderateScale(16)} color={Colors.white}/>
                )} textStyle={[style.footerBtnIcon]} onPress={() => setQuickMenuVisibility(true)} />
                <Btn style={[style.footerBtns, DefaultStyle.centeredXY]} text={(
                    <FontAwesomeIcon icon="wallet" size={moderateScale(16)} color={props.activePage == "wallet" ? Colors.black : Colors.black46}/>
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
        maxHeight : "70@vs",
        flexDirection : "row",
        alignItems : "center",
        paddingLeft : "10@s",
    },
    headerMenuBtn : {
        height : "30@ms",
        width : "30@ms",
        borderRadius : "15@ms",
        backgroundColor : Colors.black
    },
    headerTitleText : {
        fontSize : "20@ms",
        fontWeight : 400,
        color : Colors.black31,
        marginLeft : "15@s",
        fontFamily : "Comfortaa-Medium",
        fontWeight : 300
    },
    bodyCont : {
        flexGrow : 1,
        maxHeight : "600@vs"
    },
    bodyContScrollView : {
        maxWidth : "320@s",
        minWidth : "200@s",
    },
    footerCont : {
        height : "12%",
        maxHeight : "70@vs",
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
        height : "38@s",
        width : "38@s",
    },
    quickMenuDisplayBtn : {
        backgroundColor : Colors.defaultBlue,
        borderRadius : "50@ms"
    }
})

export default InAppHBF;