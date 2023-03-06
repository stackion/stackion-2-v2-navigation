import { useEffect } from "react";
import {
    View,
    Image
} from "react-native";

import * as encryptedStorage from "../functions/encrypted-storage";
import DefaultStyles from "../styles/defaults.js";
import Colors from "../styles/colors";


const Splash = (props) => {
    //TODO check login state before any navigation;
    useEffect( () => {
        const setInitialSessionAfterInstall = () => {
            encryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    logged_in : false
                })
            );
        }
        const getSessionAndNavigate = ( () => {
            const userSession = encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                let navigationDelay = setTimeout(() => {
                    if(parsedSession.logged_in === true && parsedSession.verified_email !== 0) {
                        props.navigation.replace("Dashboard");
                    }
                    else if(parsedSession.verified_email === 0) {
                        props.navigation.replace("VerifyEmail");
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