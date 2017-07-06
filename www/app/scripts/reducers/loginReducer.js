import { REHYDRATE } from 'redux-persist/constants';
import Actions from '../constants/reduxConstants';

function loginState(state = false, action) {
    let lState = false;
    if (typeof action.payload !== 'undefined') {
        lState = action.payload.isUserLoggedIn;
    }
    switch (action.type) {
    case REHYDRATE:
        if (lState) {
            return lState;
        }
        return state;
    case Actions.LOGIN_SUCCESS:
        return true;
    case Actions.LOGOUT_SUCCESS:
        return false;
    default:
        return state;
    }
}

function registrationDialog(state = false, action) {
    switch (action.type) {
    case Actions.SHOW_REG_DIALOG:
        return true;
    case Actions.HIDE_REG_DIALOG:
        return false;
    default:
        return state;
    }
}

export { loginState, registrationDialog };
