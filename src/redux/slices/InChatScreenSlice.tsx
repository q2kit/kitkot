import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InChatScreen {
  friendId: number;
}

const initState: InChatScreen = {
  friendId: 0,
};

const InChatScreenSlice = createSlice({
  name: 'inChatScreen',
  initialState: initState,
  reducers: {
    setInChatScreen: (state, action: PayloadAction<InChatScreen>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setInChatScreen } = InChatScreenSlice.actions;
export default InChatScreenSlice;
