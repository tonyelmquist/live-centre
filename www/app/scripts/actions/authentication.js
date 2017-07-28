 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:Authentication
 */

import Actions from '../constants/reduxConstants';

/**
 * Action to indicate Login Success
 *
 * @memberof Actions:Authentication
 * @export
 * @returns Dispatchable Action
 */
export function loginSuccess() {
    return { type: Actions.LOGIN_SUCCESS };
}

/**
 * Action to indicate Login Failure
 *
 * @memberof Actions:Authentication
 * @export
 * @returns Dispatchable Action
 */
export function loginFailed() {
    return { type: Actions.LOGIN_FAILED };
}

/**
 * Action to indicate Logout Success
 *
 * @memberof Actions:Authentication
 * @export
 * @returns Dispatchable Action
 */
export function logoutSuccess() {
    return { type: Actions.LOGOUT_SUCCESS };
}

/**
 * Action UI to show registration form
 *
 * @memberof Actions:Authentication
 * @export
 * @returns Dispatchable Action
 */
export function showRegistration() {
    return { type: Actions.SHOW_REG_DIALOG };
}

/**
 * Action UI to hide registration form
 *
 * @memberof Actions:Authentication
 * @export
 * @returns Dispatchable Action
 */
export function hideRegistration() {
    return { type: Actions.HIDE_REG_DIALOG };
}
