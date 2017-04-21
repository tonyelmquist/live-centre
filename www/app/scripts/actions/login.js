import Actions from '../constants/reduxConstants';

export function loginSuccess() {
    return {type: Actions.LOGIN_SUCCESS};
}

export function loginFailed() {
    return {type: Actions.LOGIN_FAILED};
}

export function logoutSuccess() {
    return {type: Actions.LOGOUT_SUCCESS};
}
