import {useState} from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";

const SetupPin = (props) => {
    const [pin, setPin] = useState("");
    const [formSubmitable, setFormSubmitableState] = useState(false);
    const [submitBtnOpacity, setSubmitBtnOpacity] = useState(0.5);

    const validateForm = () => {
        if(pin.length === 4 ) {
            setFormSubmitableState(true);
            setSubmitBtnOpacity(1);
        }
        else {
            setFormSubmitableState(false);
            setSubmitBtnOpacity(0.5);
        }
    }

    const savePin = async () => {
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            parsedSession.transaction_pin = pin;
            await encryptedStorage.setItem("user_session", JSON.stringify(parsedSession));
            props.navigation.replace("Dashboard");
        }
    }

    return (
        <View style={
            [
                DefaultStyle.WHSpanParent,                      
                DefaultStyle.centeredX, {backgroundColor : Colors.white}
            ]
        }>
            <View style={style.formView}>
                <ScrollView>
                    <View>
                        <Text style={[style.introText]}>
                            Setup
                        </Text>
                        <Text style={[style.introText]}>
                            Pin
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={true} placeholderTextColor="#606060" placeholder="4 digit pin" autoComplete="off" keyboardType="numeric" maxLength={4} onChangeText={value => {
                            setPin(value.trim());
                            validateForm();
                        }}
                        onEndEditing={() => validateForm() } />
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text=""/>
                        <Btn text="Setup" style={[style.submitBtn, {opacity : submitBtnOpacity}]} textStyle={style.submitBtnText} onPress={() => {
                            if(formSubmitable) {
                                savePin();
                            }
                        }}/>
                    </View>
                    <View style={{marginTop : verticalScale(35)}}>
                        <Text style={{
                            color : Colors.black46,
                            fontSize : moderateScale(12),
                            fontFamily : "Roboto-Regular"}}>
                        This pin would be requested from you each time you want to mae a transaction.
                        </Text>
                        <Text style={{
                            color : Colors.black46,
                            fontSize : moderateScale(12),
                            fontFamily : "Roboto-Regular"}}>
                            Do not share this with anyone.
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
        paddingTop : "97@vs",
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
        height : "45@vs",
        width : "100%",
        maxWidth : "299@s",
        minWidth : "180@s",
        padding : "11@ms",
        borderColor : Colors.defaultBlue,
        borderStyle : "solid",
        borderWidth : 1,
        borderRadius : 10,
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

export default SetupPin;