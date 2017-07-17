import Actions from '../constants/reduxConstants';

export function changeProgramTabIndex(index) {
    return { type: Actions.CHANGE_PROGRAMS_TAB_INDEX, index };
}
