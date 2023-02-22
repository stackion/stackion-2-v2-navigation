import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";

const ScanToSendOffline = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Scan to send"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.View}>
                <View style={[style.qrCodeScannerContainer, DefaultStyle.blayout, DefaultStyle.centeredXY, style.contentsInBodyCont]}></View>
                <View style={[{marginTop : 35}, DefaultStyle.centeredX]}>
                    <Text style={style.instructionTextInPage}>
                        Scan the QR-code on the receiver’s screen.
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
    View : {
        maxHeight : 650,
        width : "100%",
        maxWidth : 320,
        minWidth : 200,
        padding : 10,
    },
    qrCodeScannerContainer : {
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
})

export default ScanToSendOffline;