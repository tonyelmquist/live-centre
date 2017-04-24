import Actions from '../constants/reduxConstants';

export default function requestSent(state = {isFetching: false, items:[]}, action) {
    switch (action.type) {
        case Actions.FETCH_REQUEST_SENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Actions.FETCH_REQUEST_SUCCESS:
            // console.log(Object.assign({}, state, {
            //     isFetching: false,
            //     items: action.items
            // }));
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items
            });
        case Actions.FETCH_REQUEST_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
