import Actions from '../constants/reduxConstants';

/**
 * Action to toggle search dropdown
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function toggleSearch() {
    return { type: Actions.TOGGLE_SEARCH };
}

/**
 * Action to close search dropdown
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function closeSearch() {
    return { type: Actions.CLOSE_SEARCH };
}

/**
 * Action to set search keyword
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function searchKeyword(keyword) {
    return { type: Actions.SEARCH_KEYWORD, keyword };
}

/**
 * Action to empty the search dropdown
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function emptySearch() {
    return { type: Actions.EMPTY_SEARCH };
}

/**
 * Action to change the search filter index position
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function changeSearchFilterIndex(index) {
    return { type: Actions.CHANGE_SEARCH_FILTER_INDEX, index};
}
