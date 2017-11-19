import {createStore,applyMiddleware} from 'redux';
import indexReducer from './Reducers/indexReducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
let store = createStore(indexReducer,applyMiddleware(thunk,logger));

export default store;
