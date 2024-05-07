import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/authActions';
import { updateStore } from '../actions/otherActions';
import { updateProfile } from '../actions/user/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  success: false,
  isAuthenticated: false,
};

const loadUserDataFromStorage = async () => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    const userData = JSON.parse(userJson);
    
    return {
      user: userData?.user || null,
      token: userData?.accessToken || null,
    };
  } catch (error) {
    console.error('Error loading user data from AsyncStorage:', error);
    return {
      user: null,
      token: null,
    };
  }
};

const updateDateFromAsyncStorage = async (payload) => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    const userData = JSON.parse(userJson);
    
    userData.user.profile = payload;
    AsyncStorage.setItem('user', JSON.stringify(userData));

  } catch (error) {
    console.error('Error updating user data from AsyncStorage:', error);
  }
};


const initialStateWithStorage = {
  ...initialState,
  ...loadUserDataFromStorage(),
};

const userSlice = createSlice({
  name: 'auth',
  initialState: initialStateWithStorage,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStore.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.profile = payload;
        updateDateFromAsyncStorage(payload);
      })
      .addCase(updateStore.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
