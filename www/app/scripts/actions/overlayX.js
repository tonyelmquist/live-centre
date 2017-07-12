import Actions from '../constants/reduxConstants';

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

