import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string | null;
  name?: string;
  id?: number;
  username?: string;
  avatar?: string;
  following?: number;
  followers?: number;
  likes?: number;
}

const initState: UserState = {
  accessToken: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return initState;
    },
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice;
