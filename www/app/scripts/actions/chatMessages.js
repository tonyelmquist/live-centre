 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:ChatMessages
 */

/** Chat Messages Actions */
import io from 'socket.io-client';
import Actions from '../constants/reduxConstants';

/**
 * ACTION to happen when a user gets a NEW_MESSAGE from Web Sockets.
 *
 * @memberof Actions:ChatMessages
 * @param {int} id of message
 * @param {string} username of message
 * @param {string} content of message
 * @returns Dispatchable Action
 */
export function getMessage(id, user, message) {
    return { type: Actions.GET_MESSAGE, id, user, message };
}

/**
 * ACTION to happen when a user sends a new message through Web Sockets
 *
 * @export
 * @memberof Actions:ChatMessages
 * @param {string} user
 * @param {string} message
 * @returns Dispatchable Action
 */
const socket = io('http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com:3000/');
export function sendMessage(message) {
    socket.emit('SENT_MESSAGE', {
        socketId: socket.id,
        message,
    });
    return { type: Actions.SEND_MESSAGE, message };
}

/**
 * ACTION to control UI opening and closing of Chat Menu
 *
 * @export
 * @memberof Actions:ChatMessages
 * @returns Dispatchable Action
 */
export function toggleChatMenu() {
    return { type: Actions.TOGGLE_CHAT_MENU };
}
