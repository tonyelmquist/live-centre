import Actions from '../constants/reduxConstants';

/**
 * Action to show replays on fullscreen video mode
 *
 * @export
 * @memberof Actions
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
 * @memberof Actions
 * @returns Dispatchable Action
 */
export function hideReplay() {
    return { type: Actions.HIDE_REPLAY };
}
