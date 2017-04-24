import Actions from '../constants/reduxConstants';

export function videoSelected() {
    return {type: Actions.FETCH_VIDEO_REQ_SENT};
}

export function videoFetchSuccess(url) {
    return {type: Actions.FETCH_VIDEO_SUCCESS, url};
}

export function videoFetchFailed() {
    return {type: Actions.FETCH_VIDEO_FAILED};
}

export function invalidateVideo() {
    return {type: Actions.INVALIDATE_VIDEO};
}
