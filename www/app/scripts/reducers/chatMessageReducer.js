import Actions from '../constants/reduxConstants';

export function sendClientMessage(state = '', action) {
    switch (action.type) {
        case Actions.SEND_MESSAGE:
            return action.message;
        default:
            return state;
    }
}

export function getServerMessage(state = '', action) {
    switch (action.type) {
        case Actions.GET_MESSAGE:
            return action.message;
        default:
            return state;
    }
}