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

const ReceiveViaOffline = (props) => {
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
        <InAppHB navigation={props.navigation} headerTitleText={"Receive offline"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.formView}>
                <Text style={{
                    fontSize : 16,
                    color : Colors.black31,
                    fontFamily : "Roboto-Regular",
                    textAlign : "center"
                }} >
                    @{username}
                </Text>
                <View style={[style.qrCodeContainer, DefaultStyle.centeredXY, style.contentsInBodyCont]}>
                    <QRCode value={JSON.stringify({
                        receiverUsername : username,
                        receiverDeviceId : deviceId
                    })} size={250} color={Colors.blue2}
                    logo={require("../../assets/images/favicon.png")}
                    backgroundColor={Colors.white}
                    logoBackgroundColor={Colors.white}
                    enableLinearGradient={true}
                    linearGradient={[Colors.defaultBlue,Colors.blue2]} />
                </View>
                <View style={[{marginTop : 35}, DefaultStyle.centeredX]}>
                    <Text style={style.instructionTextInPage}>
                        Ask the sender to scan the QR-code with their app.
                    </Text>
                </View>
                <Btn style={[style.contentsInBodyCont, DefaultStyle.centeredXY, style.scanToReceiveBtn]}
                text="Scan to receive" textStyle={style.scanToReceiveBtnText}
                onPress={() => props.navigation.navigate("ScanToReceive")} />
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

export default ReceiveViaOffline;