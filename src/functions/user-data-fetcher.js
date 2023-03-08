import axios from "axios";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "./encrypted-storage";

export const fetchAndSaveData = async (callback) => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        //TODO change the baseUrl for this request
        return (axios.post("https://f3a4-102-89-42-44.eu.ngrok.io/fetch-data", {
            user_access_token : parsedSession.user_access_token,
        })
        .then(res => {
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
        }))
    }
}