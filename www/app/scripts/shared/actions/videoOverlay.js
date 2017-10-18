 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:VideoOverlay
 */

import Actions from '../constants/reduxConstants';

/**
 * Action UI to minimize VideoOverlay
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function minimizeVideoOverlay() {
    return { type: Actions.VIDEO_OVERLAY_MINIMIZE };
}

/**
 * Action UI to maximize VideoOverlay
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function maximizeVideoOverlay() {
    return { type: Actions.VIDEO_OVERLAY_MAXIMIZE };
}

/**
 * Action UI to open VideoOverlay
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function openVideoOverlay() {
    return { type: Actions.VIDEO_OVERLAY_OPEN };
}

/**
 * Action UI to close VideoOverlay
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function closeVideoOverlay() {
    return { type: Actions.VIDEO_OVERLAY_CLOSE };
}

/**
 * Action to toggle collapse in VideoOverlay collapsible
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function toggleCollapseInfo() {
    return { type: Actions.TOGGLE_COLLAPSE_INFO };
}

/**
 * Action to collapse collapseinfo in VideoOverlay
 *
 * @memberof Actions:VideoOverlay
 * @export
 * @returns Dispatchable Action
 */
export function collapseInfo() {
    return { type: Actions.COLLAPSE_INFO };
}
