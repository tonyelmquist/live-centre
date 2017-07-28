 /**
 * NOT AN ACTUAL CLASS, JUST USED TO ORGANISE THINGS
 *
 * @class Actions:Page:Programs
 */

import Actions from '../../constants/reduxConstants';

/**
 * Action to change program tab index
 *
 * @memberof Actions:Page:Programs
 * @export
 * @param {any} index
 * @returns Dispatchable Action
 */
export function changeProgramTabIndex(index) {
    return { type: Actions.CHANGE_PROGRAMS_TAB_INDEX, index };
}
