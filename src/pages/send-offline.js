import { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";
import {checkIfDataListIsEmpty} from "../functions/form-validator";
import encryptedStorage from "../functions/encrypted-storage";

const SendOffline = (props) => {
    const [offlineBalance, setOfflineBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    const {receiverUsername, receiverDeviceId} = props.route.params.qrdata;

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setOfflineBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.offline_token_balance
                    )
                );
            }
        })();
    },[])

    const validateForm = () => {
        if(checkIfDataListIsEmpty([amount]) && amount <= offlineBalance && offlineBalance != 0) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }

    const navigateToConfirmationPage = () => {
        props.navigation.navigate("ConfirmTransaction", {
            username : receiverUsername,
            amount : Number(amount),
            type : "offline tokens",
            receiverDeviceId : receiverDeviceId
        })
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Send offline"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} >
            <View style={style.formView}>
                <View>
                    <Text style={[style.introText]}>
                        Offline token balance
                    </Text>
                    <Text style={[style.introText]}>
                        {offlineBalance}
                    </Text>
                    <View style={{marginTop : 48}}>
                        <Text style={[{textAlign : "center",
                            fontWeight : 400,
                            color : Colors.black31,
                            fontFamily : "Roboto-Medium",}]}>
                            Sending to {receiverUsername} - offline
                        </Text>
                    </View>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Amount" onChangeText={value => {
                            setAmount(value.trim());
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
                        }} />
                </View>
                <Btn style={[style.contentsInBodyCont, DefaultStyle.centeredXY, style.ViewLastReceiptBtn]}
                text="Scan to receive" textStyle={style.scanToReceiveBtnText}
                 />{/*TODO add a function that reads the offline transactions and displays the last one. */}
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
        marginBottom : 4
    },
    inputCont : {
        marginTop : 17
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
    ViewLastReceiptBtn : {
        height : 40,
        backgroundColor : Colors.defaultBlue,
        marginTop : "14%",
        borderRadius : 8,
    },
})

export default SendOffline;