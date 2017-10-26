import Actions from '../constants/ActionTypes';

export default function registrationDialog(state = [], action) {
    switch (action.type) {
        case Actions.FETCH_VIDEOS_SUCCESS:
            return action.data;
        case Actions.FETCH_VIDEO_FAILED:
            return state;
        default:
            return state;
    }
}
