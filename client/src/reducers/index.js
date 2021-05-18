import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import center from './center';

export default combineReducers({ alert, auth, center });
