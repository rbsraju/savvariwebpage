// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>; // Add this line to define RootState
export default store;
