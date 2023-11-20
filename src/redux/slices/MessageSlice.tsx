import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MessageState {
  id: number;
  from_user: {
    id: number;
    name: string;
  };
  content: string;
  created_at: string;
}

const initState: MessageState = {
  id: 0,
  from_user: {
    id: 0,
    name: '',
  },
  content: '',
  created_at: '',
};

const MessageSlice = createSlice({
  name: 'message',
  initialState: initState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setMessage } = MessageSlice.actions;
export default MessageSlice;
