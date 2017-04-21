import Actions from '../constants/reduxConstants';

export function showBottomNav(state = false, action) {
    switch (action.type) {
        case Actions.BOTTOM_NAV_SHOW:
            return true;
        case Actions.BOTTOM_NAV_HIDE:
            return false;
        default:
            return state;
    }
}

export function changeNavIndex(state = 0, action){
    switch (action.type) {
        case Actions.CHANGE_NAV_INDEX:
            return action.index;
        default:
            return state;
    }
}
