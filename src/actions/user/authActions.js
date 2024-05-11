import { createAsyncThunk } from "@reduxjs/toolkit";
import * as httprequest from "../../utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateProfile = createAsyncThunk('update-user-info', async ({ phone, fullname }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await httprequest.post('update-user-info', { phone, fullname } , config);

        if (response?.code == 0) {
            const updateInfoFromAsyncStorage = async() => {
                const userJson = await AsyncStorage.getItem('user');
                const userData = JSON.parse(userJson);
                
                userData.user = response?.data;
                await AsyncStorage.setItem('user', JSON.stringify(userData));
            }
            updateInfoFromAsyncStorage();
            
            return response?.data;
        } else {
            return rejectWithValue('Thất bại');
        }
    } catch (error) {
        console.log("Error when updating user's profile: ", error);
    }
});

export const changePw = async ({ currentPassword, newPassword }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('change-password', { currentPassword, newPassword }, config);
        return response;
    } catch (err) {
        console.log("Error when getting code to sign up: ", err);
    }
}

export const registerStore = createAsyncThunk('register-trial', async ({ nameStore }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await httprequest.post('register-trial', { nameStore } , config);

        if (response?.code == 0) {
            const updateInfoFromAsyncStorage = async() => {
                const userJson = await AsyncStorage.getItem('user');
                const userData = JSON.parse(userJson);
                
                userData.user.profile = response?.data;
                await AsyncStorage.setItem('user', JSON.stringify(userData));
            }
            updateInfoFromAsyncStorage();
            
            return response?.data;
        } else {
            return rejectWithValue('Thất bại');
        }
    } catch (error) {
        console.log("Error when updating user's profile: ", error);
    }
});

export const updateAvatar = createAsyncThunk('update-avatar', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await httprequest.post('update-avatar', formData , config);
        if (response?.code == 0) {
            const updateInfoFromAsyncStorage = async() => {
                const userJson = await AsyncStorage.getItem('user');
                const userData = JSON.parse(userJson);
                
                userData.user = response?.data;
                await AsyncStorage.setItem('user', JSON.stringify(userData));
            }
            updateInfoFromAsyncStorage();
            
            return response?.data;
        } else {
            return rejectWithValue('Thất bại');
        }
    } catch (error) {
        console.log("Error when updating user's avatar: ", error);
    }
});