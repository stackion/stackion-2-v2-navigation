import {StyleSheet} from "react-native";
import Colors from "./colors";

const DefaultStyle = StyleSheet.create({
    blayout : {
        borderColor : Colors.black,
        borderWidth : 1,
        borderStyle : "solid"
    },
    centeredX : {
        alignItems : "center"
    },
    centeredY : {
        justifyContent : "center"
    },
    centeredXY : {
        justifyContent : "center",
        alignItems : "center"
    },
    centeredYSpaceBetweenX : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
    },
    centeredYSpaceAroundX : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around"
    },
    WHSpanParent : {
        width : "100%",
        height : "100%"
    },
    WSpanParent : {
        width : "100%"
    },
    /*font family*/
    ComfortaaBold : {
        fontFamily : "Comfortaa-Bold"
    },
    ComfortaaMedium : {
        fontFamily : "Comfortaa-Medium"
    },
    ComfortaaRegular : {
        fontFamily : "Comfortaa-Regular"
    }
})

export default DefaultStyle;