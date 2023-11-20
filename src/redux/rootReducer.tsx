import { combineReducers } from 'redux';
import UserSlice from './slices/UserSlice';
import NotificationSlice from './slices/MessageSlice';
import InChatScreenSlice from './slices/InChatScreenSlice';

const rootReducer = combineReducers({
  user: UserSlice.reducer,
  notification: NotificationSlice.reducer,
  inChatScreen: InChatScreenSlice.reducer,
});

export default rootReducer;
