import { useState, useEffect } from "react";
import {
    Text,
    View,
    Alert
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import QRCode from 'react-native-qrcode-svg';
import {Wave} from "react-native-animated-spinkit";

import * as encryptedStorage from "../functions/encrypted-storage";
import {encrypt} from "../functions/crypto";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import { Btn } from "../components/button";

const ReceiveViaOffline = (props) => {
    const [username, setUsername] = useState("");
    const [deviceId, setDeviceID] = useState(0);
    const [qrValue, setQrValue] = useState("bushfuhudhudhvudnvudhuv");
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setUsername(parsedSession.user_online_data.username);
                setDeviceID(parsedSession.device_id);
                const data = await encrypt(
                    JSON.stringify({
                        receiverUsername : username,
                        receiverDeviceId : deviceId,
                        key : "stackion-user-receive-via-offline"
                    })
                )
                setQrValue(data);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Receive offline"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} >
            <View style={style.formView}>
                <Text style={{
                    fontSize : moderateScale(16),
                    color : Colors.black31,
                    fontFamily : "Roboto-Regular",
                    textAlign : "center"
                }} >
                    {username}
                </Text>
                <View style={[style.qrCodeContainer, DefaultStyle.centeredXY, style.contentsInBodyCont]}>
                    {qrValue == "bushfuhudhudhvudnvudhuv" ?
                        <Wave size={moderateScale(48)} color={Colors.defaultBlue} />
                        :
                        <QRCode value={qrValue} size={verticalScale(210)} color={Colors.black}
                        logo={require("../../assets/images/favicon.png")}
                        backgroundColor={Colors.white}
                        logoBackgroundColor={Colors.white}
                        logoBorderRadius={100}
                        />
                    }
                </View>
                <View style={[{marginTop : verticalScale(35)}, DefaultStyle.centeredX]}>
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
        minWidth : "289@s",
        maxWidth : "340@s",
    },
    formView : {
        maxHeight : "650@vs",
        width : "100%",
        maxWidth : "320@s",
        minWidth : "200@s",
        padding : "10@ms",
    },
    qrCodeContainer : {
        marginTop : "46@vs",
        marginBottom : "46@vs",
        height : "60%",
        maxHeight : "260@vs",
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
    scanToReceiveBtn : {
        height : "40@vs",
        backgroundColor : Colors.defaultBlue,
        marginTop : "14%",
        borderRadius : "8@ms",
    },
    scanToReceiveBtnText : {
        color : Colors.white,
        fontSize : "16@ms",
        fontFamily : "Comfortaa-Regular"
    }
})

export default ReceiveViaOffline;