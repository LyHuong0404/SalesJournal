import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const httprequest = axios.create({
    // baseURL: "https://apisalesjournal.cfapps.ap21.hana.ondemand.com/api/",
    baseURL: "http://192.168.1.57:8888/api/",

});

export const get = async (apipath, params = {}) => {
    const args = {method: 'get', apipath, params};
    try {
        const response = await httprequest.get(apipath, params);
        return response.data;
    } catch (error) {
        return await middlewareRefreshToken(error.response?.status, args);
    }

};

export const post = async (apipath, data, params = {}) => {
    const args = {method: 'post', apipath, data, params};
    try {
        const response = await httprequest.post(apipath, data, params);
        return response.data;
    } catch(error) {
        return await middlewareRefreshToken(error.response?.status, args);
    }
};

export const patch = async (apipath, data, params = {}) => {
    const response = await httprequest.patch(apipath, data, params);
    return response.data;
};

export const remove = async (url, data, options = {}) => {
    const response = await httprequest.delete(url, data, options);
    return response.data;
};


//AsyncStorage must use with async/await
const getAccessToken = async () => {
    try {
        const userData = await AsyncStorage.getItem('user');
        const userJson = JSON.parse(userData);
        const accessToken = userJson?.accessToken;
        return accessToken;
    } catch (error) {
        console.error('Error getting access token from AsyncStorage:', error);
        return null;
    }
};

let isGetRefreshToken = false;

const waitProcessComplete = async () => {
    await new Promise(resolve => {
        const intervalId = setInterval(() => {
            if (isGetRefreshToken === false) {
                clearInterval(intervalId);
                resolve();
            }
        }, 100);
    });
}

const middlewareRefreshToken = async (code, args) => {
    if(code !== 401) return null;
    if(isGetRefreshToken) {
        await waitProcessComplete();
        let resp;
        switch(args.method) {
            case 'get': resp = await get(args.apipath, args.params.params); break;
            case 'post': resp = await post(args.apipath, args.data, args.params.params); break;
        } 
        return resp;
    }
    else {
        try {
            isGetRefreshToken = true;
            const userData = await AsyncStorage.getItem('user');
            const userJson = JSON.parse(userData);
            const refreshToken = userJson?.refreshToken;
            const config = {
                headers: {
                'Content-Type': 'application/json',
                },
            };
            const { data } = await httprequest.post('refresh-token', { refreshToken }, config);
            if (data.code == 0) {
                userJson.refreshToken = data.data.refreshToken;
                userJson.accessToken = data.data.accessToken;
                userJson.expireAt = data.data.expireAt;
                userJson.expireRefreshToken = data.data.expireRefreshToken;
                await AsyncStorage.setItem('user', JSON.stringify(userJson));
                isGetRefreshToken = false;
                let resp;
                switch(args.method) {
                    case 'get': resp = await get(args.apipath, args.params.params); break;
                    case 'post': resp = await post(args.apipath, args.data, args.params.params); break;
                }
                return resp;
            }
            else {
                console.log("Error when middlewareRefreshToken: ", {});
            }
        } catch (error) {
            console.log("Error when middlewareRefreshToken: ", error);
        } finally {
            isGetRefreshToken = false;
        }
    };
}


// Interceptor để thêm accessToken vào headers của mỗi yêu cầu
httprequest.interceptors.request.use(
    async (config) => {
        const accessToken = await getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log("httprequest.interceptors.request.use", error);
        return Promise.reject(error);
    }
);