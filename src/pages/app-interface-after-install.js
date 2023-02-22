import {
    Image,
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn, Anchor} from "../components/button";

const termsURL = "https://google.com";

const AppInterfaceAfterInstallation = () => {
    return (
        <View style={
            [
                DefaultStyle.WHSpanParent,
                DefaultStyle.centeredXY
            ]
        }>
            <Image style={[style.logo]} source={require("../../assets/images/favicon.png")}/>
            <Text style={[style.STACKION, DefaultStyle.black46, {
                fontFamily : "Comfortaa-Bold",}]}>
                STACKION
            </Text>
            <Text style={[DefaultStyle.black46, {
                fontFamily : "Comfortaa-Bold", padding : 13, textAlign : "center"}]}>
                Not your regular Fintech app,
                {"\n"}
                This is the future.
            </Text>
            <View style={[DefaultStyle.WSpanParent, DefaultStyle.centeredXY, style.buttonsCont]}>
                <Btn text="Get started" onPress={() => {Alert.alert("Sign up")}} style={
                    [
                        style.buttons,
                        DefaultStyle.centeredXY,
                        {
                            backgroundColor : Colors.defaultBlue,
                        }, DefaultStyle.ComfortaaBold
                    ]
                } textStyle={[style.buttonText, {color : Colors.white , fontSize : 16,}]}/>
                <Btn text="Sign in" onPress={() => {Alert.alert("Sign in")}} style={
                    [
                        style.buttons,
                        DefaultStyle.centeredXY,
                        {
                            borderWidth : 2,
                            borderStyle : "solid",
                            borderColor : Colors.defaultBlue,
                            marginTop : 33,
                            backgroundColor : Colors.white
                        }, DefaultStyle.ComfortaaBold
                    ]
                } textStyle={[style.buttonText, {color : Colors.defaultBlue , fontSize : 16,}]}/>
            </View>
            <Anchor href={termsURL} textStyle={[style.termsLinkText, DefaultStyle.ComfortaaRegular]} text="Terms & Policies" style={style.termsLinkCont}/>
        </View>
    )
}

const style = StyleSheet.create({
    logo : {
        height : 60,
        width : 60,
        marginBottom : "10%"
    },
    STACKION : {
        fontWeight : 500,
        fontSize : 32
    },
    buttonsCont : {
        marginTop : "30%"
    },
    buttons : {
        height : 45,
        width : "80%",
        maxWidth : 299,
        minWidth : 180,
        borderRadius : 10,
        zIndex : 3
    },
    buttonText : {
        fontSize : 30,
        fontFamily : "Comfortaa-Regular"
    },
    termsLinkCont : {
        position : "absolute",
        bottom : 13
    },
    termsLinkText : {
        color : Colors.blue2,
        fontSize : 12
    }
})

export default AppInterfaceAfterInstallation;