import Actions from '../constants/reduxConstants';

export default function requestSent(state = {isSelected: false, url:""}, action) {
    switch (action.type) {
        case Actions.VIDEO_SELECTED:
            return Object.assign({}, state, {
                isSelected: true,
                url: action.url
            });

        case Actions.INVALIDATE_SELECTED:
            return Object.assign({}, state, {
                isSelected: false,
                url: ""
            });
        default:
            return state;
    }
}
