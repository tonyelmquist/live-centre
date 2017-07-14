import Actions from '../constants/reduxConstants';

export function setVideoInfo(videoInfo) {
    return { type: Actions.OVERLAY_X_SET_INFO, videoInfo };
}

export function minimizeOverlayX() {
    return { type: Actions.OVERLAY_X_MINIMIZE };
}

export function maximizeOverlayX() {
    return { type: Actions.OVERLAY_X_MAXIMIZE };
}

export function openOverlayX() {
    return { type: Actions.OVERLAY_X_OPEN };
}

export function closeOverlayX() {
    return { type: Actions.OVERLAY_X_CLOSE };
}

export function setCurrentTimeInOverlayX(newTime) {
    return { type: Actions.SET_CURRENT_TIME, time: newTime };
}

export function resetCurrentTimeInOverlayX() {
    return { type: Actions.SET_CURRENT_TIME, time: 0 };
}


