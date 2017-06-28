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

export function clearFilter() {
    return { type: Actions.CLEAR_FILTERS };
}

export function toggleFilter(filterkey) {
    return { type: Actions.TOGGLE_FILTER, filterkey };
}
