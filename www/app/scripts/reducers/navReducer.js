import Actions from '../constants/reduxConstants';

function changeNavIndex(state = 0, action) {
    switch (action.type) {
    case Actions.CHANGE_NAV_INDEX:
        return action.index;
    default:
        return state;
    }
}

function headerMenuState(state = false, action) {
    switch (action.type) {
    case Actions.MENU_TOGGLE:
        return !state;
    case Actions.MENU_SHOW:
        return true;
    case Actions.MENU_HIDE:
        return false;
    default:
        return state;
    }
}

export { changeNavIndex, headerMenuState };

