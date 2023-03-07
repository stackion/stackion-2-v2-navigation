import {useState} from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert
} from "react-native";
import Toast from "react-native-toast-message";
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn, Anchor} from "../components/button";
import {checkIfDataListIsEmpty} from "../functions/form-validator";

const VerifyEmail = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [code, setCode] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);
    const [resendCodeBtnTextContent, setResendCodeBtnTextContent] = useState("Resend code");

    const validateForm = () => {
        if(checkIfDataListIsEmpty([code]) && code.length >= 5 ) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }
    const sendForm = async () => {
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            axios.post("https://a174-102-89-33-127.eu.ngrok.io/verify-email", {
                user_access_token : parsedSession.user_access_token,
                verification_code : code
            })
            .then(async res => {
                setLoaderVisibility(false);
                let responseText = res.data;
                if(responseText.status !== "success") {
                    Toast.show({
                        type : "error",
                        text1 : "wrong code",
                        text2 : "Incorrect verification code. Try again."
                    })
                }
                else{
                    await encryptedStorage.setItem(
                        "user_session",
                        JSON.stringify({
                            logged_in : true,
                            user_access_token : parsedSession.user_access_token,
                            verified_email : responseText.verified_email
                        })
                    );
                    props.navigation.replace("SetupPin");
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
        }
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
                visible={loaderIsVisibile}
                textContent={'processing...'}
                textStyle={{color : Colors.white}}
                />
                <ScrollView>
                    <View>
                        <Text style={[style.introText]}>
                            Verify
                        </Text>
                        <Text style={[style.introText]}>
                            Email
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Verification code" inputMode="numeric" keyboardType="numeric" maxLength={5} onChangeText={value => {
                            setCode(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text={resendCodeBtnTextContent} textStyle={{color : Colors.black, fontSize : 16, fontFamily : "Roboto-Regular"}} onPress={async () => {
                            setResendCodeBtnTextContent("Resending...");
                            const userSession = await encryptedStorage.getItem("user_session");
                            if(userSession) {
                                let parsedSession = JSON.parse(userSession);
                                axios.post("https://a174-102-89-33-127.eu.ngrok.io/resend-verification-code", {
                                    user_access_token : parsedSession.user_access_token
                                })
                                .then(res => {
                                    Toast.show({
                                        type : "success",
                                        text1 : "Code resent",
                                        text2 : "Check your Email inbox for the verification code"
                                    })
                                    setResendCodeBtnTextContent("Resend code");
                                })
                                .catch(err => {
                                    Toast.show({
                                        type : "error",
                                        text1 : "Connection error",
                                        text2 : "poor or no internet connection"
                                    })
                                })
                            }
                        }}/>
                        <Btn text="Verify" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                sendForm();
                            }
                        }}/>
                    </View>
                    <View style={{marginTop : 35}}>
                        <Text style={{fontSize : 12,
                            color : Colors.black46,
                            fontSize : 12,
                            fontFamily : "Roboto-Regular"}}>
                            A verification code was sent to your email address
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    formView : {
        maxHeight : 650,
        width : "100%",
        maxWidth : 320,
        minWidth : 200,
        padding : 10,
        paddingTop : 97
    },
    introText : {
        fontSize : 32,
        color : Colors.black31,
        fontFamily : "Comfortaa-Regular"
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
        fontFamily : "Roboto-Regular"
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
    }
})

export default VerifyEmail;