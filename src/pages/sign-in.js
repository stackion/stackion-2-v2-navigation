import {useEffect, useState} from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput
} from "react-native";
import Toast from "react-native-toast-message";
import Spinner from 'react-native-loading-spinner-overlay';
import { Wave } from 'react-native-animated-spinkit';
import axios from "axios";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn, Anchor} from "../components/button";
import {checkIfDataListIsEmpty} from "../functions/form-validator";
import {backendUrls} from "../functions/config";


const SignIn = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputIsSecure, setIsInputSecurity] = useState(true);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    //TODO fix this code
    useEffect(() => {
        if(checkIfDataListIsEmpty([email, password]) && password.length >= 6 ) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    },[email, password])
    const validateForm = () => {
        if(checkIfDataListIsEmpty([email, password]) && password.length >= 6 ) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }
    const sendForm = () => {
        axios.post(`${backendUrls.authentication}/log-user`, {
            email : email,
            password : password
        })
        .then(async res => {
            setLoaderVisibility(false);
            let responseText = res.data;
            if(responseText.status === "wrong-email") {
                Toast.show({
                    type : "error",
                    text1 : "Account not found",
                    text2 : "An account with this email address not found"
                })
            }
            else if(responseText.status === "wrong-password") {
                Toast.show({
                    type : "error",
                    text1 : "Wrong password",
                    text2 : "The password you provided is incorrect"
                })
            }
            else{
                const userSession = await encryptedStorage.getItem("user_session");
                if(userSession) {
                    let parsedSession = JSON.parse(userSession);
                    parsedSession.logged_in = true;
                    parsedSession.user_access_token = responseText.user_access_token;
                    parsedSession.verified_email = responseText.verified_email;

                    await encryptedStorage.setItem(
                        "user_session",
                        JSON.stringify(parsedSession)
                    );

                    if(responseText.verified_email == 0) {
                        props.navigation.replace("VerifyEmail");
                    }
                    else if(responseText.verified_email !== 0 && parsedSession.transaction_pin === "0000") {
                        props.navigation.replace("SetupPin");
                    }
                    else {
                        props.navigation.replace("Dashboard");
                    }
                }
            }
        })
        .catch(err => {
            setLoaderVisibility(false)
            Toast.show({
                type : "error",
                text1 : "Connection error",
                text2 : "poor or no internet connection"
            })
        })
        setLoaderVisibility(true)
    }
    return (
        <View style={
            [
                DefaultStyle.WHSpanParent,                      
                DefaultStyle.centeredX, {backgroundColor : Colors.white}
            ]
        }>
            <View style={style.formView}>
                <Spinner
                customIndicator={<Wave size={moderateScale(48)} color={Colors.defaultBlue} />}
                visible={loaderIsVisibile}
                textContent={''}
                textStyle={{color : Colors.white}}
                />
                <ScrollView>
                    <View>
                        <Text style={[style.introText]}>
                            Welcome
                        </Text>
                        <Text style={[style.introText]}>
                            Back
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <View>
                            <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="Email" inputMode="email" onChangeText={value => {
                                setEmail(value.trim().toLowerCase());
                            }}
                            />
                        </View>
                        <View>
                            <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={inputIsSecure} placeholderTextColor="#606060" placeholder="Password" onChangeText={value => {
                            setPassword(value.trim());
                            }}
                            />
                            <Btn text={<FontAwesomeIcon icon={inputIsSecure ? "eye" : "eye-slash"} 
                            size={20} color={Colors.black31} />} style={{
                                position : "absolute",
                                top : verticalScale(35),
                                left : scale(260)
                            }} onPress={() => {
                                if(inputIsSecure) {
                                    setIsInputSecurity(false);
                                }
                                else {
                                    setIsInputSecurity(true);
                                }
                            }} />
                        </View>
                    </View>
                    <View>
                        <Anchor href="https://stackion.net/account%20recovery/" style={{marginTop : verticalScale(20)}} text="forgot password ?" textStyle={{color : Colors.blue2, fontFamily : "Roboto-Regular", fontSize : moderateScale(12)}}/>
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text="Sign up" textStyle={{color : Colors.black, fontSize : moderateScale(16), fontFamily : "Roboto-Regular"}} onPress={() => props.navigation.replace("SignUp")}/>
                        <Btn text="Sign in" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                sendForm();
                            }
                        }}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    formView : {
        maxHeight : "650@vs",
        width : "100%",
        maxWidth : "320@s",
        minWidth : "200@s",
        padding : "10@ms",
        paddingTop : "97@vs"
    },
    introText : {
        fontSize : "32@ms",
        color : Colors.black31,
        fontFamily : "Comfortaa-Regular"
    },
    inputCont : {
        marginTop : "37@vs"
    },
    input : {
        height : "45@ms",
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
        fontFamily : "Roboto-Regular"
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
    }
})

export default SignIn;