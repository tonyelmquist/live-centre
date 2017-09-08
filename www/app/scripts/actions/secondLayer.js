 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:SecondLayer
 */

import Actions from '../constants/reduxConstants';

/**
 * Action to change the score within the score overlay
 *
 * @memberof Actions:SecondLayer
 * @export
 * @param {int} score
 * @returns Dispatchable Action
 */
export function changeScore(score) {
    return { type: Actions.CHANGE_SCORE, score };
}

/**
 * Action to change the clock within the score overlay
 *
 * @memberof Actions:SecondLayer
 * @export
 * @param {int} clock - Time in MS
 * @returns Dispatchable Action
 */
export function changeClock(clock) {
    return { type: Actions.CHANGE_CLOCK, clock };
}
