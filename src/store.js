import {createStore} from 'redux';
import indexReducer from './Reducers/indexReducer.js';

let store = createStore(indexReducer);

export default store;
