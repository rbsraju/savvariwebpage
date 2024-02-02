// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the authentication slice
interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

// Create a Redux slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearToken:(state) =>{
    state.token = null;
    },
  },
});

// Export the actions and reducer
export const { setToken, clearToken } = authSlice.actions;
//export const selectUser = (state: { auth: { token: any; }; }) => state.auth.token;
export default authSlice.reducer;
