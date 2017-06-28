import Actions from '../constants/reduxConstants';

const initialState = {
    keyword: '',
    isSearching: false,
    isOpen: false,
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
    default:
        return state;
    }
}

// set translations in translation.
// keys for object and key value MUST match
const filters = {
    all: { active: true, key: 'all', clear: true, filterOn: 'all' },
    videos: { active: false, key: 'videos', filterOn: 'videos' },
    series: { active: false, key: 'series', filterOn: 'series' },
    lostintime: { active: false, key: 'lostintime', filterOn: 'lost in time' },
    streetfighter: { active: false, key: 'streetfighter', filterOn: 'street fighter' },
    thefuturegroup: { active: false, key: 'thefuturegroup', filterOn: 'the future group' },
    iceage: { active: false, key: 'iceage', filterOn: 'ice age' },
    jurasicage: { active: false, key: 'jurasicage', filterOn: 'jurasic age' },
    medieval: { active: false, key: 'medieval', filterOn: 'medieval' },
    wildwest: { active: false, key: 'wildwest', filterOn: 'wild west' },
    roaringtwenties: { active: false, key: 'roaringtwenties', filterOn: 'roaring twenties' },
    spaceage: { active: false, key: 'spaceage', filterOn: 'space age' },
};

const initialfilterstate = {
    filters,
    isClear: true,
};


// Copy the initial filterstate  so we can revert back to it later on CLEAR_FILTERS.
function filter(state = initialfilterstate, action) {
    switch (action.type) {
    case Actions.TOGGLE_FILTER:

        const updatedFilters = Object.assign({}, state.filters, {
            ...state.filters,
            [action.filterkey]: {
                ...state.filters[action.filterkey],
                active: !state.filters[action.filterkey].active,
            },
        });

            // after updating the state, check if the filters are cleared...
        let isCleared = true;
        for (const key in updatedFilters) {
            if (updatedFilters[key].active) {
                isCleared = false;
                break;
            }
        }

            // ...Set the clear button accordingly and state
        return Object.assign({}, updatedFilters, {
            filters: {
                ...updatedFilters,
                all: {
                    ...state.filters.all,
                    active: isCleared,
                },
            },
            isClear: isCleared,
        });


    case Actions.CLEAR_FILTERS:

            // New copy of state.filters, map keys to k
            // Set all items unactive,
            //! except for the item with the clear key (filters[key].clear),which is the reset button.
        const newFilters = Object.assign({}, ...Object.keys(state.filters).map(key => ({
            [key]: {
                ...state.filters[key],
                active: !!state.filters[key].clear,
            },
        }),
            ));

        return Object.assign({}, state, {
            filters: {
                ...newFilters,
            },
            isClear: true,
        });


    default:
        return state;
    }
}

export { search, filter };
