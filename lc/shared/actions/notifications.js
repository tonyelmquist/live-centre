/**
 * NOT AN ACTUAL CLASS
 * @class Actions:Notifications
 */

import Actions from '../constants/reduxConstants';

/**
 *
 * Adds a new pop notificaiton to the store
 *
 * @export
 * @param {int} id
 * @param {string} message
 * @param {int} minutes
 * @param {int} start
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function newPopNotification(id, message, minutes, start) {
    return { type: Actions.ADD_NEW_POP_NOTIFICATION, id, message, minutes, start };
}

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
export function newNotification(message, seconds, notificationType) {
    return { type: Actions.ADD_NEW_NOTIFICATION, message, seconds, notificationType };
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
 * Removes notifications from store
 *
 * @export
 * @param {array} notifications
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function removePopNotification(id) {
    return { type: Actions.REMOVE_POP_NOTIFICATION, id };
}

/**
 *
 * Removes notificaiton to the store
 *
 * @export
 * @param {int} id
 * @param {string} message
 * @param {int} minutes
 * @param {int} start
 * @memberof Actions:Notifications
 * @returns Dispatchable Action
 */
export function removeNotification(id) {
    return { type: Actions.REMOVE_NOTIFICATION, id };
}
