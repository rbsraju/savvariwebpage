// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import idSlice from './Slices/idSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    id:idSlice
  },
});
export type RootState = ReturnType<typeof store.getState>; // Add this line to define RootState
export default store;
