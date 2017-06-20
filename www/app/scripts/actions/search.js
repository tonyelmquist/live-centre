import Actions from '../constants/reduxConstants';

export function toggleSearch(){
	return {type: Actions.TOGGLE_SEARCH};
}
export function searchKeyword(keyword){
	return {type: Actions.SEARCH_KEYWORD, keyword};
}
export function emptySearch(){
	return {type: Actions.EMPTY_SEARCH};
}
export function filterKeywords(string){
	return {type: Actions.FILTER_KEYWORDS, string}
}
export function clearFilter(){
	return {type: Actions.CLEAR_FILTER}
}
export function removeFilter(string){
	return {type: Actions.REMOVE_FILTER, string}
}