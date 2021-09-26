import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import Thunk from 'redux-thunk';

const Store = createStore(rootReducer, applyMiddleware(Thunk));
export default Store;