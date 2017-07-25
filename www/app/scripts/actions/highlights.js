import Actions from '../constants/reduxConstants';

/**
 * Action to control UI of showing highlights within full screen video playing mode
 *
 * @memberof Actions
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
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function hideHighlights() {
    return { type: Actions.HIDE_HIGHLIGHTS };
}
