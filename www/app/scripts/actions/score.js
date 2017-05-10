import Actions from '../constants/reduxConstants';

export function changeScore(score) {
    return {type: Actions.CHANGE_SCORE, score};
}