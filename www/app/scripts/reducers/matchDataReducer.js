import Actions from '../constants/reduxConstants';

export default function matchDataReducer(state = {}, action) {
    switch (action.type) {
    case Actions.INSERT_MATCH_DATA:
        return {
            ...state,
            [action.id]: action.data,
        };
    default:
        return state;
    }
}
