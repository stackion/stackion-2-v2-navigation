import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";

const ReceiveViaOffline = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Receive offline"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.formView}>
                <Text style={{
                    fontSize : 16,
                    color : Colors.black31,
                    fontFamily : "Roboto-Regular",
                    textAlign : "center"
                }} >
                    {'@john2023'}
                </Text>
                <View style={[style.qrCodeContainer, DefaultStyle.blayout, DefaultStyle.centeredXY, style.contentsInBodyCont]}></View>
                <View style={[{marginTop : 35}, DefaultStyle.centeredX]}>
                    <Text style={style.instructionTextInPage}>
                        Ask the sender to scan the QR-code with their app.
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
})

export default ReceiveViaOffline;