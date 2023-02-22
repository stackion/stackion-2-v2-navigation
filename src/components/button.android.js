import {
    Pressable,
    Text,
    Linking,
} from "react-native";
import Colors from "../styles/colors";

export const Btn = props => {
    return (
        <Pressable android_ripple={{
            color : Colors.black46
        }} style={props.style} onPress={props.onPress}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </Pressable>
    )
}

export const Anchor = props => {
    return (
        <Pressable android_ripple={{
            color : Colors.black46
        }} style={props.style} onPress={() => Linking.openURL(props.href)}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </Pressable>
    )
}