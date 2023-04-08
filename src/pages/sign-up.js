import {useState, useEffect} from "react";
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

const termsURL = "https://stackion.net/terms-and-policies";

const SignUp = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [inputIsSecure, setIsInputSecurity] = useState(true);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    useEffect(() => {
        if(checkIfDataListIsEmpty([firstName, middleName, lastName, phoneNumber, email, password]) && (retypedPassword === password) && password.length >= 6 && phoneNumber.length == 11) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }, [firstName, middleName, lastName, phoneNumber, email, password, retypedPassword]);

    const sendForm = () => {
        axios.post(`${backendUrls.authentication}/append-user`, {
            first_name : firstName,
            middle_name : middleName,
            last_name : lastName,
            phone_number : phoneNumber,
            email : email,
            password : password
        })
        .then(async res => {
            setLoaderVisibility(false);
            let responseText = res.data;
            if(responseText.status === "account-exists") {
                Toast.show({
                    type : "error",
                    text1 : "Account exists",
                    text2 : "An account alredy exists for this info, try signing in."
                })
            }
            else{
                const userSession = await encryptedStorage.getItem("user_session");
                if(userSession) {
                    let parsedSession = JSON.parse(userSession);
                    parsedSession.logged_in = true;
                    parsedSession.user_access_token = responseText.user_access_token;
                    parsedSession.verified_email = 0;
                    await encryptedStorage.setItem(
                        "user_session",
                        JSON.stringify(parsedSession)
                    );
                    props.navigation.replace("VerifyEmail");
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
                            Create
                        </Text>
                        <Text style={[style.introText]}>
                            Account
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="First name" inputMode="text" onChangeText={value => {
                            setFirstName(value.trim());
                        }} />
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="Middle name" inputMode="text" onChangeText={value => {
                            setMiddleName(value.trim());
                        }} />
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="Last name" inputMode="text" onChangeText={value => {
                            setLastName(value.trim());
                        }} />
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="Email" inputMode="email" onChangeText={value => {
                            setEmail(value.trim().toLowerCase());
                        }} />
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholderTextColor="#606060" placeholder="Tel e.g 08012345678" inputMode="numeric" maxLength={11} onChangeText={value => {
                            setPhoneNumber(value.trim());
                        }} />
                        <View>
                            <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={inputIsSecure} placeholderTextColor="#606060" placeholder="Password" onChangeText={value => {
                                setPassword(value.trim());
                            }} />
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
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={inputIsSecure} placeholderTextColor="#606060" placeholder="Retype Password" onChangeText={value => {
                            setRetypedPassword(value.trim());
                        }} />
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text="Sign in" textStyle={{color : Colors.black, fontSize : moderateScale(16), fontFamily : "Roboto-Regular"}} onPress={() => props.navigation.replace("SignIn")}/>
                        <Btn text="Sign up" style={[style.submitBtn, {opacity : submitBtnOpacity }]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                sendForm();
                            }
                        }}/>
                    </View>
                    <View style={{marginTop : verticalScale(35)}}>
                        <Text style={{fontSize : moderateScale(12),
                            color : Colors.black46,
                            fontFamily : "Roboto-Regular"}}>
                            By clicking sign up, we assume that you have read our <Anchor style={[DefaultStyle.centeredXY]} href={termsURL} textStyle={{fontSize : moderateScale(12),color : Colors.blue2,
                            fontFamily : "Roboto-Regular"}} text="Terms & Policies"/> and that you agree with them.
                        </Text>
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
        paddingTop : "37@vs"
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
        width : "124@s",
        borderRadius : "40@ms",
        backgroundColor : Colors.defaultBlue
    },
    submitBtnText : {
        color : Colors.white,
        fontSize : "16@ms",
        fontFamily : "Comfortaa-Regular"
    }
})

export default SignUp;