import Actions from '../constants/reduxConstants';

/**
 * Actiont to Change team tab on the sports page
 *
 * @memberof Actions
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
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changePlayerIndex(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX, index };
}

/**
 * Actiont o change player index tab on the sports page
 *
 * @memberof Actions
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changePlayerIndexTab(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX_TAB, index };
}
