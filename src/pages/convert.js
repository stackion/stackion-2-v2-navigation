import { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import QRCode from 'react-native-qrcode-svg';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import { Btn } from "../components/button";

const ConversionMode = (props) => {
    const [username, setUsername] = useState("");
    const [deviceId, setDeviceID] = useState(0);
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setUsername(parsedSession.user_online_data.username);
                setDeviceID(parsedSession.device_id);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Convert Assets"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.formView}>
                <View style={[{marginTop : 35}, DefaultStyle.centeredX]}>
                    <Text style={style.instructionTextInPage}>
                        Choose which asset you want to convert
                    </Text>
                </View>
            </View>
        </InAppHB>
    )
}

const style = StyleSheet.create({
    contentsInBodyCont : {
        width : "100%",
        minWidth : 289,
        maxWidth : 340,
    },
    formView : {
        maxHeight : 650,
        width : "100%",
        maxWidth : 320,
        minWidth : 200,
        padding : 10,
    },
    qrCodeContainer : {
        marginTop : 46,
        marginBottom : 46,
        height : "60%",
        maxHeight : 260,
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : 12,
        fontFamily : "Roboto-Regular"
    },
    scanToReceiveBtn : {
        height : 40,
        backgroundColor : Colors.defaultBlue,
        marginTop : "14%",
        borderRadius : 8,
    },
    scanToReceiveBtnText : {
        color : Colors.white,
        fontSize : 16,
        fontFamily : "Comfortaa-Regular"
    }
})

export default ConversionMode;