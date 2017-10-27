 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:Modals
 */

import Actions from '../constants/reduxConstants';

/**
 * Action to show the login Modal
 *
 * @memberof Actions:Modals
 * @export
 * @returns Dispatchable Action
 */
export function showLoginModal(isOpen) { // eslint-disable-line import/prefer-default-export
    return { type: Actions.SHOW_LOGIN_MODAL, isOpen };
}
