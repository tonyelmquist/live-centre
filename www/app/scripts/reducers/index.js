import { combineReducers } from 'redux';

import data from './data';
import progress from './progress';

// combineReducers(reducers): http://rackt.github.io/redux/docs/api/combineReducers.html
const rootReducer = combineReducers({
    rest: data,
    progress
});

export default rootReducer;

