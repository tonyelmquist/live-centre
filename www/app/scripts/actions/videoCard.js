import Actions from '../constants/reduxConstants';

export function changeCardIndex(index) {
    return {type: Actions.CHANGE_CARD_INDEX, index};
}

export function showVideoCard() {
    return {type: Actions.SHOW_VIDEO_CARD};
}

export function hideVideoCard(index) {
    return {type: Actions.HIDE_VIDEO_CARD};
}
