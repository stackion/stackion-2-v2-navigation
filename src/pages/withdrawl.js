import {useState, useEffect} from "react";
import {
    Text,
    View,
    TextInput
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from "react-native-toast-message";
import Picker from "@react-native-picker/picker";
import Spinner from 'react-native-loading-spinner-overlay';
import { Wave } from 'react-native-animated-spinkit';
import axios from "axios";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {checkIfDataListIsEmpty, convertFormatedNumToRealNum} from "../functions/form-validator";
import {InAppHB} from "../components/in-app-h-b-f";

export const WithdrawalPage = (props) => {
    const [receverName, setReceiverName] = useState("");
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [receiverBankCode, setReceiverBankCode] = useState("");
    const [receiverBankName, setReceiverBankName] = useState("");
    const [bankList, setBankList] = useState([]);
    const [loaderIsVisible, setLoaderIsVisible] = useState(false);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
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
        <InAppHB navigation={props.navigation} headerTitleText={"Withdrawl Via Bank Transfer"} >
            <View style={style.formView}>
                <Spinner
                customIndicator={<Wave size={moderateScale(48)} color={Colors.defaultBlue} />}
                visible={loaderIsVisible}
                textContent={''}
                textStyle={{color : Colors.white}}
                />
                <View style={style.inputCont}>
                    <Picker
                    >
                        <Picker.Item label="Select a bank" value="" />
                        <Picker.Item
                            key={0}
                            label={"First bank"}
                            value={"bank.bankCode"}
                        />
                    </Picker>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Receiver's username" inputMode="text" onChangeText={value => {
                            setUsername(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Account number" onChangeText={value => {
                            setReceiverAccountNumber(value.replace(/[^0-9.]/g,"").trim());
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
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Make sure the name of the receiver is correct and it matches with that of the person you want to send funds to.
                    </Text>
                    <Text style={style.instructionTextInPage} >
                        We are not responsible for sending funds to the wrong person.
                    </Text>
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
    introText : {
        fontSize : "16@ms",
        fontWeight : 400,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        marginBottom : "4@vs",
        textAlign : "center"
    },
    inputCont : {
        marginTop : "37@vs"
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
        width : "124@ms",
        borderRadius : "40@ms"
    },
    submitBtnText : {
        color : Colors.white,
        fontSize : "16@ms",
        fontFamily : "Comfortaa-Regular"
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
})