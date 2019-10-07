import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import todoReducer from './todo.store.js';
import itemReducer from './item.store.js';

let reducers = combineReducers({
  todo: todoReducer,
  item: itemReducer,
});

const store = () => createStore(reducers, composeWithDevTools());
export default store;
