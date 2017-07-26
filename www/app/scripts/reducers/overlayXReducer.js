import Actions from '../constants/reduxConstants';

const defaultState = {
    info: {},
    open: false,
    maximized: true,
    collapsedInfo: true,
}

export default function overlayX(state = defaultState, action) {
    switch (action.type) {
    case Actions.OVERLAY_X_OPEN:
        return Object.assign({}, state, {
            open: true,
        });
    case Actions.OVERLAY_X_CLOSE:
        return Object.assign({}, state, {
            open: false,
        });
    case Actions.OVERLAY_X_MINIMIZE:
        return Object.assign({}, state, {
            maximized: false,
        });
    case Actions.OVERLAY_X_MAXIMIZE:
        return Object.assign({}, state, {
            maximized: true,
        });
    case Actions.OVERLAY_X_SET_INFO:
        return Object.assign({}, state, {
            info: action.videoInfo
        })
    case Actions.TOGGLE_COLLAPSE_INFO:
        return Object.assign({}, state, {
            collapsedInfo: !state.collapsedInfo
        });
    case Actions.COLLAPSE_INFO:
        return Object.assign({}, state, {
            collapsedInfo: true,
        });
    default:
        return state;
    }
}