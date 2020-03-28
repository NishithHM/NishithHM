import {combineReducers} from 'redux';

const allReducers = combineReducers({

});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
