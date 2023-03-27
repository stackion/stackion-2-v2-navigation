import {
    Image,
    View,
    Text,
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn, Anchor} from "../components/button";
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';

const termsURL = "https://stackion.net/terms-and-policies";

const AppInterfaceAfterInstallation = (props) => {
    return (
        <View style={
            [
                DefaultStyle.WHSpanParent,
                DefaultStyle.centeredXY, {backgroundColor : Colors.white}
            ]
        }>
            <Image style={[style.logo]} source={require("../../assets/images/favicon.png")}/>
            <Text style={[style.STACKION, {
                fontFamily : "Roboto-Bold", color : Colors.black31}]}>
                STACKION
            </Text>
            <Text style={[DefaultStyle.black46, {
                fontFamily : "Comfortaa-Bold", padding : moderateScale(13), textAlign : "center", color : Colors.black31}]}>
                Not your regular Fintech app
                {"\n"}
                This is the future
            </Text>
            <View style={[DefaultStyle.WSpanParent, DefaultStyle.centeredXY, style.buttonsCont]}>
                <Btn text="Get started" onPress={() => {props.navigation.navigate("SignUp")}} style={
                    [
                        style.buttons,
                        DefaultStyle.centeredXY,
                        {
                            backgroundColor : Colors.defaultBlue,
                        }, DefaultStyle.ComfortaaBold
                    ]
                } textStyle={[style.buttonText, {color : Colors.white , fontSize : moderateScale(16),}]}/>
                <Btn text="Sign in" onPress={() =>{props.navigation.navigate("SignIn")}} style={
                    [
                        style.buttons,
                        DefaultStyle.centeredXY,
                        {
                            borderWidth : moderateScale(2),
                            borderStyle : "solid",
                            borderColor : Colors.defaultBlue,
                            marginTop : verticalScale(33),
                            backgroundColor : Colors.white
                        }, DefaultStyle.ComfortaaBold
                    ]
                } textStyle={[style.buttonText, {color : Colors.defaultBlue , fontSize : moderateScale(16),}]}/>
            </View>
            <Anchor href={termsURL} textStyle={[style.termsLinkText, DefaultStyle.ComfortaaRegular]} text="Terms & Policies" style={style.termsLinkCont}/>
        </View>
    )
}

const style = StyleSheet.create({
    logo : {
        height : "60@ms",
        width : "60@ms",
        marginBottom : "15@vs"
    },
    STACKION : {
        fontWeight : 500,
        fontSize : "32@ms"
    },
    buttonsCont : {
        marginTop : "78@vs"
    },
    buttons : {
        height : "43@ms",
        width : "80%",
        maxWidth : "299@s",
        minWidth : "180@s",
        borderRadius : "10@ms",
        zIndex : 3
    },
    buttonText : {
        fontSize : "30@ms",
        fontFamily : "Comfortaa-Regular"
    },
    termsLinkCont : {
        position : "absolute",
        bottom : "13@vs"
    },
    termsLinkText : {
        color : Colors.blue2,
        fontSize : "12@ms"
    }
})

export default AppInterfaceAfterInstallation;