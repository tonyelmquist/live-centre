import { applyMiddleware, createStore } from 'redux';
// import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import promise from 'redux-promise-middleware';
// import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
// Actions
// import { REHYDRATE } from 'redux-persist/constants';
// Array of middlewares
// console.disableYellowBox = true;
const middlewares = [];

// Thunk middleware
middlewares.push(thunk);
// Promise middleware
middlewares.push(promise());

if (process.env.NODE_ENV !== 'production') {
    // Logger middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true,
        // Disable Logging of Navigation Actions
        predicate: (getState, action) => action.type !== 'Navigation/NAVIGATE'
    });
    middlewares.push(logger);
    // Redux Immutable middleware
    middlewares.push(reduxImmutableStateInvariant());
}

// // Redux Store
// const store=compose(applyMiddleware(...middlewares), autoRehydrate())(createStore)(rootReducer);
//
// // Persist Store
// persistStore(store, { whitelist: ['isUserLoggedIn', 'settings'], keyPrefix: 'state_' });
const store = createStore(reducers, {}, applyMiddleware(...middlewares));
// const store=createStore(reducers,{},compose(applyMiddleware(...middlewares), autoRehydrate()));

// persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;
