import {useState, useEffect} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {checkIfDataListIsEmpty, convertFormatedNumToRealNum} from "../functions/form-validator";
import {InAppHB} from "../components/in-app-h-b-f";

const SendViaInternet = (props) => {
    const [fiatBalance, setFiatBalance] = useState("...");
    const [username, setUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [senderUsername, setSenderUsername] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    const validateForm = () => {
        if(checkIfDataListIsEmpty([username, amount]) && amount != 0  
        && convertFormatedNumToRealNum(amount) < convertFormatedNumToRealNum(fiatBalance)) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setFiatBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.user_online_data.fiat_balance
                    )
                );
                setSenderUsername(parsedSession.user_online_data.username)
            }
        })();
    },[])

    const navigateToConfirmationPage = () => {
        if(username == senderUsername) {
            Toast.show({
                type : "info",
                text1 : "Opps",
                text2 : "You cannot send to yourself"
            })
        }
        else {
            props.navigation.navigate("ConfirmTransaction", {
                username : username,
                amount : Number(amount),
                type : "fiat"
            })
        }
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Send Via Internet"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} >
            <View style={style.formView}>
                <View>
                    <Text style={[style.introText]}>
                        Fiat balance
                    </Text>
                    <Text style={[style.introText]}>
                        {fiatBalance}
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Receiver's username" inputMode="text" onChangeText={value => {
                            setUsername(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Amount" onChangeText={value => {
                            setAmount(value.replace(/[^0-9.]/g,"").trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Next" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                navigateToConfirmationPage();
                            }
                        }}/>
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