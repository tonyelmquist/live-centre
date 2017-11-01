import Actions from '../constants/ActionTypes';

export function connectionState(status) {
    return { type: Actions.CONNECTION_STATUS_CHANGE, data: status };
}

export function orientationState(mode) {
    return { type: Actions.ORIENTATION_CHANGE, data: mode };
}

export function immersiveState(isImmersive) {
    return { type: Actions.IMMERSIVE_MODE_CHANGE, data: isImmersive };
}

export function statusBarState(isHidden) {
    return { type: Actions.STATUSBAR_STATE_CHANGE, data: isHidden };
}

export function dimensions() {
    return { type: Actions.DIMENSIONS_CHANGE };
}

export function appState(state) {
    return { type: Actions.APP_STATE_CHANGE, data: state };
}
