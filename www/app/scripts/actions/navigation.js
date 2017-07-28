 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:Navigation
 */

import Actions from '../constants/reduxConstants';

/** HAMBURGER MENU ACTIONS */

/**
 * Action to toggle the hamburger menu
 *
 * @memberof Actions:Navigation
 * @export
 * @returns Dispatchable Action
 */
export function toggleMenu() {
    return { type: Actions.MENU_TOGGLE };
}

/**
 * Action to show the hamburger menu
 *
 * @memberof Actions:Navigation
 * @export
 * @returns Dispatchable Action
 */
export function showMenu() {
    return { type: Actions.MENU_SHOW };
}

/**
 * Action to hide the hamburger menu
 *
 * @memberof Actions:Navigation
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
 * @memberof Actions:Navigation
 * @export
 * @returns Dispatchable Action
 */
export function toggleDrawerMenu() {
    return { type: Actions.DRAWER_MENU_TOGGLE };
}

/**
 * Action to open drawer menu - not currently in use (drawer menu is a left-slide-out menu)
 *
 * @memberof Actions:Navigation
 * @export
 * @returns Dispatchable Action
 */
export function openDrawerMenu() {
    return { type: Actions.DRAWER_MENU_SHOW };
}

/**
 * Action to close drawer menu - Not currently in use but could be used in future
 *
 * @memberof Actions:Navigation
 * @export
 * @returns Dispatchable Action
 */
export function closeDrawerMenu() {
    return { type: Actions.DRAWER_MENU_HIDE };
}

/**
 * Action to toggle the menu
 *
 * @memberof Actions:Navigation
 * @deprecated Not currently used in version, also replicated
 * @param {any} index Index to chang nav menu
 * @export
 * @returns Dispatchable Action
 */
export function changeNavMenuIndex(index) {
    return { type: Actions.CHANGE_NAV_INDEX, index };
}

/**
 * ACTION to reveal bottom navigation menu
 *
 * @memberof Actions:Navigation
 * @deprecated - Possible unused in current version
 * @returns Dispatchable action
 */
export function showNavBottom() {
    return { type: Actions.BOTTOM_NAV_SHOW };
}

/**
 * ACTION to hide bottom navigation menu
 *
 * @memberof Actions:Navigation
 * @deprecated - Possibly unused in current version
 * @returns Dispatchable action
 */
export function hideNavBottom() {
    return { type: Actions.BOTTOM_NAV_HIDE };
}