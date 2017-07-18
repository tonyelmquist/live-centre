import io from 'socket.io-client';
import Actions from '../constants/reduxConstants';

export function getMessage(id, user, message) {
    return { type: Actions.GET_MESSAGE, id, user, message };
}

export function sendMessage(user, message) {
    const socket = io('localhost:3000');
    console.log('Socket emitted');
    socket.emit('SENT_MESSAGE', {
        user,
        message,
    });
    return { type: Actions.SEND_MESSAGE, user, message };
}

export function toggleChatMenu() {
    return { type: Actions.TOGGLE_CHAT_MENU };
}
