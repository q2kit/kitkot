import {combineReducers} from 'redux';
import UserSlice from './slices/UserSlice';

const rootReducer = combineReducers({
  user: UserSlice.reducer,
});

export default rootReducer;
