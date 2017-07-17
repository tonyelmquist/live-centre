import Actions from '../constants/reduxConstants';

export default function programsPageTab(state = 0, action) {
    switch (action.type) {
    case Actions.CHANGE_PROGRAMS_TAB_INDEX: {
        return action.index;
    }
    default:
        return state;
    }
}

