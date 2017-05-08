import Actions from '../constants/reduxConstants';

function loginState(state = false, action) {
    switch (action.type) {
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
