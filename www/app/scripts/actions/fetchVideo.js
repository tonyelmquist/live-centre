import Actions from '../constants/reduxConstants';

export function fetchMetadataSent() {
    return {type: Actions.FETCH_METADATA_SENT};
}

export function fetchMetadataFailed() {
    return {type: Actions.FETCH_METADATA_FAILED};
}

export function fetchMetadataSuccess(items) {
    return {type: Actions.FETCH_METADATA_SUCCESS, items};
}

export function videoFetch() {
    return {type: Actions.FETCH_VIDEO_REQ_SENT};
}

export function videoFetchSuccess(url) {
    return {type: Actions.FETCH_VIDEO_SUCCESS, url};
}
