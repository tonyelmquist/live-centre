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

function drawerMenuState(state = false, action) {
    switch (action.type) {
    case Actions.DRAWER_MENU_TOGGLE:
        return !state;
    case Actions.DRAWER_MENU_SHOW:
        return true;
    case Actions.DRAWER_MENU_HIDE:
        return false;
    default:
        return state;
    }
}

const defaultPageTabIndex = {
    past: [],
    present: 0,
};

function pageTabIndex(state = defaultPageTabIndex, action) {
    switch (action.type) {
    case Actions.CHANGE_PAGE_TAB_INDEX:
        return {
            past: [...state.past, state.present],
            present: action.tabIndex,
        };
    case Actions.REMOVE_PAGE_TAB_INDEX:
        return { past: [], present: 0 };
    case Actions.PAGE_TAB_GO_BACK:
        return {
            past: state.past.slice(0, state.past.length - 1),
            present: state.past[state.past.length - 1],
        };
    default:
        return state;
    }
}

export { changeNavIndex, headerMenuState, drawerMenuState, pageTabIndex };

