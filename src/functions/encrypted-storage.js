import EncryptedStorage from "react-native-encrypted-storage";

export const setItem = async (key, jsonData) => {
    try {
        await EncryptedStorage.setItem(key, jsonData);
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
    }
    catch (err) {
        return false;
    }
}