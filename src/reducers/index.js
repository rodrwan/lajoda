import { combineReducers } from 'redux';

import sessionReducer from './session';
import reportReducer from './report';

export default combineReducers({
  session: sessionReducer,
  reports: reportReducer,
});
