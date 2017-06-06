import Actions from '../constants/reduxConstants';
import {REHYDRATE} from 'redux-persist/constants';

function loginState(state = false, action) {
    switch (action.type) {
        case REHYDRATE:
            const loginState = action.payload.isUserLoggedIn;
            if (loginState) {
                return loginState;
            };
            return state;
        case Actions.LOGIN_SUCCESS:
            return true;
        case Actions.LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
}

function registrationDialog(state = false, action){
    switch (action.type) {
        case Actions.SHOW_REG_DIALOG:
            return true;
        case Actions.HIDE_REG_DIALOG:
            return false;
        default:
            return state;
    }
}

export {loginState, registrationDialog};