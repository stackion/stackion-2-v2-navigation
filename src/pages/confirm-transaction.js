import {useState, useEffect} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";
import {AfterTransactionPopUp} from "../components/modals";

const ConfirmTransaction = (props) => {
    const [loaderIsVisibile, setLoaderVisibility] = useState(false);
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);
    const [pin, setPin] = useState("");

    const {username, amount, type} = props.route.params;

    const [storedPin, setStoredPin] = useState("");

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setStoredPin(parsedSession.transaction_pin);
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

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Confirm Transaction"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.formView}>
                <Spinner
                visible={loaderIsVisibile}
                textContent={'processing...'}
                textStyle={{color : Colors.white}}
                />
                <View>
                    <Text style={[style.introText]}>
                        N {amount}
                    </Text>
                    <Text style={[style.introText]}>
                        to {username} - {type}
                    </Text>
                    <Text style={[style.introText]}>
                        Transaction fee : N {type === "fiat" ? (2/100) * amount : 0}
                    </Text>
                </View>
                <View style={style.inputCont}>
                    <TextInput style={[style.input, DefaultStyle.centeredXY]} inputMode="numeric" placeholder="Transaction pin" maxLength={4} secureTextEntry={true}  onChangeText={value => {
                            setPin(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() }  />
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text="Send" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                //sendForm();
                            }
                        }}/>
                </View>
                    <View style={{marginTop : 35}}>
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
        minWidth : 289,
        maxWidth : 340,
    },
    formView : {
        maxHeight : 650,
        width : "100%",
        maxWidth : 320,
        minWidth : 200,
        padding : 10,
    },
    introText : {
        fontSize : 16,
        fontWeight : 400,
        color : Colors.black31,
        fontFamily : "Roboto-Medium"
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
        fontFamily : "Roboto-Medium"
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
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : 12,
        fontFamily : "Roboto-Regular"
    },
})

export default ConfirmTransaction;