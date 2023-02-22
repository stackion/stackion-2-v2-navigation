import { useEffect } from "react";
import {
    View,
    Image
} from "react-native";
import DefaultStyles from "../styles/defaults.js";
import Colors from "../styles/colors";

import { usePreventGoingBackToScreen } from "../functions/navigation";

const Splash = (props) => {
    usePreventGoingBackToScreen("Splash");
    //TODO check login state before any navigation;
    useEffect(() => {
        let navigationDelay = setTimeout(() => {
            props.navigation.navigate("Dashboard");
        }, 1000);
        return () => clearTimeout(navigationDelay);
    }, []);
    return (
        <View style={[
            DefaultStyles.centeredXY,
            DefaultStyles.WHSpanParent, {backgroundColor : Colors.white}
        ]}>
            <Image style={{
                height : 72,
                width : 72
            }} source={require("../../assets/images/favicon.png")}/>
        </View>
    )
}

export default Splash;