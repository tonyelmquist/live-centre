import Actions from '../constants/reduxConstants';

export default function notificationReducer(state = { notifications: [] }, action) {
    switch (action.type) {
    case Actions.ADD_NEW_NOTIFICATION:
        return {
            ...state,
            notifications: [
                ...state.notifications,
                {
                    id: action.id,
                    message: action.message,
                    minutes: action.minutes,
                    start: action.start,
                },
            ],
        };
    case Actions.REMOVE_NOTIFICATION:
        console.log('removing notification', action.id);
        return Object.assign({}, state, {
            notifications: state.notifications.filter(item => action.id !== item.id),
        });
    case Actions.REHYDRATE_NOTIFICATIONS:
        return Object.assign({}, state, {
            notifications: action.notifications,
        });
    default:
        return state;
    }
}
