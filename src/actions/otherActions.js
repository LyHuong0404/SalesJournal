import { createAsyncThunk } from "@reduxjs/toolkit";
import * as httprequest from "../utils/httprequest";


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


export const updateStore = createAsyncThunk('update-profile', async ({ profileId, nameStore, allowCustomerAccumulate, exchangePointToMoney, exchangeMoneyToPoint }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await httprequest.post('update-profile', { profileId, nameStore, allowCustomerAccumulate, exchangePointToMoney, exchangeMoneyToPoint } , config);
        if (response?.code == 0) {
            return response?.data;
        } else {
            return rejectWithValue('Thất bại');
        }
    } catch (error) {
        console.log("Error when updating store: ", error);
    }
});
