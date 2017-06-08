import Actions from '../constants/reduxConstants';

export default function handleSelection(state = {isSelected: false, url:"", isFullscreen: false}, action) {
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
        case Actions.ENTER_FULL_SCREEN:
            return Object.assign({}, state, {
                isFullscreen: true
            });
        case Actions.EXIT_FULL_SCREEN:
            return Object.assign({}, state, {
                isFullscreen: false
            });
        default:
            return state;
    }
}
