import Actions from '../constants/reduxConstants';

export function fetchRequestSent() {
    return {type: Actions.FETCH_REQUEST_SENT};
}

export function fetchRequestFailed() {
    return {type: Actions.FETCH_REQUEST_FAILED};
}

export function fetchRequestSuccess(items) {
    return {type: Actions.FETCH_REQUEST_SUCCESS, items};
}
