/**
 * NOT AN ACTUAL CLASS, Used to group actions in documentation
 *
 * @class Actions
 */
import Actions from '../constants/reduxConstants';

/**
 * ACTION to reveal bottom navigation menu
 *
 * @memberof Actions
 * @deprecated - Possible unused in current version
 * @returns Dispatchable action
 */
export function showNavBottom() {
    return { type: Actions.BOTTOM_NAV_SHOW };
}

/**
 * ACTION to hide bottom navigation menu
 *
 * @memberof Actions
 * @deprecated - Possibly unused in current version
 * @returns Dispatchable action
 */
export function hideNavBottom() {
    return { type: Actions.BOTTOM_NAV_HIDE };
}

/**
 * ACTION to change navigation menu index
 *
 * @memberof Actions
 * @deprecated Possibly unused AND replicated in another file
 * @param {any} index
 * @returns Dispatchable action
 */
export function changeNavMenuIndex(index) {
    return { type: Actions.CHANGE_NAV_INDEX, index };
}
