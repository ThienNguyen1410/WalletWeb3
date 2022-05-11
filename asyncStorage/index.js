import AsyncStorage from "@react-native-async-storage/async-storage";

export const keys = {
    uuid: "uuid",
};

const setAsyncStorage = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }
};

const getAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

const clearAsyncStorage = () => {
    try {
        AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
};

export { setAsyncStorage, getAsyncStorage, clearAsyncStorage };
