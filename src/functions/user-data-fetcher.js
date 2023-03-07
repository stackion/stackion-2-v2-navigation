import axios from "axios";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "./encrypted-storage";

export const fetchAndSaveData = async (callback) => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        //TODO change the baseUrl for this request
        axios.post("/fetch-data", {
            user_access_token : parsedSession.user_access_token,
        })
        .then(res => {
            let response = res.data;
            if(response.status === "success") {
                parsedSession.userOnlineData = response.data;
                callback();
            }
        })
        .catch(err => {
            Toast.show({
                type : "error",
                text1 : "Connection error",
                text2 : "poor or no internet connection"
            })
        })
    }
}