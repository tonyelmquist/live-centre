import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(state = { score: { home: 0, away: 0 } }, action) {
    switch (action.type) {
    case Actions.CHANGE_SCORE:
        return {
            ...state,
            score: action.score,
        };
    default:
        return state;
    }
}
