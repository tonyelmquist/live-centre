import Actions from '../constants/reduxConstants';

export default function requestSent(state = false, action) {
    switch (action.type) {
    case Actions.SHOW_OVERLAY:
        return true;
    case Actions.HIDE_OVERLAY:
        return false;
    default:
        return state;
    }
}
