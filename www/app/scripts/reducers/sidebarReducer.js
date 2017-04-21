import Actions from '../constants/reduxConstants';

export default function sidebarState(state = false, action) {
    switch (action.type) {
        case Actions.SIDEBAR_SHOW:
            return true;
        case Actions.SIDEBAR_HIDE:
            return false;
        default:
            return state;
    }
}
