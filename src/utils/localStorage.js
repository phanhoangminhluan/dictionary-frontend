  
// import JWT_Decode from "jwt-decode";

export const LOCAL_STORAGE_KEY = {
    JWT: "dictionary_jwt",
    USERNAME: 'dictionary__username',
};

class LocalStorageUtils {
    getItem(key, defaultValue) {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem(key) || defaultValue;
        }

        return "undefined";
    }

    setItem(key, value) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key) {
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(key);
        }
    }

    clear() {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
        }
    }

    isRole() {
        const jwt = this.getItem(LOCAL_STORAGE_KEY.JWT);

        if (jwt !== undefined) {
            // let decode = JWT_Decode(jwt);

            // if (decode.isAdmin) {
            //     return "isAdmin";
            // } else {
            //     return "isUser";
            // }
            return "isUser"
        }

        return "null";
        
    }

    getJWT() {
        return this.getItem(LOCAL_STORAGE_KEY.JWT, "");
    }
}

export default new LocalStorageUtils();
