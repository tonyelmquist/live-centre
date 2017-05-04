import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import socketMiddleware from '../middleware/socketMiddleware';

export default createStore(rootReducer, applyMiddleware(socketMiddleware))

