 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:VideoPlayer
 */

import Actions from '../constants/reduxConstants';

/**
 * Sets the currently selected video for use within the video player
 *
 * @memberof Actions:VideoPlayer
 * @param {Video} video - The selected video (in class format)
 * @returns Dispatchable Action
 */
export function videoSelected(video) {
    return { type: Actions.VIDEO_SELECTED, video };
}


/**
 * Invalidates the currently selected video, if any
 *
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function invalidateSelected() {
    return { type: Actions.INVALIDATE_SELECTED };
}


/**
 * Sets to fullscreen mode - Possibly depricated
 *
 * @memberof Actions:VideoPlayer
 * @deprecated Possibly unused in current version
 * @returns Dispatchable Action
 */
export function fullScreenMode() {
    return { type: Actions.ENTER_FULL_SCREEN };
}

/**
 * Unsets fullscreen mode - Possibly depricated
 *
 * @memberof Actions:VideoPlayer
 * @deprecated Possibly unused in current version
 * @returns Dispatchable Action
 */
export function exitFullScreenMode() {
    return { type: Actions.EXIT_FULL_SCREEN };
}

/**
 * Marks a video as wishlisted (saved for later)
 *
 * @memberof Actions:VideoPlayer
 * @param {int} videoId
 * @returns Dispatchable Action
 */
export function markAsWishlist(videoId, wishlisted) {
    return { type: Actions.MARK_AS_WISHLIST, videoId, wishlisted };
}

/**
 * Marks a video as wishlisted (saved for later)
 *
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function markSelectedAsWishlist(wishlisted) {
    return { type: Actions.MARK_SELECTED_AS_WISHLIST, wishlisted };
}

// /**
//  * Action to set current time in overlayX
//  *
//  * @deprecated Possibly unneeded, this was used to try and sync two seperate video players in the past, now they are one
//  * @memberof Actions:VideoPlayer
//  * @export
//  * @returns Dispatchable Action
//  */
// export function setCurrentTimeInPlayer(newTime) {
//     return { type: Actions.SET_CURRENT_TIME, time: newTime };
// }

/**
 * Action to reset current time in overlayX
 *
 * @memberof Actions:VideoPlayer
 * @export
 * @returns Dispatchable Action
 */
export function resetCurrentTimeInPlayer() {
    return { type: Actions.SET_CURRENT_TIME, time: 0 };
}

/**
 * Action to control UI of showing highlights within full screen video playing mode
 *
 * @memberof Actions:VideoPlayer
 * @export
 * @param {any} videoUrl - Video URL
 * @param {any} highlights - Highlights to show
 * @returns Dispatchable Action
 */
export function showHighlights(videoUrl, highlights) {
    return { type: Actions.SHOW_HIGHLIGHTS,
        videoUrl,
        highlights };
}

/**
 * Action to control UI to hide the highlights within full screen video playing mode
 *
 * @memberof Actions:VideoPlayer
 * @export
 * @returns Dispatchable Action
 */
export function hideHighlights() {
    return { type: Actions.HIDE_HIGHLIGHTS };
}

/**
 * Action to show replays on fullscreen video mode
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {any} videoUrl
 * @param {any} timestamp
 * @returns Dispatchable Action
 */
export function showReplay(videoUrl, timestamp) {
    return { type: Actions.SHOW_REPLAY,
        videoUrl,
        timestamp };
}

/**
 * Action to hide replays on fullscreen video mode
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function hideReplay() {
    return { type: Actions.HIDE_REPLAY };
}

/**
 * Set Control Bar visibility (doesn't effect the actual control bar of the player, only replicates, check Player.js)
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {bool} visibility - Visibility to set of control bar
 * @returns Dispatchable Action
 */
export function setControlBarVisibility(visibility) {
    return { type: Actions.SET_CONTROL_BAR_VISIBILITY, visibility };
}

/**
 * Opens and closes video settings overlay
 *
 * @export
 * @param {bool} isOpen
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function isVideoSettingsOpen(isOpen) {
    return { type: Actions.SET_VIDEO_SETTINGS_OPEN, isOpen };
}

/**
 * Action to show an ecommerce overlay
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function showProductOverlay(productID) {
    return { type: Actions.SHOW_PRODUCT_OVERLAY, productID };
}

/**
 * Action to hide an ecommerce overlay
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function hideProductOverlay() {
    return { type: Actions.HIDE_PRODUCT_OVERLAY };
}

/**
 * Action to show an ecommerce overlay
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function showProductThumb(productID) {
    return { type: Actions.SHOW_PRODUCT_THUMB, productID };
}

/**
 * Action to hide an ecommerce overlay
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function hideProductThumb(productID) {
    return { type: Actions.HIDE_PRODUCT_THUMB, productID };
}

/**
 * Action to play the open video
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function playVideo() {
    return { type: Actions.PLAY_VIDEO };
}

/**
 * Action to pause the open or closed video
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function pauseVideo() {
    return { type: Actions.PAUSE_VIDEO };
}

/**
 * Action to set total duration for the video playing
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {int} time - Duration of video
 * @returns Dispatchable Action
 */
export function setDuration(time) {
    return { type: Actions.SET_DURATION, time };
}

/**
 * Action to update the store with the videos current time played.
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {int} time - current time of video
 * @returns Dispatchable Action
 */
export function updateCurrentTime(time) {
    return { type: Actions.UPDATE_CURRENT_TIME, time };
}

/**
 * Action to tell what we want the current time to be changed to.
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {int} time - time we want to change to
 * @returns Dispatchable Action
 */
export function changeCurrentTime(time) {
    return { type: Actions.CHANGE_CURRENT_TIME, time };
}

/**
 * Action to skip current time by. 
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @param {int} skipBy - time we want to skip by
 * @returns Dispatchable Action
 */
export function skipCurrentTimeBy(skipBy) {
    return { type: Actions.SKIP_CURRENT_TIME_BY, skipBy };
}

/**
 * Action to reset all time variables.
 *
 * @export
 * @memberof Actions:VideoPlayer
 * @returns Dispatchable Action
 */
export function resetCurrentTime() {
    return { type: Actions.RESET_CURRENT_TIME };
}
