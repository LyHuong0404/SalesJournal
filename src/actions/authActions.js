import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as httprequest from "../utils/httprequest";

//signUp
export const getCodeSignUp = async ({ username, email }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('get-code-signup', { username, email }, config);
        return response;
    } catch (err) {
        console.log("Error when getting code to sign up: ", err);
    }
}

export const checkCodeSignUp = async ({ username, code }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('check-code-signup', { username, code }, config);
        return response;
    } catch (err) {
        console.log("Error when checking code to sign up: ", err);
    }
}


export const signUp = async ({ username, password, email, notifyId }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        notifyId = await AsyncStorage.getItem('notifyToken');
        notifyId = JSON.parse(notifyId);
        const response = await httprequest.post('signup', { username, password, email, notifyId }, config);
        return response;
    } catch (err) {
        console.log("Error when signup: ", err);
    }
} 

//forgotPassword
export const getCodeForgotPassword = async ({ username }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('get-code-forgot-password', { username }, config);
        return response;
    } catch (err) {
        console.log("Error when getting code to recovery password: ", err);
    }
} 

export const checkCodeForgotPassword = async ({ username, code }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('check-code-forgot-password', { username, code }, config);
        return response;
    } catch (err) {
        console.log("Error when checking code to recovery password: ", err);
    }
}

export const recoverPassword = async ({ username, newPassword }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('forgot-password', { username, newPassword }, config);
        return response;
    } catch (err) {
        console.log("Error when recovering password: ", err);
    }
} 

//login
export const login = createAsyncThunk('auth', async ({ username, password, notifyToken, idToken, provider }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const { data, code } = await httprequest.post('auth', { username, password, notifyToken, idToken, provider }, config);
 
        if (code == 0) {
      
            await AsyncStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            return rejectWithValue('Invalid Email Or Password');
        }
    } catch (error) {
        console.log("Error when login: ", error);
    }
});


export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
    try {
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('user');
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const notifyToken = await AsyncStorage.getItem('notifyToken');
        const { data, code } = await httprequest.post('logout', { notifyToken }, config);
        if (code == 0) {
            return data;
        } else {
            return rejectWithValue('Logout unsuccessfully');
        }
    } catch (error) {
        console.log("Error when logout: ", error);
    }
});

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

export const profileInfo = async() => {
    try {   
        const response = await httprequest.get('profile-info');
        return response?.data;
    } catch (err) {
        console.log("Error when gettting profile info: ", err);
    }
}


export const updateUser = createAction('auth/updateUser');

