import Crypto from "crypto-js";
import * as encryptedStorage from "./encrypted-storage";

export const encrypt = async (data) => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        let key = parsedSession.encryption_key;
        const encryptedData = Crypto.AES.encrypt(data, key).toString();
        return encryptedData;
    }
}

export const decrypt = async (data) => {
    const userSession = await encryptedStorage.getItem("user_session");
    if(userSession) {
        let parsedSession = JSON.parse(userSession);
        let key = parsedSession.encryption_key;
        const decryptedData = Crypto.AES.decrypt(data, key).toString(Crypto.enc.Utf8);
        return decryptedData;
    }
}
