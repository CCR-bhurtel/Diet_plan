import setAuthToken from '../Utils/setAuthToken';

const {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  DELETE_ACCOUNT,
  LOAD_SETTINGS,
} = require('../actions/types');

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  setting: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
      };

    case LOAD_SETTINGS:
      return {
        ...state,
        setting: payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOG_OUT:
    case DELETE_ACCOUNT:

    // eslint-disable-next-line no-fallthrough
    case AUTH_ERROR:
      setAuthToken(null);
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
