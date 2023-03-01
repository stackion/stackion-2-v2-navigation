import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert
} from "react-native";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn, Anchor} from "../components/button";

const termsURL = "https://google.com";

const SignUp = (props) => {
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
                            Create
                        </Text>
                        <Text style={[style.introText]}>
                            Account
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Name" inputMode="text"/>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Email" inputMode="email"/>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={true} placeholder="Password"/>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={true} placeholder="Retype Password"/>
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text="Sign in" textStyle={{color : Colors.black, fontSize : 16, fontFamily : "Roboto-Regular"}} onPress={() => Alert.alert("Sign in ?")}/>
                        <Btn text="Sign up" style={style.submitBtn} textStyle={style.submitBtnText} onPress={() => Alert.alert("Sign up ?")}/>
                    </View>
                    <View style={{marginTop : 35}}>
                        <Text style={{fontSize : 12,
                            color : Colors.black46,
                            fontSize : 12,
                            fontFamily : "Roboto-Regular"}}>
                            By clicking sign up, we assume that you have read our <Anchor style={[DefaultStyle.centeredXY]} href={termsURL} textStyle={{fontSize : 12,color : Colors.blue2,
                            fontFamily : "Roboto-Regular"}} text="Terms & Policies"/> and that you agree with them.
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

export default SignUp;