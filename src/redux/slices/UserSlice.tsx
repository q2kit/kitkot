import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  accessToken: string | null;
  name?: string;
  id?: number;
}

const initState: UserState = {
  accessToken: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      return {...state, ...action.payload};
    },
    logout: state => {
      return {
        ...state,
        accessToken: null,
        id: undefined,
        name: undefined,
      };
    },
  },
});

export const {setUser, logout} = UserSlice.actions;
export default UserSlice;
