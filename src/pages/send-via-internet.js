import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const SendViaInternet = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Send Via Internet"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.formView}>
                <View>
                    <Text style={[style.introText]}>
                        Fiat balance
                    </Text>
                    <Text style={[style.introText]}>
                        N 900,000
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Username" inputMode="text"/>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Amount"/>
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Next" style={style.submitBtn} textStyle={style.submitBtnText} onPress={() => Alert.alert("Next ?")}/>
                </View>
                <View style={{marginTop : 35}}>
                    <Text style={style.instructionTextInPage}>
                        Make sure the username you input is correct and it matches with that of the user you want to send funds to.
                    </Text>
                    <Text style={style.instructionTextInPage} >
                        We are not responsible for sending funds to the wrong user.
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
    introText : {
        fontSize : 16,
        fontWeight : 400,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        marginBottom : 4,
        textAlign : "center"
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
    submitBtn : {
        padding : 14,
        backgroundColor : Colors.defaultBlue,
        width : 124,
        borderRadius : 40
    },
    submitBtnText : {
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

export default SendViaInternet;