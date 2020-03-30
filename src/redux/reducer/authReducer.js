import { LOGIN_FAIL, LOGIN_PASS, SIGN_UP_PASS, UPDATE_FAIL, UPDATE_PASS } from "../types";

const intialState = {
  isLoggedIn: false,
  loginDetails: {},
  loginError: false,
  signUp: false
};

export default (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_PASS:
      return {
        ...state,
        isLoggedIn: true,
        loginDetails: payload,
        loginError: false
      };
      case UPDATE_PASS:
      return {
        ...state,
        loginDetails: payload,
      };
      case UPDATE_FAIL:
      return {
        ...state,
        loginDetails: {},
        isLoggedIn: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginDetails: {},
        isLoggedIn: false,
        loginError: true
      };
    case SIGN_UP_PASS:
      return {
        ...state,
        signUp: true
      };
    default:
      return {
        ...state
      };
  }
};
