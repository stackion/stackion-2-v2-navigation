import {
    View,
    StyleSheet,
    useWindowDimensions
} from "react-native";
import { Btn } from "./button";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";

export const QuickMenu = props => {

    const {height , width} = useWindowDimensions();
    const style = StyleSheet.create({
        modalGroupExternalCont : {
            width : width,
            backgroundColor : Colors.transparents.black,
            zIndex : 2,
            position : "absolute",
            top : 0,
            left : 0
        },
        bottomModalGroupExternalCont : {
            justifyContent : "flex-end",
        },
        BottomModalContent : {
            height : height / 2,
            maxHeight : 260,
            backgroundColor : Colors.white,
        },
        quickMenuTopper : {
            height : "78%",
        },
        quickMenuFooter : {
            height : "22%",
        },
        quickMenuBtns : {
            height : `${100/3}%`,
            borderBottomWidth : 0.8,
            borderBottomColor : Colors.blackF2,
            borderBottomStyle : "solid",
            padding : 15
        },
        quickMenuBtnsText : {
            fontSize : 16,
            color : Colors.black46,
            fontFamily : "Comfortaa-Regular"
        }
    })

    return (
        <View style={[style.modalGroupExternalCont, style.bottomModalGroupExternalCont, {
            height : props.height
        }]} >
            <View style={[style.BottomModalContent, DefaultStyle.WSpanParent]} >
                <View style={[DefaultStyle.WSpanParent, style.quickMenuTopper]}>
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Send offline" textStyle={[style.quickMenuBtnsText]} />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Receive offline" textStyle={[style.quickMenuBtnsText]} />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Convert" textStyle={[style.quickMenuBtnsText]} />
                </View>
                <View style={[DefaultStyle.WSpanParent, style.quickMenuFooter, DefaultStyle.centeredXY]}>
                    <Btn text="+" style={[DefaultStyle.centeredXY, {
                        backgroundColor : Colors.defaultBlue,
                        width : 30,
                        height : 30,
                        borderRadius : 5,
                        }]} textStyle={{fontSize : 24, color : Colors.white, transform : [{rotate: '45deg'}] }}
                        onPress={props.closeModalBtnPressed}
                        />
                </View>
            </View>
        </View>
    )
}
