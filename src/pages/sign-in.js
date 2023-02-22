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


const SignIn = () => {
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
                            Welcome
                        </Text>
                        <Text style={[style.introText]}>
                            Back
                        </Text>
                    </View>
                    <View style={style.inputCont}>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} placeholder="Email" inputMode="email"/>
                        <TextInput style={[style.input, DefaultStyle.centeredXY]} secureTextEntry={true} placeholder="Password"/>
                    </View>
                    <View>
                        <Btn onPress={() => Alert.alert("Change password ?")} style={{marginTop : 20}} text="forgot password ?" textStyle={{color : Colors.blue2, fontFamily : "Roboto-Regular", fontSize : 12}}/>
                    </View>
                    <View style={[style.btnsCont]}>
                        <Btn text="Sign up" textStyle={{color : Colors.black, fontSize : 16, fontFamily : "Roboto-Regular"}} onPress={() => Alert.alert("Sign up ?")}/>
                        <Btn text="Sign in" style={style.submitBtn} textStyle={style.submitBtnText} onPress={() => Alert.alert("Sign in ?")}/>
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