import {
    View,
    useWindowDimensions
} from "react-native";
import { 
    ScaledSheet as StyleSheet,
    moderateScale,
    verticalScale,
    scale
} from 'react-native-size-matters';
import { Modal, BottomModal, ModalFooter, ModalContent} from "react-native-modals";
import { Btn } from "./button";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";

export const AfterTransactionPopUp = props => {

    const {height} = useWindowDimensions();
    const style = StyleSheet.create({
        ModalContent : {
            height : height * (3/4),
            backgroundColor : Colors.white,
        },
        bottomBtn : {
            height : 40,
            width : 270,
            backgroundColor : Colors.defaultBlue,
            margin : 8,
            borderRadius : 5
        },
        bottomBtnText : {
            color : Colors.white,
            fontSize : 16,
            fontFamily : "Comfortaa-Regular"
        }
    })
//TODO add button press feature for the convert page 
          // 
    return (
        <BottomModal
          visible={props.visibility}
        >
            <ModalContent style={[style.ModalContent, DefaultStyle.WSpanParent, DefaultStyle.centeredX]}>
                {props.children}
            </ModalContent>
            <ModalFooter style={[DefaultStyle.centeredXY]}>
                <Btn text="Done" style={[style.bottomBtn, DefaultStyle.centeredXY]} textStyle={style.bottomBtnText} onPress={props.onBottomBtnClicked} />
            </ModalFooter>
        </BottomModal>
    )
}
export const QuickMenu = props => {

    const {height} = useWindowDimensions();
    const style = StyleSheet.create({
        BottomModalContent : {
            height : `${height / 2}@vs`,
            maxHeight : "260@vs",
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
            padding : "15@ms"
        },
        quickMenuBtnsText : {
            fontSize : "16@ms",
            color : Colors.black46,
            fontFamily : "Comfortaa-Regular"
        }
    })
//TODO add button press feature for the convert page 
          // 
    return (
        <BottomModal
          visible={props.visibility}
          onHardwareBackPress={props.closeModalBtnPressed}
        >
          <ModalFooter>
            <View style={[style.BottomModalContent, DefaultStyle.WSpanParent]} >
                <View style={[DefaultStyle.WSpanParent, style.quickMenuTopper]}>
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Send offline" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("ScanToSendOffline")
                    }}  />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Receive offline" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("ReceiveViaOffline")
                    }}   />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Convert" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("ConversionMode");
                    }} />
                </View>
                <View style={[DefaultStyle.WSpanParent, style.quickMenuFooter, DefaultStyle.centeredXY]}>
                    <Btn text="+" style={[DefaultStyle.centeredXY, {
                        backgroundColor : Colors.defaultBlue,
                        width : verticalScale(30),
                        height : verticalScale(30),
                        borderRadius : moderateScale(5),
                        }]} textStyle={{fontSize : moderateScale(24), color : Colors.white, transform : [{rotate: '45deg'}] }}
                        onPress={props.closeModalBtnPressed}
                        />
                </View>
            </View>
          </ModalFooter>
        </BottomModal>
    )
}