import Actions from '../constants/reduxConstants';

export default function langReducer(state = 'en', action) {
    switch (action.type) {
        case Actions.CHANGE_LANG:
            return action.lang;
        default:
            return state;
    }
}
