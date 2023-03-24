import axios from "axios";
import Toast from "react-native-toast-message";

import * as encryptedStorage from "./encrypted-storage";
import {backendUrls} from "./config";

export const fetchAndSaveData = async () => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        //TODO change the baseUrl for this request
        try {
            const res = await axios.post(`${backendUrls.userData}/fetch-data`, {
                user_access_token : parsedSession.user_access_token,
            })
            let response = res.data;
            if(response.status === "success") {
                parsedSession.user_online_data = response.data;
                const syncedReceipts = await axios.post(`${backendUrls.userData}/sync-offline-receipts`, {
                    user_access_token : parsedSession.user_access_token,
                    receipts_db : parsedSession.receipts_db
                });
                if(syncedReceipts.data.status == "success") {
                    parsedSession.receipts_db = syncedReceipts.data.receipts_db;
                }
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