import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; 
import userSlice from './reducers/authSlice';

const rootReducer = combineReducers({
    auth: userSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
