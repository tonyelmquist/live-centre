import Actions from '../constants/reduxConstants';

export function toggleSearch(){
	return {type: Actions.TOGGLE_SEARCH};
}
export function searchKeyword(keyword){
	return {type: Actions.SEARCH_KEYWORD, keyword};
}