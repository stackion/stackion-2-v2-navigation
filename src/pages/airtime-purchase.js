import {
    View,
    Image
} from "react-native";
import { ScaledSheet as StyleSheet } from 'react-native-size-matters';

import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";

const AirtimePurchasePage = (props) => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={"Purchase Airtime"} >
            <View style={[DefaultStyle.centeredX, style.contentsInBodyCont]} >
                <Image style={[style.illustration]}
                source={require("../../assets/images/illustration-of-payment.png")} />
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
    }
})

export default AirtimePurchasePage;