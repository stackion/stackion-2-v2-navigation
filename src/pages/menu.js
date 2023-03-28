import { useState, useEffect } from "react";
import {
    Text,
    View
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Toast from "react-native-toast-message";
import { Modal, ModalButton, ModalTitle, ModalFooter, ModalContent} from "react-native-modals";

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const Menu = (props) => {
    const [signoutPromptVisible, setSignoutPromptVisibility] = useState(false);
    const [offlineBalance, setOfflineBalance] = useState("")
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                setOfflineBalance(parsedSession.offline_token_balance)
            }
        })();
    },[])

    const handleSignout = async () => {
        if(offlineBalance == 0) {
            await encryptedStorage.removeItem("user_session");
            props.navigation.navigate("Splash");
        }
        else {
            Toast.show({
                type : "info",
                text1 : "Couldn't sign out",
                text2 : "You still have some unconverted offline assets. Please convert them to fiat."
            })
        }
    }

    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Menu"} >
            <Modal
                modalStyle={{padding : moderateScale(20)}}
                onHardwareBackPress={() => setSignoutPromptVisibility(false)}
                visible={signoutPromptVisible}
                ModalTitle={
                    <ModalTitle title="Sign out ?" />
                }
                footer={
                <ModalFooter>
                    <ModalButton
                    text="Cancel"
                    onPress={() => {
                        setSignoutPromptVisibility(false)
                    }}
                    />
                    <ModalButton
                    text="Yes, sign out"
                    textStyle={{color : Colors.red}}
                    onPress={() => {
                        setSignoutPromptVisibility(false)
                        handleSignout();
                    }}
                    />
                </ModalFooter>
                }
            >
                <ModalContent>
                    <Text style={{
                        fontSize : moderateScale(16),
                        fontFamily : "Roboto-Regular",
                        color : Colors.black46
                    }}>
                        All offline assets would be lost
                    </Text>
                </ModalContent>
            </Modal>
            <View style={style.View}>
                <Text style={{
                    fontSize : moderateScale(32),
                    color : Colors.black31,
                    fontFamily : "Comfortaa-Regular",
                    textAlign : "center"
                }} >
                    More features coming soon!
                </Text>
                <View style={[style.btnsCont, DefaultStyle.centeredXY]}>
                    <Btn text="Sign out" textStyle={style.signOutBtnText} onPress={() => {
                        setSignoutPromptVisibility(true);
                    }}/>
                </View>
                <View style={{marginTop : verticalScale(35)}}>
                    <Text style={style.instructionTextInPage}>
                        Do not sign out without converting all your offline balance to fiat to prevent lose.
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
    View : {
        maxHeight : "650@vs",
        width : "100%",
        maxWidth : "320@s",
        minWidth : "200@s",
        padding : "10@ms",
    },
    btnsCont : {
        width : "100%",
        marginTop : "75@vs",
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row"
    },
    signOutBtnText : {
        color : Colors.red,
        fontSize : "16@ms",
        fontFamily : "Roboto-Bold"
    },
    instructionTextInPage : {
        color : Colors.black46,
        fontSize : "12@ms",
        fontFamily : "Roboto-Regular"
    },
})

export default Menu;