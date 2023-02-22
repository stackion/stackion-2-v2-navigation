import {
    View,
    Image
} from "react-native";
import DefaultStyles from "../styles/defaults.js"

const Splash = () => {
    return (
        <View style={[
            DefaultStyles.centeredXY,
            DefaultStyles.WHSpanParent
        ]}>
            <Image style={{
                height : 92,
                width : 92
            }} source={require("../../assets/images/favicon.png")}/>
        </View>
    )
}

export default Splash;