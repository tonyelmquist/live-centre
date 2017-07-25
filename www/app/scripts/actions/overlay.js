import Actions from '../constants/reduxConstants';

/**
 * Action to show overlay
 * 
 * @memberof Actions
 * @deprecated Replaced with Overlay X
 * @export
 * @returns Dispatchable Action
 */
export function showOverlay() {
    return { type: Actions.SHOW_OVERLAY };
}

/**
 * Action to hide overlay
 * 
 * @memberof Actions
 * @deprecated Replaced with Overlay X
 * @export
 * @returns Dispatchable Action
 */
export function hideOverlay() {
    return { type: Actions.HIDE_OVERLAY };
}
