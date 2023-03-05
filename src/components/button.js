import {
    Text,
    Linking,
    TouchableOpacity
} from "react-native";
import Colors from "../styles/colors";

export const Btn = props => {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export const Anchor = props => {
    return (
        <TouchableOpacity style={props.style} onPress={() => Linking.openURL(props.href)}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}