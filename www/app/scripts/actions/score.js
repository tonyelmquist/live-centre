import Actions from '../constants/reduxConstants';

export default function changeScore(score) {
    return { type: Actions.CHANGE_SCORE, score };
}
