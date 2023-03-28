import { useState, useEffect } from "react";
import {
    Text,
    View,
    Alert
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const Menu = (props) => {
    const [name, setName] = useState("Dear User");
    const [username, setUsername] = useState("");
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setUsername(parsedSession.user_online_data.username);
                setName(parsedSession.user_online_data.name);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Receive"} >
            <View style={style.View}>
                <Text style={{
                    fontSize : (32),
                    color : Colors.black31,
                    fontFamily : "Comfortaa-Regular",
                    textAlign : "center"
                }} >
                    Hey {name}!
                </Text>
                <View style={style.inputCont}>
                    <Text style={[style.input, DefaultStyle.centeredXY]}>
                        {username}
                    </Text>
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text={(<Text>Copy   <FontAwesomeIcon icon="copy" color={Colors.white} size={moderateScale(20)} /></Text>)} style={style.copyBtn} textStyle={style.copyBtnText} onPress={() => {
                        Clipboard.setString(`${username}`);
                        Toast.show({
                            type: 'success',
                            text1: 'Copied!',
                            text2: 'Have a great day champ ✌'
                        });
                    }}/>
                </View>
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Copy and send your Username to the person you want to receive funds from.
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
        marginTop : "25@vs",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    copyBtn : {
        padding : "14@ms",
        backgroundColor : Colors.defaultBlue,
        width : "124@ms",
        borderRadius : "40@ms"
    },
    copyBtnText : {
        color : Colors.white,
        fontSize : "16@ms",
        fontFamily : "Comfortaa-Regular"
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
})

export default Menu;