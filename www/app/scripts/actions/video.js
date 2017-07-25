import Actions from '../constants/reduxConstants';


/**
 * Sets the currently selected video for use within the video player
 *
 * @memberof Actions
 * @param {Video} video - The selected video (in class format)
 * @returns Dispatchable Action
 */
export function videoSelected(video) {
    return { type: Actions.VIDEO_SELECTED, video };
}


/**
 * Invalidates the currently selected video, if any
 *
 * @memberof Actions
 * @returns Dispatchable Action
 */
export function invalidateSelected() {
    return { type: Actions.INVALIDATE_SELECTED };
}


/**
 * Sets to fullscreen mode - Possibly depricated
 *
 * @memberof Actions
 * @deprecated Possibly unused in current version
 * @returns Dispatchable Action
 */
export function fullScreenMode() {
    return { type: Actions.ENTER_FULL_SCREEN };
}

/**
 * Unsets fullscreen mode - Possibly depricated
 *
 * @memberof Actions
 * @deprecated Possibly unused in current version
 * @returns Dispatchable Action
 */
export function exitFullScreenMode() {
    return { type: Actions.EXIT_FULL_SCREEN };
}
