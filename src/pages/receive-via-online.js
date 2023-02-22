import {
    Text,
    View,
    Clipboard, //TODO in the future, clipboard would be removed from react native core. It should be imported from the react-native-clipboard/clipboard
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const ReceiveViaOnline = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Receive"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.View}>
                <Text style={{
                    fontSize : 32,
                    color : Colors.black31,
                    fontFamily : "Comfortaa-Regular",
                    textAlign : "center"
                }} >
                    Hey, {'John!'}
                </Text>
                <View style={style.inputCont}>
                    <Text style={[style.input, DefaultStyle.centeredXY]}>
                        @john2023
                    </Text>
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Copy" style={style.copyBtn} textStyle={style.copyBtnText} onPress={() => {
                        Clipboard.setString("@john2023");
                        Alert.alert("copied");
                    }}/>
                </View>
                <View style={{marginTop : 35}}>
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
    inputCont : {
        marginTop : 37
    },
    input : {
        height : 45,
        width : "100%",
        maxWidth : 299,
        minWidth : 180,
        padding : 11,
        borderColor : Colors.defaultBlue,
        borderStyle : "solid",
        borderWidth : 1,
        borderRadius : 10,
        fontSize : 16,
        marginTop : 20,
        color : Colors.black31,
        fontFamily : "Roboto-Medium"
    },
    btnsCont : {
        width : "100%",
        marginTop : 25,
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    copyBtn : {
        padding : 14,
        backgroundColor : Colors.defaultBlue,
        width : 124,
        borderRadius : 40
    },
    copyBtnText : {
        color : Colors.white,
        fontSize : 16,
        fontFamily : "Comfortaa-Regular"
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : 12,
        fontFamily : "Roboto-Regular"
    },
})

export default ReceiveViaOnline;