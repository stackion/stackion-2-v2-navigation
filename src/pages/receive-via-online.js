import { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const ReceiveViaOnline = (props) => {
    const [name, setName] = useState("Dear User");
    const [username, setUsername] = useState("");
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setUsername(parsedSession.user_online_data.username);
                setName(parsedSession.user_online_data.name);
            }
        })();
    },[])
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Receive"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={style.View}>
                <Text style={{
                    fontSize : 32,
                    color : Colors.black31,
                    fontFamily : "Comfortaa-Regular",
                    textAlign : "center"
                }} >
                    Hey {name}!
                </Text>
                <View style={style.inputCont}>
                    <Text style={[style.input, DefaultStyle.centeredXY]}>
                        {username}
                    </Text>
                </View>
                <View style={[style.btnsCont]}>
                    <Btn text=""/>
                    <Btn text={(<Text>Copy   <FontAwesomeIcon icon="copy" color={Colors.white} size={20} /></Text>)} style={style.copyBtn} textStyle={style.copyBtnText} onPress={() => {
                        Clipboard.setString(`${username}`);
                        Toast.show({
                            type: 'success',
                            text1: 'Copied!',
                            text2: 'Have a great day champ ✌'
                        });
                    }}/>
                </View>
                <View style={{marginTop : 35}}>
                    <Text style={style.instructionTextInPage}>
                        Copy and send your Username to the person you want to receive funds from.
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
    View : {
        maxHeight : 650,
        width : "100%",
        maxWidth : 320,
        minWidth : 200,
        padding : 10,
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
        borderRadius : 2,
        fontSize : 16,
        marginTop : 20,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        backgroundColor : Colors.blackF2,
    },
    btnsCont : {
        width : "100%",
        marginTop : 25,
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    copyBtn : {
        padding : 14,
        backgroundColor : Colors.defaultBlue,
        width : 124,
        borderRadius : 40
    },
    copyBtnText : {
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

export default ReceiveViaOnline;