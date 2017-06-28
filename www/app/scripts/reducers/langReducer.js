import Actions from '../constants/reduxConstants';
import { REHYDRATE } from 'redux-persist/constants';

export default function langReducer(state = 'en', action) {
    switch (action.type) {
    case REHYDRATE:
        const persistedLang = action.payload.lang;
        if (persistedLang) {
            return persistedLang;
        }
        return state;
    case Actions.CHANGE_LANG:
        return action.lang;
    default:
        return state;
    }
}
