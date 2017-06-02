import Actions from '../constants/reduxConstants';

const initialState = {
    keyword: "",
    isSearching: false,
    isOpen: false,
};

function search(state=initialState, action){
    switch(action.type) {
        case Actions.TOGGLE_SEARCH:
            return Object.assign({}, state,{
            isOpen: !state.isOpen,
        });
        case Actions.SEARCH_KEYWORD:
            return Object.assign({}, state,{
            keyword: action.keyword,
            isSearching: true,
            isOpen: true,
        });
        default:
            return state;
    }
}

export {search};

