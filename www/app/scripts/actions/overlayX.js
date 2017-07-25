import Actions from '../constants/reduxConstants';

/**
 * Set Video info for overlay
 *
 * @memberof Actions
 * @deprecated Using other set video info action
 * @export
 * @param {any} videoInfo
 * @returns Dispatchable Action
 */
export function setVideoInfo(videoInfo) {
    return { type: Actions.OVERLAY_X_SET_INFO, videoInfo };
}

/**
 * Action UI to minimize OverlayX
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function minimizeOverlayX() {
    return { type: Actions.OVERLAY_X_MINIMIZE };
}

/**
 * Action UI to maximize OverlayX
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function maximizeOverlayX() {
    return { type: Actions.OVERLAY_X_MAXIMIZE };
}

/**
 * Action UI to open OverlayX
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function openOverlayX() {
    return { type: Actions.OVERLAY_X_OPEN };
}

/**
 * Action UI to close OverlayX
 *
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function closeOverlayX() {
    return { type: Actions.OVERLAY_X_CLOSE };
}

/**
 * Action to set current time in overlayX
 *
 * @deprecated Possibly unneeded, this was used to try and sync two seperate video players in the past, now they are one
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function setCurrentTimeInOverlayX(newTime) {
    return { type: Actions.SET_CURRENT_TIME, time: newTime };
}

/**
 * Action to reset current time in overlayX
 *
 * @memberof Actions
 * @deprecated Probably unneeded
 * @export
 * @returns Dispatchable Action
 */
export function resetCurrentTimeInOverlayX() {
    return { type: Actions.SET_CURRENT_TIME, time: 0 };
}

