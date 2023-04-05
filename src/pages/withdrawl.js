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
import {InAppHB} from "../components/in-app-h-b-f";
import {backendUrls} from "../functions/config";

export const WithdrawalPage = (props) => {
    const [senderAccountNumber, setSenderAccountNumber] = useState("")
    const [receiverName, setReceiverName] = useState("");
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [receiverBankCode, setReceiverBankCode] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [bankList, setBankList] = useState([]);
    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setSenderAccountNumber(parsedSession.user_online_data.account_number)
            }
            axios.get(backendUrls.k_c + "/get-bank-list")
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
                    axios.post(backendUrls.k_c + "/request-beneficiary-name",
                    {
                        beneficiaryAccountNumber : receiverAccountNumber,
                        beneficiaryBankCode : receiverBankCode,
                        user_access_token : parsedSession.user_access_token
                    })
                    .then(response => {
                        setLoaderIsVisible(false);
                        if(response.data.status == true) {
                            setSessionId(response.data.data.sessionID);
                            setReceiverName(response.data.data.beneficiaryName);
                        }
                        else {
                            setReceiverName("")
                            Toast.show({
                                type : "error",
                                text1 : "Wrong info",
                                text2 : "Please ensure the information you input matches that of the beneficiary"
                            })
                        }
                    })
                    .catch(error => {
                        setLoaderIsVisible(false);
                        Toast.show({
                            type : "error",
                            text1 : "Connection error",
                            text2 : "An error occured while fetching beneficiary info, please check your internet conection"
                        });
                    })
                }
            }
        })()
    },[receiverBankCode, receiverAccountNumber]);

    useEffect(() => {
        if(receiverName !== "" && receiverAccountNumber.length === 10 && receiverBankCode !== "") {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    },[receiverName , receiverAccountNumber , receiverBankCode])

    const navigateToContinualPage = () => {
        if(senderAccountNumber == receiverAccountNumber) {
            Toast.show({
                type : "info",
                text1 : "Opps",
                text2 : "You cannot send to yourself"
            })
        }
        else {
            props.navigation.navigate("WithdrawalContinualPage", {
                sessionId : sessionId,
                receiverBankCode : receiverBankCode,
                receiverAccountNumber : receiverAccountNumber,
                receiverName : receiverName
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
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholderTextColor="#303030" placeholder="Account number" value={receiverAccountNumber}
                    maxLength={10} onChangeText={value => {
                            setReceiverAccountNumber(value.replace(/[^0-9.]/g,"").trim());
                        }}
                     />
                </View>
                <View style={{marginTop : verticalScale(25)}} >
                    <Text style={[style.instructionTextInPage,{
                        color : Colors.green,
                        fontSize : moderateScale(14)
                    }]} >{receiverName}</Text>
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Next" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                navigateToContinualPage();
                            }
                        }}/>
                </View>
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Ensure the name of the beneficiary is correct.
                    </Text>
                    <Text style={style.instructionTextInPage} >
                        We are not responsible for sending funds to the wrong person.
                    </Text>
                </View>
            </View>
        </InAppHB>
    )
}

export const WithdrawalContinualPage = (props) => {
    const [fiatBalance, setFiatBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [narration, setNarration] = useState("");

    const {sessionId, receiverBankCode, receiverAccountNumber, receiverName } = props.route.params;

    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setFiatBalance(parsedSession.user_online_data.fiat_balance);
                setLoaderIsVisible(false);
            }
        })();
    },[])


    useEffect(() => {
        if(amount !== "" && narration !== "" && Number(amount) <= fiatBalance && fiatBalance > 0) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    },[amount, narration])

    const navigateToConfirmationPage = () => {
        props.navigation.navigate("ConfirmTransaction", {
            sessionId : sessionId,
            receiverBankCode : receiverBankCode,
            receiverAccountNumber : receiverAccountNumber,
            receiverName : receiverName,
            amount : Number(amount),
            narration : narration,
            type : "withdrawal"
        })
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
                <View>
                    <Text style={[style.introText]}>
                        Withdrawable balance
                    </Text>
                    <Text style={[style.introText]}>
                        {
                            new Intl.NumberFormat('en-UK', {
                                style: 'currency',
                                currency: 'NGN'
                            }).format(
                                fiatBalance
                            )
                        }
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholderTextColor="#303030" placeholder="Amount" value={amount}
                    maxLength={10} onChangeText={value => {
                            setAmount(value.replace(/[^0-9.]/g,"").trim());
                        }}
                     />
                     <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#303030" placeholder="Narration" value={narration}
                     maxLength={44} onChangeText={value => {
                             setNarration(value.trim());
                         }}
                      />
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
                        You are sending funds to <Text style={[style.instructionTextInPage,{
                        color : Colors.green,
                        fontSize : moderateScale(14)
                    }]} >{receiverName}</Text>
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