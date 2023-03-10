import axios from "axios";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "./encrypted-storage";

export const fetchAndSaveData = async () => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        //TODO change the baseUrl for this request
        try {
            const res = await axios.post("https://0ce2-102-89-23-169.eu.ngrok.io/fetch-data", {
                user_access_token : parsedSession.user_access_token,
            })
            let response = res.data;
            if(response.status === "success") {
                parsedSession.user_online_data = response.data;
                await encryptedStorage.setItem("user_session",JSON.stringify(parsedSession));
                Toast.show({
                    type : "success",
                    text1 : "Online mode",
                    text2 : "Using online mode. All balance are shown"
                })
                return true;
            }
        }
        catch(err) {
            Toast.show({
                type : "error",
                text1 : "Connection error",
                text2 : "Using offline mode. Only offline balance is shown"
            })
            return false;
        }
    }
}