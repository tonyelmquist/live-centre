import Actions from '../constants/reduxConstants';

export default function requestSent(state = {isSelected: true, isFetching: false, url:""}, action) {
    switch (action.type) {
        case Actions.FETCH_VIDEO_REQ_SENT:
            return Object.assign({}, state, {
                isSelected: true,
                isFetching: true
            });
        case Actions.FETCH_VIDEO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                url: action.url
            });
        case Actions.INVALIDATE_SELECTED:
            return Object.assign({}, state, {
                isSelected: false,
                isFetching: false,
                url: ""
            });
        default:
            return state;
    }
}
