import Actions from '../constants/reduxConstants';

const defaultVideosState = {
    items : [],
    failed: false,
    videosFetched: 0,
};
const defaultSeriesState = {
    items : {},
    failed: false,
    seriesFetched: 0,
};
const defaultTagsState = {
    items : {},
    failed: false,
};
const defaultSeasonState = {
    items: {},
    failed: false,
};

function videosReducer(state = defaultVideosState, action) {
    switch (action.type) {
        case Actions.FETCH_VIDEO_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                items: {
                    ...state.items,
                    [action.video.id]: action.video,
                },
                failed: false,
                videosFetched: state.videosFetched + 1,
                lastVideo: action.video.id,
            });
        case Actions.FETCH_VIDEOS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                items: {...state.items,
                        ...action.videogroup
                },
                failed: false,
                videosFetched: state.videosFetched + action.length,
                
            });
        case Actions.FETCH_VIDEO_FAILED:
            return Object.assign({}, state, {
                failed: true
            });
        default:
            return state;
    }
}


function seriesReducer(state = defaultSeriesState, action) {
    switch (action.type) {
    case Actions.FETCH_SERIES_SUCCESS:
        return Object.assign({}, state, {
            items: action.items,
            failed: false,
        });
    case Actions.FETCH_SERIES_FAILED:
        return Object.assign({}, state, {
            failed: true,
        });
    default:
        return state;
    }
}

function seasonReducer(state = defaultSeasonState, action) {

    switch (action.type) {
        case Actions.FETCH_SERIES_SUCCESS:
            return Object.assign({}, state, {
                items: action.items,
                failed: false
            });
        case Actions.FETCH_SERIES_FAILED:
            return Object.assign({}, state, {
                failed: true
            });
        default:
            return state;
    }
}

function tagsReducer(state = defaultTagsState, action){
    switch(action.type){
        case Actions.FETCH_TAGS_SUCCESS:
            return Object.assign({}, state,{
                items: {...state.items, ...action.items},
                failed: false
            });
        case Actions.FETCH_TAGS_FAILED:
            return Object.assign({}, state,{
                failed: true
            });
        default:
            return state;
    }
}

export { videosReducer, seriesReducer, tagsReducer, seasonReducer };

