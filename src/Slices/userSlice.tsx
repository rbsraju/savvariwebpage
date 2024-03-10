// userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Assume you have a store file
import { UserAccount } from '../Types';

interface UserState {
  userDetails: UserAccount | null;
}

const initialState: UserState = {
    userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAccount>) => {
      state.userDetails = action.payload;
    },
    clearUser: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.userDetails;

export default userSlice.reducer;
