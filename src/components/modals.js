import {
    View,
    StyleSheet,
    useWindowDimensions
} from "react-native";
import { BottomModal, ModalFooter } from "react-native-modals";
import { Btn } from "./button";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";

/*

            <QuickMenu navigation={props.navigation} visibility={quickMenuVisibility} closeModalBtnPressed={() => setQuickMenuVisibility(false)} />

                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Send offline" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("SendOffline")
                    }}  />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Receive offline" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("ReceiveViaOffline")
                    }}   />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Convert" textStyle={[style.quickMenuBtnsText]} />
            
            */

export const QuickMenu = props => {

    const {height} = useWindowDimensions();
    const style = StyleSheet.create({
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
                        props.navigation.navigate("SendOffline")
                    }}  />
                    <Btn style={[style.quickMenuBtns, DefaultStyle.centeredY]} text="Receive offline" textStyle={[style.quickMenuBtnsText]} onPress={() => {
                        props.closeModalBtnPressed();
                        props.navigation.navigate("ReceiveViaOffline")
                    }}   />
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
          </ModalFooter>
        </BottomModal>
    )
}