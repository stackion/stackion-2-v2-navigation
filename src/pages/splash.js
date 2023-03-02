import { useEffect } from "react";
import {
    View,
    Image
} from "react-native";
import EncryptedStorage from 'react-native-encrypted-storage';
import DefaultStyles from "../styles/defaults.js";
import Colors from "../styles/colors";


const Splash = (props) => {
    //TODO check login state before any navigation;
    useEffect( () => {
        const setInitialSessionAfterInstall = async () => {
            try {
                await EncryptedStorage.setItem(
                    "user_session",
                    JSON.stringify({
                        loggedIn : false
                    })
                );
            } catch (error) {
                // There was an error on the native side
            }
        }
        const getSessionAndNavigate = ( async () => {
            try {
                const userSession = await EncryptedStorage.getItem("user_session");
                if(userSession) {
                    let parsedSession = JSON.parse(userSession);
                    let navigationDelay = setTimeout(() => {
                        if(parsedSession.loggedIn === true) {
                            props.navigation.replace("Dashboard");
                        }
                        else {
                            props.navigation.replace("AppInterfaceAfterInstallation");
                        }
                    }, 2000);
                    return () => clearTimeout(navigationDelay);
                }
                else {
                    setInitialSessionAfterInstall();
                    getSessionAndNavigate();
                }
            } catch (error) {
                // There was an error on the native side
            }
        })();
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