import Actions from '../constants/reduxConstants';

export function popNotificationReducer(state = [], action) {
    switch (action.type) {
    case Actions.ADD_NEW_POP_NOTIFICATION:
        console.log(action);
        return [
            ...state,
            {
                id: action.id,
                message: action.message,
                minutes: action.minutes,
                start: action.start,
            },
        ];
    case Actions.REMOVE_POP_NOTIFICATION:
        return state.filter(item => action.id !== item.id);
    case Actions.REHYDRATE_POP_NOTIFICATIONS:
        return action.popNotifications;
    default:
        return state;
    }
}

let notificationId = 0;

export function notificationReducer(state = [], action) {
    notificationId += 1;
    switch (action.type) {
    case Actions.ADD_NEW_NOTIFICATION:
        return [
            ...state,
            {
                id: notificationId,
                message: action.message,
                seconds: action.seconds,
                start: new Date().getTime(),
                type: action.notificationType,
            },
        ];
    case Actions.REMOVE_NOTIFICATION:
        return state.filter(item => action.id !== item.id);
    default:
        return state;
    }
}
