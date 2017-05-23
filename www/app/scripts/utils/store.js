import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export default createStore(rootReducer);
