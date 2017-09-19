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

/**
 * ACTION change current page's tabindex
 *
 * @memberof Actions:Navigation
 * @returns Dispatchable action
 */
export function changePageTabIndex(tabIndex) {
    return { type: Actions.CHANGE_PAGE_TAB_INDEX, tabIndex };
}

/**
 * ACTION to remove page tab index
 *
 * @memberof Actions:Navigation
 * @returns Dispatchable action
 */
export function removePageTabIndex() {
    return { type: Actions.REMOVE_PAGE_TAB_INDEX };
}

/**
 * ACTION to go back in page tab history.
 *
 * @memberof Actions:Navigation
 * @returns Dispatchable action
 */
export function pageTabGoBack() {
    return { type: Actions.PAGE_TAB_GO_BACK };
}

/**
 * ACTION to go back in page tab history.
 *
 * @memberof Actions:Navigation
 * @returns Dispatchable action
 */
export function switchShade(onoff) {
    return { type: Actions.SWITCH_SHADE, onoff };
}

/**
 * ACTION to go back in page tab history.
 *
 * @memberof Actions:Navigation
 * @returns Dispatchable action
 */
export function switchUserMenu(onoff) {
    return { type: Actions.SWITCH_USER_MENU, onoff };
}

export function resumeApp() {
    return { type: Actions.RESUME_APP };
}

export function pauseApp() {
    return { type: Actions.PAUSE_APP };
}
