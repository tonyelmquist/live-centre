import Actions from '../constants/reduxConstants';
export function showSidebar() {
    return {type: Actions.SIDEBAR_SHOW};
}

export function hideSidebar() {
    return {type: Actions.SIDEBAR_HIDE};
}
