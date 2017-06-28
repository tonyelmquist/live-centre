import Actions from '../constants/reduxConstants';

export function loginSuccess() {
    return { type: Actions.LOGIN_SUCCESS };
}

export function loginFailed() {
    return { type: Actions.LOGIN_FAILED };
}

export function logoutSuccess() {
    return { type: Actions.LOGOUT_SUCCESS };
}

export function showRegistration() {
    return { type: Actions.SHOW_REG_DIALOG };
}

export function hideRegistration() {
    return { type: Actions.HIDE_REG_DIALOG };
}
