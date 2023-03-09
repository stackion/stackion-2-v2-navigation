import EncryptedStorage from "react-native-encrypted-storage";

export const setItem = async (key, jsonData) => {
    try {
        await EncryptedStorage.setItem(key, jsonData);
        return true;
    }
    catch (err) {
        return false;
    }
}

export const getItem = async (key) => {
    try {
        const item = await EncryptedStorage.getItem(key);
        return item;
    }
    catch(err) {
        return false;
    }
}

export const removeItem = async (key) => {
    try {
        await EncryptedStorage.removeItem(key);
        return true;
    }
    catch (err) {
        return false;
    }
}