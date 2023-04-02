import {useState, useEffect} from "react";
import {
    Text,
    View,
    TextInput
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from "react-native-toast-message";
import {Picker} from "@react-native-picker/picker";
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
    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    useEffect(() => {
        (async () => {
            axios.get("https://960f-102-89-34-70.eu.ngrok.io/get-bank-list")
            .then(response => {
                if(response.data.status == true) {
                    setBankList(response.data.banklist)
                    setLoaderIsVisible(false)
                }
                else {
                    Toast.show({
                        type : "error",
                        text1 : "Processing error",
                        text2 : "An error occured while fetching bank list, please check back later"
                    })
                    props.navigation.navigate("Dashboard");
                }
            })
            .catch(error => {
                setLoaderIsVisible(false)
                Toast.show({
                    type : "error",
                    text1 : "Connection error",
                    text2 : "An error occured while fetching bank list, please check your internet conection"
                })
                props.navigation.navigate("Dashboard");
            })
        })();
    },[])

    useEffect(() => {
        (async () => { 
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                if(receiverBankCode !== "" && receiverAccountNumber.length === 10) {
                    setLoaderIsVisible(true);
                }
            }
        })()
    },[receiverBankCode,receiverAccountNumber]);

    useEffect(() => {
        if(receverName !== "" && receiverAccountNumber.length === 10 && receiverBankCode !== "") {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    },[receverName , receiverAccountNumber , receiverBankCode])

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
                    <Picker style={[style.input, DefaultStyle.centeredXY]} 
                    selectedValue={receiverBankCode}
                    onValueChange={(itemValue, itemIndex) => {
                        setReceiverBankCode(itemValue);
                    }}
                    >
                        <Picker.Item label="Select a bank" value="" enabled={false} />
                        {
                            bankList.length > 0 ? 
                            bankList.map((bank) => (
                                    <Picker.Item
                                    key={bank.bankCode}
                                    label={bank.bankName}
                                    value={bank.bankCode}
                                    />
                                )) : null
                        }
                        <Picker.Item
                            key={0}
                            label={"First bank"}
                            value={"bank.bankCode"}
                        />
                    </Picker>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Account number" value={receiverAccountNumber}
                    maxLength={10} onChangeText={value => {
                            setReceiverAccountNumber(value.replace(/[^0-9.]/g,"").trim());
                        }}
                     />
                </View>
                <View style={{marginTop : verticalScale(25)}} >
                    <Text style={[style.instructionTextInPage,{
                        color : Colors.green,
                        fontSize : moderateScale(20)
                    }]} >{receverName}</Text>
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