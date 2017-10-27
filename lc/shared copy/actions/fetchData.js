import Actions from '../constants/ActionTypes';

// Videos
export function fetchVideosSuccess(data) {
    return { type: Actions.FETCH_VIDEOS_SUCCESS, data };
}
export function fetchVideoSuccess(data) {
    return { type: Actions.FETCH_VIDEO_SUCCESS, data };
}
export function fetchVideoFailed() {
    return { type: Actions.FETCH_VIDEO_FAILED };
}
