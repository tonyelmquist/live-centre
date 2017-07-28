 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:OverlayX
 */

import Actions from '../constants/reduxConstants';

/**
 * Action UI to minimize OverlayX
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function minimizeOverlayX() {
    return { type: Actions.OVERLAY_X_MINIMIZE };
}

/**
 * Action UI to maximize OverlayX
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function maximizeOverlayX() {
    return { type: Actions.OVERLAY_X_MAXIMIZE };
}

/**
 * Action UI to open OverlayX
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function openOverlayX() {
    return { type: Actions.OVERLAY_X_OPEN };
}

/**
 * Action UI to close OverlayX
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function closeOverlayX() {
    return { type: Actions.OVERLAY_X_CLOSE };
}

/**
 * Action to toggle collapse in overlayX collapsible
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function toggleCollapseInfo(){
    return {type: Actions.TOGGLE_COLLAPSE_INFO}
}

/**
 * Action to collapse collapseinfo in overlayX
 *
 * @memberof Actions:OverlayX
 * @export
 * @returns Dispatchable Action
 */
export function collapseInfo(){
    return {type: Actions.COLLAPSE_INFO}
}