import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducer';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];
const Store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware),
);

export default Store;
