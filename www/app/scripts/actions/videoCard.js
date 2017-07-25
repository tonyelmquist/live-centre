import Actions from '../constants/reduxConstants';

/**
 * Action to change the video card for the video card
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeCardIndex(index) {
    return { type: Actions.CHANGE_CARD_INDEX, index };
}

/**
 * Action to show the video card
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function showVideoCard() {
    return { type: Actions.SHOW_VIDEO_CARD };
}

/**
 * Action to hide the video card
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function hideVideoCard() {
    return { type: Actions.HIDE_VIDEO_CARD };
}

/**
 * Action to change the card category
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeCardCategory(category) {
    return { type: Actions.CHANGE_CARD_CATEGORY, category };
}

/**
 * Action to change the video info
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeVideoInfo(video) {
    return { type: Actions.CHANGE_VIDEO_INFO, video };
}
