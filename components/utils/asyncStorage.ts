import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearStorage = () => {
    AsyncStorage.clear()
}

export const saveString = async (key: string, value: string): Promise<void> => {
    try {
        console.log("SAVING DATA - STRING")
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

export async function saveObject<T> (key: string, value: T): Promise<void> {
    try {
        console.log("SAVING DATA - OBJECT")
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const loadString = async (key: string): Promise<string> => {
    try {
        console.log("LOADING DATA - STRING")
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            return value
        }
        return ""
    } catch(e) {
        throw Error(`string with key: ${key}, could not be loaded`)
    }
}
  
export async function loadObject<T> (key: string): Promise<T> {
    try {
        console.log("LOADING DATA - OBJECT")
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        throw Error(`object with key: ${key}, could not be loaded`)
    }
}

export const isKeyInStorage = async (key: string): Promise<boolean> => {
    try {
        console.log("LOADING KEYS")
        const value = await AsyncStorage.getAllKeys()
        return value.includes(key)
    } catch(e) {
        throw Error(`error in storage`)
    }
}
