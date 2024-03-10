// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import idSlice from './Slices/idSlice';
import userSlice from './Slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    id:idSlice,
    user: userSlice
  },
});
export type RootState = ReturnType<typeof store.getState>; // Add this line to define RootState
export default store;
