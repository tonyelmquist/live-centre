import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(state = '', action) {
    switch (action.type) {
    case Actions.CHANGE_SCORE:
        return action.score;
    default:
        return state;
    }
}
