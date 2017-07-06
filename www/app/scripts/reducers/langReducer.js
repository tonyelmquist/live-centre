import { REHYDRATE } from 'redux-persist/constants';
import Actions from '../constants/reduxConstants';

export default function langReducer(state = 'en', action) {
    const persistedLang = action.payload.lang;
    switch (action.type) {
    case REHYDRATE:
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
