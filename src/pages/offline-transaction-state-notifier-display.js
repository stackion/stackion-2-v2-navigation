import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const OfflineTransactionStateNotifierDisplay = props => {
    return (
        <InAppHB navigation={props.navigation} headerTitleText={props.messageTitle} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={[DefaultStyle.centeredXY]}>
                <Text style={style.messageText}>
                    {props.message}
                </Text>
            </View>
        </InAppHB>
    )
}

const style = StyleSheet.create({
    messageText : {
        fontSize : 16,
        color : Colors.black31,
        fontFamily : "Roboto-Regular",
    }
})

export default OfflineTransactionStateNotifierDisplay;