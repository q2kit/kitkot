import {combineReducers} from 'redux';
import UserSlice from './slices/UserSlice';
import NotificationSlice from './slices/NotificationSlice';

const rootReducer = combineReducers({
  user: UserSlice.reducer,
  notification: NotificationSlice.reducer,
});

export default rootReducer;
