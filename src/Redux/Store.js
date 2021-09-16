import { applyMiddleware, createStore } from 'redux';
import Reducer from './Reducer';
import Thunk from 'redux-thunk';

const Store = createStore(Reducer, applyMiddleware(Thunk));
export default Store;