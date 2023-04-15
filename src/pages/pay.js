import {useState, useEffect} from "react";
import {
    Text,
    View,
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale } from 'react-native-size-matters';
import { Wave } from 'react-native-animated-spinkit';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import {Btn} from "../components/button";

const Pay = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Make Payments"} >
            <View style={[DefaultStyle.centeredX, style.contentsInBodyCont]} >
                <Btn style={[DefaultStyle.centeredY, style.actionBtns]}
                text="Withdrawl to bank"
                textStyle={[style.actionBtnsText]} />
            </View>
        </InAppHB>
    )
}

const style = StyleSheet.create({
    contentsInBodyCont : {
        width : "100%",
        minWidth : "289@s",
        maxWidth : "340@s",
    },
    actionBtns : {
        height : "55@vs",
        width : "320@s",
        borderColor : Colors.blackF2,
        borderWidth : "3@ms",
        borderStyle : "solid",
        paddingLeft : "5@s",
        backgroundColor : Colors.white
    },
    actionBtnsText : {
        fontSize : "16@ms",
        fontFamily : "Roboto-Medium",
        color : Colors.black31
    }
})

export default Pay;