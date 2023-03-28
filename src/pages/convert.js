import { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    Alert
} from "react-native";
import Toast from "react-native-toast-message";
import { ScaledSheet as StyleSheet, verticalScale } from 'react-native-size-matters';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import { Btn } from "../components/button";
import {checkIfDataListIsEmpty, convertFormatedNumToRealNum} from "../functions/form-validator";

const ConversionMode = (props) => {
    const [fiatBalance, setFiatBalance] = useState(0);
    const [offlineBalance, setOfflineBalance] = useState(0);
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setFiatBalance(parsedSession.user_online_data.fiat_balance);
                setOfflineBalance(parsedSession.offline_token_balance);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Convert Assets"} >
            <View style={style.formView}>
                <View>
                    <Btn text="Convert to fiat" textStyle={[style.conversionSelectionBtnText]}
                    style={[style.contentsInBodyCont, style.conversionSelectionBtn, DefaultStyle.centeredXY]}
                    onPress={() => {
                        if(offlineBalance == 0) {
                            Toast.show({
                                type : "info",
                                text1 : "Insufficient funds",
                                text2 : "Receive offline tokens or Convert fiat to offline tokens"
                            })
                        }
                        else {
                            props.navigation.navigate("ConversionForm", {conversion : {
                                type : "to fiat"
                            }})
                        }
                    }} 
                    />
                    <Btn text="Convert to offline tokens" textStyle={[style.conversionSelectionBtnText]}
                    style={[style.contentsInBodyCont, style.conversionSelectionBtn, DefaultStyle.centeredXY]} 
                    onPress={() => {
                        if(fiatBalance == 0) {
                            Toast.show({
                                type : "info",
                                text1 : "Insufficient funds",
                                text2 : "Make a deposit or Convert offline tokens to fiat"
                            })
                        }
                        else {
                            props.navigation.navigate("ConversionForm", {conversion : {
                                type : "to offline tokens"
                            }})
                        }
                    }}
                    />
                </View>
                <View style={[{marginTop : verticalScale(70)}, DefaultStyle.centeredX]}>
                    <Text style={style.instructionTextInPage}>
                        Choose conversion mode
                    </Text>
                    <Text style={style.instructionTextInPage}>
                        Please ensure you have a stable (good) internet connection throughout the conversion process to prevent loss of funds.
                    </Text>
                </View>
            </View>
        </InAppHB>
    )
}




export const ConversionForm = (props) => {
    const [fiatBalance, setFiatBalance] = useState(0);
    const [offlineBalance, setOfflineBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    const {type} = props.route.params.conversion;

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
                setFiatBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.user_online_data.fiat_balance
                    )
                )
            }
        })();
    },[])

    const validateForm = () => {
        if(checkIfDataListIsEmpty([amount]) && amount != 0 &&
            ((type == "to fiat" && 
            convertFormatedNumToRealNum(amount) <= convertFormatedNumToRealNum(offlineBalance))
            ||
            (type != "to fiat" &&
            convertFormatedNumToRealNum(amount) <= convertFormatedNumToRealNum(fiatBalance))
            )) {
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
            amount : Number(amount),
            type : type,
        })
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Conversion"} >
            <View style={style.formView}>
                <View>
                    <Text style={[style.introText]}>
                        {type == "to fiat" ? "Offline balance" : "Fiat balance"}
                    </Text>
                    <Text style={[style.introText]}>
                        {type == "to fiat" ? offlineBalance : fiatBalance}
                    </Text>
                </View>
                <View style={{marginTop : verticalScale(48)}}>
                    <Text style={[{textAlign : "center",
                        fontWeight : 400,
                        color : Colors.black31,
                        fontFamily : "Roboto-Medium",}]}>
                        converting {type}
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Amount" onChangeText={value => {
                            setAmount(value.trim().replace(/[^0-9.]/g,""));
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
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular",
        marginBottom : "10@vs"
    },
    conversionSelectionBtn : {
        height : "40@vs",
        backgroundColor : Colors.defaultBlue,
        marginTop : "40@vs",
        borderRadius : "5@ms",
    },
    conversionSelectionBtnText : {
        color : Colors.white,
        fontFamily : "Comfortaa-Medium",
        fontSize : "16@ms"
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
        fontSize : "16@ms",
        fontFamily : "Comfortaa-Regular"
    },
    ViewLastReceiptBtn : {
        height : "40@vs",
        backgroundColor : Colors.defaultBlue,
        marginTop : "14@vs",
        borderRadius : "8@ms",
    },
})

export default ConversionMode;