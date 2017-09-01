import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';
// Actions
// import { REHYDRATE } from 'redux-persist/constants';
// Array of middlewares
const middlewares = [];

// Thunk middleware
middlewares.push(thunk);
// Promise middleware
middlewares.push(promise());

if (process.env.NODE_ENV === 'development') {
// Logger middleware
    const logger = createLogger({
        level: 'log',
        collapsed: true,
        // Filter What to LOG by returning true/false in the method below
        // predicate: (getState, action) => action.type === REHYDRATE
    });
    middlewares.push(logger);
// Redux Immutable middleware
    middlewares.push(reduxImmutableStateInvariant());
}

// Redux Store
const store = compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
)(createStore)(rootReducer);
// const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];
// const store = createStore(rootReducer, loadState(), compose(...enhancers));


// Persist Store
persistStore(store, { whitelist: ['sportsInfo'], keyPrefix: 'state_' });

export default store;

// const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('stateisUserLoggedIn');
//         if (serializedState === null ){
//             return undefined;
//         }
//         return ({isUserLoggedIn: JSON.parse(serializedState)});
//     } catch(err){
//         return undefined;
//     }
// };
