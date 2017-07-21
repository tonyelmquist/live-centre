import Actions from '../constants/reduxConstants';

export function changeTeamTabIndex(index) {
    return { type: Actions.CHANGE_TEAM_TAB_INDEX, index };
}

export function changePlayerIndex(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX, index };
}

export function changePlayerIndexTab(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX_TAB, index };
}
