import {
    View,
    Image
} from "react-native";
import { ScaledSheet as StyleSheet } from 'react-native-size-matters';
import Toast from "react-native-toast-message";

import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import {Btn} from "../components/button";

const Pay = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Make Payments"} >
            <View style={[DefaultStyle.centeredX, style.contentsInBodyCont]} >
                <Image style={[style.illustration]}
                source={require("../../assets/images/illustration-of-payment.png")} />
                
                <Btn style={[DefaultStyle.centeredXY, style.actionBtns
                , {backgroundColor : Colors.defaultBlue,}]}
                text="Withdrawl Via Bank Transfer"
                textStyle={[style.actionBtnsText, {color : Colors.white}]}
                onPress={() => props.navigation.navigate("WithdrawalPage")} />

                <Btn style={[DefaultStyle.centeredXY, style.actionBtns
                , {backgroundColor : Colors.white,
                }]}
                text="Purchase Airtime"
                textStyle={[style.actionBtnsText, {color : Colors.defaultBlue}]}
                onPress={() => Toast.show({
                    type : "info",
                    text1 : "Coming soon !!!",
                    text2 : "Airtime purchase feature is comming soon. Anticipate 🙌✌"
                })} />
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
    illustration : {
        height : "230@ms",
        width : "230@ms"
    },
    actionBtns : {
        height : "45@vs",
        width : "320@s",
        borderRadius : "5@ms",
        marginTop : "30@vs",
        borderWidth : "1@ms",
        borderStyle : "solid",
        borderColor : Colors.defaultBlue
    },
    actionBtnsText : {
        fontSize : "14@ms",
        fontFamily : "Roboto-Medium"
    }
})

export default Pay;