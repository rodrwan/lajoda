import { combineReducers } from 'redux';

import sessionReducer from './session';
import reportReducer from './report';
import userReducer from './user';

export default combineReducers({
  session: sessionReducer,
  reports: reportReducer,
  user: userReducer,
});
