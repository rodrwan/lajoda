import { combineReducers } from 'redux';

import sessionReducer from './session';
import reportReducer from './report';
import userReducer from './user';
import pillReducer from './pill';

export default combineReducers({
  session: sessionReducer,
  reports: reportReducer,
  pills: pillReducer,
  user: userReducer,
});
