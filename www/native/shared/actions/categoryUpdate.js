import Actions from '../constants/ActionTypes';

// Categories
export function categoryUpdateSuccess(data) {
    return { type: Actions.CATEGORIES_UPDATE_SUCCESS, data };
}
export function categoryUpdateFailed() {
    return { type: Actions.CATEGORIES_UPDATE_FAILED };
}
