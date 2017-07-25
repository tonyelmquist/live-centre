import Actions from '../constants/reduxConstants';

/**
 * Action to change the score (done usually through Web Sockets)
 * 
 * @memberof Actions
 * @export
 * @param {int} score 
 * @returns Dispatchable Action 
 */
export default function changeScore(score) {
    return { type: Actions.CHANGE_SCORE, score };
}
