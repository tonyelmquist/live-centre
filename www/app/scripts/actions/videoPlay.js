import Actions from '../constants/reduxConstants';

export function videoSelected(url) {
    return {type: Actions.VIDEO_SELECTED, url};
}

export function invalidateVideo() {
    return {type: Actions.INVALIDATE_SELECTED};
}
