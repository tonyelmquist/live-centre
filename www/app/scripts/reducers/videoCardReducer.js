import Actions from '../constants/reduxConstants';

export function showVideoCard(state = false, action) {
    switch (action.type) {
        case Actions.SHOW_VIDEO_CARD:
            return true;
        case Actions.HIDE_VIDEO_CARD:
            return false;
        default:
            return state;
    }
}

export function changeCardIndex(state = 0, action){
    switch (action.type) {
        case Actions.CHANGE_NAV_INDEX:
            return action.index;
        default:
            return state;
    }
}
