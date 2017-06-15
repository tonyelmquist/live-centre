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
        case Actions.CHANGE_CARD_INDEX:
            return action.index;
        default:
            return state;
    }
}

export function changeCardCategory(state = '', action){
    switch (action.type) {
        case Actions.CHANGE_CARD_CATEGORY:
            return action.category;
        default:
            return state;
    }
}

export function changeVideoInfo(state = '', action){
    switch (action.type) {
        case Actions.CHANGE_VIDEO_INFO:
            return action.url;
        default:
            return state;
    }
}
