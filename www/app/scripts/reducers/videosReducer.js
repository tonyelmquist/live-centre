import Actions from '../constants/reduxConstants';

export default function requestSent(state = {isFetching: false, items:[], categories:[]}, action) {
    
        switch (action.type) {


        case Actions.FETCH_METADATA_SENT:
            return Object.assign({}, state, {
                isFetching: true
            });
            // return state.isFetching = true;// DON'T!! for immutability test
        case Actions.FETCH_METADATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items
            });
        case Actions.FETCH_METADATA_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            });
        case Actions.FETCH_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                categories:action.categories
            });
        case Actions.FETCH_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                featured:action.featured
            });
        default:
            return state;
    }
}
