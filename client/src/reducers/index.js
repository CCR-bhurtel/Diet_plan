import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import home from './home';

import settings from './settings';
import edit from './edit';
import add from './add';
import meal from './meal';
export default combineReducers({
  alert,
  auth,
  home,
  settings,
  edit,
  add,
  meal,
});
