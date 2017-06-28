import Actions from '../constants/reduxConstants';

export function videoSelected(url) {
    return { type: Actions.VIDEO_SELECTED, url };
}

export function invalidateSelected() {
    return { type: Actions.INVALIDATE_SELECTED };
}

export function fullScreenMode() {
    return { type: Actions.ENTER_FULL_SCREEN };
}

export function exitFullScreenMode() {
    return { type: Actions.EXIT_FULL_SCREEN };
}
