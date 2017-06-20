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
        case Actions.EMPTY_SEARCH:
            return Object.assign({}, state,{
                keyword: initialState.keyword,
                isSearching: false,
            });
        default:
            return state;
    }
};


/*
const filters = {
    all: {active: true, key:"all"},
    videos: {key:"videos"},
    series: {key:"series"},
    channels: {key:"channels"},
    uncategorized: {key:"uncategorized"},
    '-1': {key:"-1"},
    NEP: {key:"NEP"},
};*/
/*

const initialFilterState = {
    filters : filters,
    isClear : true,
};*/

/*const filters = [
        {key: "all", clear: true,  active: true },
        {key: "videos",},
        {key: "series",  },
        {key: "channels",  },
        {key: "uncategorized",  },
        {key: "-1",  },
        {key: "lost in time",  },
        {key: "the future group",  },
        {key: "NEP",  },
        {key: "test",  },
    ];


function filter(state=filters, action){
    switch(action.type){
        case Actions.FILTER_KEYWORDS:
            return state.map(filter => {
                if(filter.key == action.string){
                    return {
                        ...filter,
                        active: true
                    }
                    
                } else {
                    return filter;
                };
            });
        default: 
            return state;
    }    
};*/



const initialFilterState = {
    filters : ["jhest","videos"],
    isClear : true,
};

function filter(state=initialFilterState, action){
    switch(action.type){
        case Actions.FILTER_KEYWORDS:
            return Object.assign({}, state,{
                filters: [...state.filters, action.string],
                isClear: false,
            });
        case Actions.CLEAR_FILTER:
            return Object.assign({}, state,{
                filters: [],
                isClear: true,
            });
        case Actions.REMOVE_FILTER: 
            return Object.assign({}, {
                filters: state.filters.filter(item => item !== action.string),
                isClear: state.filters.length>1 ? false : true
            });
        default:
            return state;
    }
};

export {search, filter};

