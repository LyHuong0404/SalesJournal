import { createAsyncThunk } from "@reduxjs/toolkit";
import * as httprequest from "../utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const notifications = async({ pushToken, title, message }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('send-notification', { pushToken, title, message } , config);
        return response;
    } catch(err) {
        console.log("Error when sending notification: ", err);
    }
}


export const filterServicePackage = async({ pageIndex, pageSize, orderBy }) => {
    try {
        const filters = { pageSize, pageIndex, orderBy };
        const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));
        const response = await httprequest.get('filter-service-package', { params: filteredParams });
        return response?.data;
    } catch (err) {
        console.log("Error when filtering service package: ", err);
    }
}


export const createURLPayment = async({ servicePackageId, bankCode }) => { 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await httprequest.post('create-url-payment', { servicePackageId, bankCode } , config);
        return response;
    } catch(err) {
        console.log("Error when creating URL payment: ", err);
    }
}