import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';

//Array of middlewares
const middlewares = [];

//Thunk middleware
middlewares.push(thunk);
//Promise middleware
middlewares.push(promise());

if (process.env.NODE_ENV === 'development') {
//Logger middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true,
        predicate: (getState, action) => {
            action.type;
        }
    });

    middlewares.push(logger);
//Redux Immutable middleware
    middlewares.push(reduxImmutableStateInvariant());
}

const middleware = applyMiddleware(...middlewares);
//Redux Store
const store = compose(
    middleware,
    autoRehydrate()
)(createStore)(rootReducer);

//Persist Store
persistStore(store, {whitelist : ['isUserLoggedIn','lang'], });

export default store;
