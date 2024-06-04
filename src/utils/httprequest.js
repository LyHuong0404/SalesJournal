import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const httprequest = axios.create({
    // baseURL: "https://apisalesjournal.cfapps.ap21.hana.ondemand.com/api/",
    baseURL: "http://192.168.1.57:8888/api/",

});

export const get = async (apipath, params = {}) => {
    const response = await httprequest.get(apipath, params);
    return response.data;
};

export const post = async (apipath, data, params = {}) => {
    const response = await httprequest.post(apipath, data, params);
    return response.data;
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
        return Promise.reject(error);
    }
);
export default httprequest;