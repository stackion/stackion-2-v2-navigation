import {useState, useEffect, useCallback} from "react";
import {
    Text,
    View,
    TextInput,
    Alert,
    ScrollView,
    BackHandler
} from "react-native";
import { ScaledSheet as StyleSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Wave } from 'react-native-animated-spinkit';
import axios from "axios";
import Toast from "react-native-toast-message";
import QRCode from 'react-native-qrcode-svg';

import * as encryptedStorage from "../functions/encrypted-storage";
import {encrypt} from "../functions/crypto";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";
import {AfterTransactionPopUp} from "../components/modals";
import {backendUrls} from "../functions/config";

const ConfirmTransaction = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);
    const [pin, setPin] = useState("");
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            if (popUpVisibility) {
              return true;
            } else {
              return false;
            }
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const {username, amount, type, receiverDeviceId} = props.route.params;

    const [storedPin, setStoredPin] = useState("");
    const [senderUsername, setSenderUsername] = useState("");

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setStoredPin(parsedSession.transaction_pin);
                setSenderUsername(parsedSession.user_online_data.username)
            }
        })()
    },[])

    const validateForm = () => { 
        if(pin !== "" && pin === storedPin && storedPin !== "") {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }

    const random_number = (e)  => {
        let generated_value = [];
        for (let i = 1; i <= e; i++) {
            generated_value.push(Math.floor(Math.random() * 10));
        }
        return generated_value.join("");
    };

    const process_transfer_of_fiat_to_stackion_user = async () => {
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            let user_access_token = parsedSession.user_access_token;
            setLoaderVisibility(true);

            axios.post(`${backendUrls.transactions}/transfer-fiat`,{
                user_access_token : user_access_token,
                receiver_username : username,
                amount : amount,
            })
            .then((transaction) => {
                setLoaderVisibility(false)
                const data = transaction.data;
                if(data.status == "success") {
                    setPopUpVisibility(true);
                    Toast.show({
                        type : "success",
                        text1 : "Transaction successful",
                        text2 : "Your transaction has been completed, have a great day🙌"
                    })
                }
                else if(data.status == "insufficient-balance") {
                    Toast.show({
                        type : "error",
                        text1 : "Insufficient balance",
                        text2 : "Could not complete transaction."
                    })
                }
                else {
                    Toast.show({
                        type : "error",
                        text1 : "Username Not found",
                        text2 : "Please check the username and try again."
                    })
                }
            })
            .catch((err) => {
                setLoaderVisibility(false)
                Toast.show({
                    type : "error",
                    text1 : "Connection error",
                    text2 : "Please check your internet connection."
                })
            });
        }
    };

    const processTransferOfOfflineTokens = async () => {
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            let offlineBalance = parsedSession.offline_token_balance;
            if(amount <= offlineBalance) {
                offlineBalance -= amount;
                parsedSession.offline_token_balance = offlineBalance;
                await encryptedStorage.setItem("user_session", JSON.stringify(parsedSession));
                setPopUpVisibility(true);
            }
            else {
                Toast.show({
                    type : "error",
                    text1 : "Insufficient token balance",
                    text2 : "Could not complete transaction."
                })
            }
        }
    }

    const processConversion = async (path) => {
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            setLoaderVisibility(true);
            let parsedSession = JSON.parse(userSession);
            let accessToken = parsedSession.user_access_token;
            let offlineBalance = parsedSession.offline_token_balance;
            path == "/convert-to-fiat" ? offlineBalance -= amount : offlineBalance += amount;
            parsedSession.offline_token_balance = offlineBalance;
            try {
                const transaction = await axios.post(`${backendUrls.transactions}${path}`, {
                    amount : amount,
                    user_access_token : accessToken
                })
                if(transaction.data.status == "success") {
                    await encryptedStorage.setItem("user_session", JSON.stringify(parsedSession))
                    Toast.show({
                        type : "success",
                        text1 : "Conversion successful",
                        text2 : "Conversion of your asset was successful"
                    })
                    setLoaderVisibility(false);
                    props.navigation.navigate("Dashboard");
                }
                else if(transaction.data.status == "insufficient-balance") {
                    Toast.show({
                        type : "info",
                        text1 : "Insufficient balance",
                        text2 : "Your balance is not enough for this transaction."
                    });
                    setLoaderVisibility(false);
                }
                else {
                    Toast.show({
                        type : "error",
                        text1 : "An error occured",
                        text2 : "If you are having issues, please contact our support."
                    });
                    setLoaderVisibility(false);
                }
            }
            catch(err) {
                setLoaderVisibility(false);
                Toast.show({
                    type : "error",
                    text1 : "Connection error",
                    text2 : "Please check your internet connection and try again."
                })
            }
        }
    }

    const initiateTransaction = () => {
        if(type === "fiat") {
            process_transfer_of_fiat_to_stackion_user();
        }
        else if(type === "offline tokens") {
            processTransferOfOfflineTokens();
        }
        else if(type === "to offline tokens") {
            processConversion("/convert-to-offline-token");
        }
        else if(type === "to fiat") {
            processConversion("/convert-to-fiat");
        }
        else {
            Toast.show({
                type : "info",
                text1 : "comming soon",
                text2 : "Thanks for being a part of stackion."
            })
        }
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Confirm Transaction"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} >
            <View style={style.formView}>
                <AfterTransactionPopUp visibility={popUpVisibility} onBottomBtnClicked={() => {
                    setPopUpVisibility(false);
                    props.navigation.navigate("Dashboard")
                    }} >
                    <View style={style.popupTitleCont}>
                        <Text style={style.popupTitle}>
                            Transaction Successful
                        </Text>
                    </View>
                    <ScrollView>
                        <View style={style.contForOfflineTransactionDetails}>
                        {type === "offline tokens" ? 
                            <>
                            <View style={[DefaultStyle.centeredXY, style.contentsInBodyCont]}>
                            <QRCode value={encrypt(
                                JSON.stringify({
                                    senderUsername : senderUsername,
                                    receiverDeviceId : receiverDeviceId,
                                    amount : amount,
                                    username : username,
                                    receipt_id : random_number(6),
                                    date : new Date().toUTCString(),
                                    key : "stackion-offline-token"
                                })
                            )} size={verticalScale(200)} color={Colors.black}
                            logo={require("../../assets/images/favicon.png")}
                            backgroundColor={Colors.white}
                            logoBackgroundColor={Colors.white}
                            logoBorderRadius={100} />
                            </View>
                            <View style={[{marginTop : verticalScale(35)}, DefaultStyle.centeredX]}>
                                <Text style={style.instructionTextInPage}>
                                    Ask the receiver to scan the QR-code to receive.
                                </Text>
                                <Text style={style.instructionTextInPage}>
                                    Screenshot this QR-receipt if there are issues.
                                </Text>
                                <Text style={style.instructionTextInPage}>
                                    Do not exit if not scanned, instead take a screenshot.
                                </Text>
                            </View>
                            </>
                        : null /*display an icon illustration of success or checkbox*/}
                        </View>
                        <View style={[style.contentsInBodyCont, style.transactionDataCont]}>
                            <Text style={[style.introText]}>
                                {
                                    new Intl.NumberFormat('en-UK', {
                                        style: 'currency',
                                        currency: 'NGN'
                                    }).format(
                                        amount
                                    )
                                }
                            </Text>
                            <Text style={[style.introText]}>
                                to {username} - {type}
                            </Text>
                            <Text style={[style.introText]}>
                                Transaction fee : {
                                    type != "offline tokens" ? 
                                        new Intl.NumberFormat('en-UK', {
                                            style: 'currency',
                                            currency: 'NGN'
                                        }).format(
                                            (2/100) * amount
                                        )
                                        : "NGN 0.00"
                                    }
                            </Text>
                        </View>
                        <View style={{height : verticalScale(100)}}></View>
                    </ScrollView>
                </AfterTransactionPopUp>
                <Spinner
                customIndicator={<Wave size={moderateScale(48)} color={Colors.defaultBlue} />}
                visible={loaderIsVisibile}
                textContent={''}
                textStyle={{color : Colors.white}}
                />
                <View style={[style.contentsInBodyCont, style.transactionDataCont]}>
                    <Text style={[style.introText]}>
                        {
                            new Intl.NumberFormat('en-UK', {
                                style: 'currency',
                                currency: 'NGN'
                            }).format(
                                amount
                            )
                        }
                    </Text>
                    <Text style={[style.introText]}>
                        to {username} - {type}
                    </Text>
                    <Text style={[style.introText]}>
                        Transaction fee : {
                            type != "offline tokens" ? 
                                new Intl.NumberFormat('en-UK', {
                                    style: 'currency',
                                    currency: 'NGN'
                                }).format(
                                    (2/100) * amount
                                )
                                : "NGN 0.00"
                            }
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} keyboardType="numeric" 
                    placeholder="Transaction pin" maxLength={4} autoComplete="off" secureTextEntry={true} 
                    onChangeText={value => {
                            setPin(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() }  />
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Send" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                initiateTransaction();
                            }
                        }}/>
                </View>
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Once transaction is made, it can’t be reversed unless you are in contact with the user.
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
    contForOfflineTransactionDetails : {
        marginBottom : "10%"
    },
    popupTitleCont : {
        marginTop : "1%",
        marginBottom : "10%"
    },
    popupTitle : {
        fontSize : "13@ms",
        fontFamily : "Roboto-Regular",
        color : Colors.black46
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
    transactionDataCont : {
        padding : "12@ms",
        borderLeftWidth : "3@s",
        borderLeftColor : Colors.green,
        borderLeftStyle : "solid",
        borderRadius : "5@ms",
        backgroundColor : Colors.blackF2
    },
    introText : {
        fontSize : "16@ms",
        fontWeight : 400,
        color : Colors.black10trans,
        fontFamily : "Roboto-Medium"
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
        width : "124@s",
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

export default ConfirmTransaction;