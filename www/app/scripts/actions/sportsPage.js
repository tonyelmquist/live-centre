import Actions from '../constants/reduxConstants';

export function changeActiveTeamIndex(index) {
    return { type: Actions.CHANGE_ACTIVE_TEAM_INDEX, index };
}

export function changePlayerIndex(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX, index };
}

export function changePlayerIndexTab(index) {
    return { type: Actions.CHANGE_PLAYER_INDEX_TAB, index };
}
