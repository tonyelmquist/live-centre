import Actions from '../constants/reduxConstants';
export function showNavBottom() {
    return {type: Actions.BOTTOM_NAV_SHOW};
}

export function hideNavBottom() {
    return {type: Actions.BOTTOM_NAV_HIDE};
}

export function changeNavMenuIndex(index) {
    return {type: Actions.CHANGE_NAV_INDEX, index};
}
