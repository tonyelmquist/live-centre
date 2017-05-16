import Actions from '../constants/reduxConstants';

export function toggleMenu() {
    return {type: Actions.MENU_TOGGLE};
}
export function showMenu() {
    return {type: Actions.MENU_SHOW};
}
export function hideMenu() {
    return {type: Actions.MENU_HIDE};
}

export function changeNavMenuIndex(index) {
    return {type: Actions.CHANGE_NAV_INDEX, index};
}

