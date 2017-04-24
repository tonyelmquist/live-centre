import Actions from '../constants/reduxConstants';

export default function requestSent(state = {isFetching: false, items:[]}, action) {
    switch (action.type) {
        case Actions.FETCH_METADATA_SENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.FETCH_METADATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items
            });
        case Actions.FETCH_METADATA_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
