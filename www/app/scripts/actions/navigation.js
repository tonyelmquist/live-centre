import Actions from '../constants/reduxConstants';

/** HAMBURGER MENU ACTIONS */

/**
 * Action to toggle the hamburger menu
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function toggleMenu() {
    return { type: Actions.MENU_TOGGLE };
}

/**
 * Action to show the hamburger menu
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function showMenu() {
    return { type: Actions.MENU_SHOW };
}

/**
 * Action to hide the hamburger menu
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function hideMenu() {
    return { type: Actions.MENU_HIDE };
}

/** DRAWER MENU ACTIONS */

/**
 * Action to toggle the drawer menu - not currently in use
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function toggleDrawerMenu() {
    return { type: Actions.DRAWER_MENU_TOGGLE };
}

/**
 * Action to open drawer menu - not currently in use (drawer menu is a left-slide-out menu)
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function openDrawerMenu() {
    return { type: Actions.DRAWER_MENU_SHOW };
}

/**
 * Action to close drawer menu - Not currently in use but could be used in future
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function closeDrawerMenu() {
    return { type: Actions.DRAWER_MENU_HIDE };
}

/**
 * Action to toggle the menu
 *
 * @memberof Actions
 * @deprecated Not currently used in version, also replicated
 * @param {any} index Index to chang nav menu
 * @export
 * @returns Dispatchable Action
 */
export function changeNavMenuIndex(index) {
    return { type: Actions.CHANGE_NAV_INDEX, index };
}

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
