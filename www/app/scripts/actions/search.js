import Actions from '../constants/reduxConstants';

export function toggleSearch() {
    return { type: Actions.TOGGLE_SEARCH };
}
export function closeSearch() {
    return { type: Actions.CLOSE_SEARCH };
}
export function searchKeyword(keyword) {
    return { type: Actions.SEARCH_KEYWORD, keyword };
}
export function emptySearch() {
    return { type: Actions.EMPTY_SEARCH };
}

export function changeSearchFilterIndex(index) {
    return { type: Actions.CHANGE_SEARCH_FILTER_INDEX, index};
}
