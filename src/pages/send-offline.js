import { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    Alert
} from "react-native";
import { ScaledSheet as StyleSheet, verticalScale } from 'react-native-size-matters';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";
import {checkIfDataListIsEmpty, convertFormatedNumToRealNum} from "../functions/form-validator";

const SendOffline = (props) => {
    const [offlineBalance, setOfflineBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);
    const [senderUsername, setSenderUsername] = useState("")

    const {receiverUsername, receiverDeviceId} = props.route.params.qrdata;

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setSenderUsername(parsedSession.user_online_data.username);
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
        if(checkIfDataListIsEmpty([amount]) && amount != 0  
        && convertFormatedNumToRealNum(amount) <= convertFormatedNumToRealNum(offlineBalance) ) {
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
            senderUsername : senderUsername,
            receiverDeviceId : receiverDeviceId
        })
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Send offline"} >
            <View style={style.formView}>
                <View>
                    <Text style={[style.introText]}>
                        Offline token balance
                    </Text>
                    <Text style={[style.introText]}>
                        {offlineBalance}
                    </Text>
                    <View style={{marginTop : verticalScale(48)}}>
                        <Text style={[{textAlign : "center",
                            fontWeight : 400,
                            color : Colors.black31,
                            fontFamily : "Roboto-Medium",}]}>
                            Sending to {receiverUsername} - offline
                        </Text>
                    </View>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholderTextColor="#303030" placeholder="Amount" onChangeText={value => {
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
                        }} />
                </View>
                {/*TODO add a function that reads the offline transactions and displays the last one. */}
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
    introText : {
        fontSize : "16@ms",
        fontWeight : 400,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        marginBottom : "4@vs"
    },
    inputCont : {
        marginTop : "17@vs"
    },
    input : {
        height : "45@vs",
        width : "100%",
        maxWidth : "299@s",
        minWidth : "180@s",
        padding : "11@ms",
        borderColor : Colors.defaultBlue,
        borderStyle : "solid",
        borderWidth : 1,
        borderRadius : "10@ms",
        fontSize : "16@ms",
        marginTop : "20@vs",
        color : Colors.black31,
        fontFamily : "Roboto-Medium"
    },
    btnsCont : {
        width : "100%",
        marginTop : "25@vs",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    submitBtn : {
        padding : "14@ms",
        backgroundColor : Colors.defaultBlue,
        width : "124@s",
        borderRadius : "40@ms"
    },
    submitBtnText : {
        color : Colors.white,
        fontSize : 16,
        fontFamily : "Comfortaa-Regular"
    },
    ViewLastReceiptBtn : {
        height : "40@vs",
        backgroundColor : Colors.defaultBlue,
        marginTop : "14%",
        borderRadius : "8@ms",
    },
})

export default SendOffline;