 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:Page:Sports
 */

import Actions from '../../constants/reduxConstants';

/**
 * Actiont to Change team tab on the sports page
 *
 * @memberof Actions:Page:Sports
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeTeamTabIndex(index) {
    return { type: Actions.CHANGE_TEAM_TAB_INDEX, index };
}

/**
 * Action to Change player index on the sports page
 *
 * @memberof Actions:Page:Sports
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeTeamMemberIndex(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX, index };
}

/**
 * Action to open player overlay in sports team page. Pass in player
 *
 * @memberof Actions:Page:Sports
 * @export
 * @param {any} player
 * @returns Dispatchable Action
 */
export function openTeamMemberOverlay(player) {
    return { type: Actions.OPEN_SPORT_PLAYER_OVERLAY, player };
}

/**
 * Action to close player overlay in sports team page.
 *
 * @memberof Actions:Page:Sports
 * @export
 * @param {any} player
 * @returns Dispatchable Action
 */
export function closeTeamMemberOverlay() {
    return { type: Actions.CLOSE_SPORT_PLAYER_OVERLAY };
}

/**
 * Action to close player overlay in sports team page.
 *
 * @memberof Actions:Page:Sports
 * @export
 * @param {int} id
 * @returns Dispatchable Action
 */
export function addSportVideo(sport, videoID) {
    return { type: Actions.ADD_SPORT_VIDEO, sport, videoID };
}