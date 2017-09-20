import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(state = { score: { home: 0, away: 0 }, clock: 0, }, action) {
    switch (action.type) {
    case Actions.CHANGE_SCORE:
        return {
            ...state,
            score: action.score,
        };
    case Actions.CHANGE_CLOCK:
        return {
            ...state,
            clock: action.clock,
        };
    default:
        return state;
    }
}