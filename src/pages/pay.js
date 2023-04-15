import {useState, useEffect} from "react";
import {
    Text,
    View,
    Image
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
                <Image style={[style.illustration]}
                source={require("../../assets/images/illustration-of-payment.png")} />
                <Btn style={[DefaultStyle.centeredXY, style.actionBtns]}
                text="Withdrawl to bank"
                textStyle={[style.actionBtnsText]}
                onPress={() => props.navigation.navigate("WithdrawalPage")} />
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
    illustration : {
        height : "230@ms",
        width : "230@ms"
    },
    actionBtns : {
        height : "45@vs",
        width : "320@s",
        backgroundColor : Colors.defaultBlue,
        borderRadius : "5@ms"
    },
    actionBtnsText : {
        fontSize : "14@ms",
        fontFamily : "Roboto-Medium",
        color : Colors.white
    }
})

export default Pay;