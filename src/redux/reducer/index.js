import {combineReducers} from 'redux';
import promiseReducer from './promiseReducer'
import authReducer from './authReducer'
import courseReducer from './courseReducer'
import adminReducer from './adminReducer'
const allReducers = combineReducers({
  promiseReducer,
  authReducer,
  courseReducer,
  adminReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
