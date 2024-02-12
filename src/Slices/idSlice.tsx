// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the authentication slice
interface idState {
  id: string | null;
  role:string| null;
}

const initialState: idState = {
  id: null,
  role:null
};

// Create a Redux slice for authentication
const idSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    setID: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
        state.role = action.payload;
      }
    
  },
});

// Export the actions and reducer
export const { setID,setRole } = idSlice.actions;
//export const selectUser = (state: { auth: { token: any; }; }) => state.auth.token;
export default idSlice.reducer;
