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
import {backendUrls} from "../functions/config";


const SignIn = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    //TODO fix this code
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
                visible={loaderIsVisibile}
                textContent={'processing...'}
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
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Email" inputMode="email" onChangeText={value => {
                            setEmail(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={true} placeholder="Password" onChangeText={value => {
                            setPassword(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                    </View>
                    <View>
                        <Btn onPress={() => Alert.alert("Change password ?")} style={{marginTop : 20}} text="forgot password ?" textStyle={{color : Colors.blue2, fontFamily : "Roboto-Regular", fontSize : 12}}/>
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text="Sign up" textStyle={{color : Colors.black, fontSize : 16, fontFamily : "Roboto-Regular"}} onPress={() => props.navigation.replace("SignUp")}/>
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

export default SignIn;