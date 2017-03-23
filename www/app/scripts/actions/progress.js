import { ReduxConstants } from '../constants';

export function resetProgress() {
    return {
        type: ReduxConstants.RESET_INPROGRESS
    };
}

// Stores progress, and result of a rest event
// The key can either be a constant or an item's id (e.g deviceId)
//
// Examples of use
//
// setInProgress(LOGIN_PROGRESS_KEY, inProgress, isSuccess)
// setInProgress(deviceId, inProgress, isSuccess)
//
// The data parameter is optional, and used to store failed data.
// Success data should be stored in the data reducer as this progress
// one is NOT persisted.

export function setInProgress(key, inProgress, isSuccess, data) {
    return {
        type: ReduxConstants.INPROGRESS,
        payload: {
            key: key,
            inProgress: inProgress,
            isSuccess: isSuccess,
            data: data
        }
    };
}

