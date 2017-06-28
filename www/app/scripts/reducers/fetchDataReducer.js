import Actions from '../constants/reduxConstants';

const defaultVideosState = {
    items: [],
    failed: false,
};
const defaultSeriesState = {
    items: [],
    failed: false,
};
const defaultChannelsState = {
    items: [],
    failed: false,
};
const defaultSeasonsState = {
    items: [],
    failed: false,
};
const defaultTagsState = {
    items: [],
    failed: false,
};


function videosReducer(state = defaultVideosState, action) {
    switch (action.type) {
    case Actions.FETCH_VIDEO_SUCCESS:
        return Object.assign({}, state, {
            items: action.items,
            failed: false,
        });
    case Actions.FETCH_VIDEO_FAILED:
        return Object.assign({}, state, {
            failed: true,
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

function channelsReducer(state = defaultChannelsState, action) {
    switch (action.type) {
    case Actions.FETCH_CHANNELS_SUCCESS:
        return Object.assign({}, state, {
            items: action.items,
            failed: false,
        });
    case Actions.FETCH_CHANNELS_FAILED:
        return Object.assign({}, state, {
            failed: true,
        });
    default:
        return state;
    }
}

function seasonsReducer(state = defaultSeasonsState, action) {
    switch (action.type) {
    case Actions.FETCH_SEASONS_SUCCESS:
        return Object.assign({}, state, {
            items: action.items,
            failed: false,
        });
    case Actions.FETCH_SEASONS_FAILED:
        return Object.assign({}, state, {
            failed: true,
        });
    default:
        return state;
    }
}


function tagsReducer(state = defaultTagsState, action) {
    switch (action.type) {
    case Actions.FETCH_TAGS_SUCCESS:
        return Object.assign({}, state, {
            items: action.items,
            failed: false,
        });
    case Actions.FETCH_TAGS_FAILED:
        return Object.assign({}, state, {
            failed: true,
        });
    default:
        return state;
    }
}

export { videosReducer, seriesReducer, tagsReducer, channelsReducer, seasonsReducer };
