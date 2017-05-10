import Actions from '../constants/reduxConstants';

export function getMessage(message) {
    return {type: Actions.GET_MESSAGE, message};
}

export function sendMessage(message) {
    return {type: Actions.SEND_MESSAGE, message};
}