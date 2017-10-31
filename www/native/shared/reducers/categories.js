import Actions from '../constants/ActionTypes';

export default function updateCategories(state = {}, action) {
    switch (action.type) {
        case Actions.CATEGORIES_UPDATE_SUCCESS:
            return action.data;
        case Actions.CATEGORIES_UPDATE_FAILED:
            return state;
        default:
            return state;
    }
}
