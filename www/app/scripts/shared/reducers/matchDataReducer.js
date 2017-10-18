import { REHYDRATE } from 'redux-persist/constants';
import Match from '../classes/match';
import Actions from '../constants/reduxConstants';

export default function matchDataReducer(state = {}, action) {
    let matchesPayload = {};
    // Setup REHYDRATE
    if (typeof action.payload !== 'undefined' && typeof action.payload.sportsInfo !== 'undefined') {
        matchesPayload = action.payload.sportsInfo.matches;
        for (const iKey of Object.keys(matchesPayload)) {
            for (const rKey of Object.keys(matchesPayload[iKey])) {
                matchesPayload[iKey][rKey.split('_')[1]] = matchesPayload[iKey][rKey];
            }
            matchesPayload[iKey] = new Match(matchesPayload[iKey]);
        }
    }
    switch (action.type) {
    case REHYDRATE:
        if (typeof action.playload !== 'undefined') {
            return matchesPayload;
        }
        return state;
    case Actions.INSERT_MATCH_DATA:
        return {
            ...state,
            [action.id]: action.data,
        };
    default:
        return state;
    }
}
