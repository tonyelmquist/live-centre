import Actions from '../constants/reduxConstants';

const initialState = {
    keyword: '',
    isSearching: false,
    isOpen: false,
    isFocused: false,
};

function search(state = initialState, action) {
    switch (action.type) {
    case Actions.TOGGLE_SEARCH:
        return Object.assign({}, state, {
            isOpen: !state.isOpen,
        });
    case Actions.CLOSE_SEARCH:
        return Object.assign({}, state, {
            isOpen: false,
        });
    case Actions.SEARCH_KEYWORD:
        return Object.assign({}, state, {
            keyword: action.keyword,
            isSearching: true,
            isOpen: true,
        });
    case Actions.EMPTY_SEARCH:
        return Object.assign({}, state, {
            keyword: initialState.keyword,
            isSearching: false,
        });
    case Actions.FOCUSED_SEARCH:
        return Object.assign({}, state, {
            isFocused: true,
        });
    case Actions.BLURRED_SEARCH:
        return Object.assign({}, state, {
            isFocused: false,
        });
    default:
        return state;
    }
}

function searchFilterTab(state = 0, action) {
    switch (action.type) {
    case Actions.CHANGE_SEARCH_FILTER_INDEX: {
        return action.index;
    }
    default:
        return state;
    }
}

export { search, searchFilterTab };
