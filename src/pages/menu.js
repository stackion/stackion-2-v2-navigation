import { useState, useEffect } from "react";
import {
    Text,
    View,
    Alert
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from "react-native-toast-message";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const Menu = (props) => {
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Menu"} >
            <View style={style.View}>
                <Text style={{
                    fontSize : moderateScale(32),
                    color : Colors.black31,
                    fontFamily : "Comfortaa-Regular",
                    textAlign : "center"
                }} >
                    More features coming soon!
                </Text>
                <View style={[style.btnsCont, DefaultStyle.centeredXY]}>
                    <Btn text="Sign out" textStyle={style.signOutBtnText} onPress={() => {
                        Toast.show({
                            type: 'success',
                            text1: 'Copied!',
                            text2: 'Have a great day champ ✌'
                        });
                    }}/>
                </View>
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Do not sign out without converting your offline balance to fiat to prevent losses.
                    </Text>
                </View>
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
    View : {
        maxHeight : "650@vs",
        width : "100%",
        maxWidth : "320@s",
        minWidth : "200@s",
        padding : "10@ms",
    },
    inputCont : {
        marginTop : "37@vs"
    },
    input : {
        height : "45@ms",
        width : "100%",
        maxWidth : "299@s",
        minWidth : "180@s",
        padding : "11@ms",
        borderRadius : 2,
        fontSize : "16@ms",
        marginTop : "20@vs",
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        backgroundColor : Colors.blackF2,
    },
    btnsCont : {
        width : "100%",
        marginTop : "75@vs",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    signOutBtnText : {
        color : Colors.red,
        fontSize : "16@ms",
        fontFamily : "Roboto-Bold"
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
})

export default Menu;