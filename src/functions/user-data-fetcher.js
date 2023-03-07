import axios from "axios";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "./encrypted-storage";

export const fetchAndSaveData = async (callback) => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let resolvement = true;
        let parsedSession = JSON.parse(userSession);
        //TODO change the baseUrl for this request
        axios.post("https://381e-102-89-22-32.eu.ngrok.io/fetch-data", {
            user_access_token : parsedSession.user_access_token,
        })
        .then(res => {
            let response = res.data;
            if(response.status === "success") {
                parsedSession.user_online_data = response.data;
                callback();
            }
        })
        .catch(err => {
            Toast.show({
                type : "error",
                text1 : "Connection error",
                text2 : "Using offline mode. Only offline balance is shown"
            })
            resolvement = false;
        })
        return resolvement;
    }
}