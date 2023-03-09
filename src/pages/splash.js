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
        const random_number = (e)  => {
            let generated_value = [];
            for (let i = 1; i <= e; i++) {
                generated_value.push(Math.floor(Math.random() * 10));
            }
            return generated_value.join("");
        };
        const setInitialSessionAfterInstall = async () => {
            await encryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    transaction_pin : "0000",
                    logged_in : false,
                    user_access_token : "",
                    verified_email : 0,
                    user_online_data : {
                        name : "",
                        username : "",
                        fiat_balance : 0,
                        transaction_records_db : []
                    },
                    ofline_token_balance : 0,
                    device_id : random_number(12),
                    receipts_db : []
                })
            );
        }
        const getSessionAndNavigate = async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                let navigationDelay = setTimeout(() => {
                    if(parsedSession.logged_in === true && parsedSession.verified_email !== 0) {
                        props.navigation.replace("Dashboard");
                    }
                    else if(parsedSession.logged_in === true && parsedSession.verified_email === 0) {
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
        };
        getSessionAndNavigate();
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