/**
 * NOT AN ACTUAL CLASS
 * @class Actions:Notifications
 */

import Actions from '../constants/reduxConstants';

/**
 * 
 * Adds a new notificaiton to the store
 * 
 * @export
 * @param {int} id
 * @param {string} message 
 * @param {int} minutes 
 * @param {int} start 
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function newNotification(id, message, minutes, start) {
    return { type: Actions.ADD_NEW_NOTIFICATION, id, message, minutes, start };
}

/**
 * 
 * Rehydrates notifications from socket server
 * 
 * @export
 * @param {array} notifications
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function rehydrateNotifications(notifications) {
    return { type: Actions.REHYDRATE_NOTIFICATIONS, notifications };
}

/**
 * 
 * Rehydrates notifications from socket server
 * 
 * @export
 * @param {array} notifications
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function removeNotification(id) {
    return { type: Actions.REMOVE_NOTIFICATION, id };
}