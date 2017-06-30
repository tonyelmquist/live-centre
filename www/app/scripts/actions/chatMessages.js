import Actions from '../constants/reduxConstants';
import io from 'socket.io-client';

export function getMessage(user, message) {
    return { type: Actions.GET_MESSAGE, user, message };
}

export function sendMessage(user, message) {
    const socket = io('localhost:3000');
    console.log('Socket emitted');
    socket.emit("SENT_MESSAGE", {
        user,
        message,
    });
    return { type: Actions.SEND_MESSAGE, user, message };
}

export function toggleChatMenu() {
    return { type: Actions.TOGGLE_CHAT_MENU };
}
