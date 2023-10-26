import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationState {
  title: string;
}

const initState: NotificationState = {
  title: '',
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: initState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setNotification } = NotificationSlice.actions;
export default NotificationSlice;
