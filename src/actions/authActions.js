import * as httprequest from "../utils/httprequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.log(err);
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
        console.log(err);
    }
}


export const signUp = async ({ username, password, email }) =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await httprequest.post('signup', { username, password, email }, config);
        return response;
    } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    }
} 

//login
export const login = createAsyncThunk('auth', async ({ username, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
    
        const { data, success } = await httprequest.post('auth', { username, password }, config);
        
        if (success) {
            await AsyncStorage.setItem('user', JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
});

export const getData = async () => {
    try {
        const response = await httprequest.get('todos/1');
        return response;
    } catch (err) {
        console.log(err);
    }
};