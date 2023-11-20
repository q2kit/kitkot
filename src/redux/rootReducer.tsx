import { combineReducers } from 'redux';
import UserSlice from './slices/UserSlice';
import MessageSlice from './slices/MessageSlice';
import InChatScreenSlice from './slices/InChatScreenSlice';

const rootReducer = combineReducers({
  user: UserSlice.reducer,
  message: MessageSlice.reducer,
  inChatScreen: InChatScreenSlice.reducer,
});

export default rootReducer;
