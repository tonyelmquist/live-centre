import Actions from '../constants/reduxConstants';

const defaultRequestState = {
    isFetching: false,
    items: {},
    categories: [],
};
export default function requestSent(state = defaultRequestState, action) {
    switch (action.type) {
    case Actions.FETCH_METADATA_SENT:
        return Object.assign({}, state, {
            isFetching: true,
        });
    case Actions.FETCH_METADATA_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.items,
        });
    case Actions.FETCH_METADATA_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
        });
    case Actions.FETCH_CATEGORIES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            categories: action.categories,
        });
    default:
        return state;
    }
}

export function highlightsReducer(
    state = { highlightsOpen: false, videoUrl: '', highlights: {} },
    action,
) {
    switch (action.type) {
    case Actions.SHOW_HIGHLIGHTS:
        return {
            ...state,
            highlightsOpen: true,
            videoUrl: action.videoUrl,
            highlights: action.highlights,
        };
    case Actions.HIDE_HIGHLIGHTS:
        return {
            ...state,
            highlightsOpen: false,
            videoUrl: '',
            highlights: {},
        };
    default:
        return state;
    }
}

const defaultSelectionState = {
    isSelected: false,
    video: {},
    isFullscreen: false,
    currentTime: 0,
    controlBarVisibility: false,
    isVideoSettingsOpen: false,
};

export function handleSelection(state = defaultSelectionState, action) {
    const newVideo = Object.assign(Object.create(Object.getPrototypeOf(state.video)), state.video);


    switch (action.type) {
    case Actions.VIDEO_SELECTED:
        return Object.assign({}, state, {
            isSelected: true,
            video: action.video,
        });
    case Actions.INVALIDATE_SELECTED:
        return Object.assign({}, state, {
            isSelected: false,
            video: '',
        });
    case Actions.ENTER_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullscreen: true,
        });
    case Actions.EXIT_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullscreen: false,
        });

    // case Actions.SET_CURRENT_TIME:
    //     return Object.assign({}, state, {
    //         currentTime: action.time,
    //     });

    case Actions.SET_CONTROL_BAR_VISIBILITY:
        return Object.assign({}, state, {
            controlBarVisibility: action.visibility,
        });
    case Actions.SET_VIDEO_SETTINGS_OPEN:
        return Object.assign({}, state, {
            isVideoSettingsOpen: action.isOpen,
        });
    case Actions.MARK_SELECTED_AS_WISHLIST:
        newVideo.wishlist = action.wishlisted;
        return Object.assign({}, state, {
            video: newVideo,
        });

    default:
        return state;
    }
}

export function replayReducer(
    state = { replayerOpen: false, videoUrl: '', timestamp: 0 },
    action,
) {
    switch (action.type) {
    case Actions.SHOW_REPLAY:
        return {
            ...state,
            replayerOpen: true,
            videoUrl: action.videoUrl,
            timestamp: action.timestamp,
        };
    case Actions.HIDE_REPLAY:
        return {
            ...state,
            replayerOpen: false,
            videoUrl: '',
            timestamp: 0,
        };
    default:
        return state;
    }
}

export function videoPlayer(state = { isPlaying: false, isWaiting: false, bufferTime: null, duration: 0, changeCurrentTimeTo: null, currentVideoTime: 0, dimensions: {} }, action) {
    switch (action.type) {
    case Actions.PLAY_VIDEO:
        return {
            ...state,
            isPlaying: true,
        };
    case Actions.PAUSE_VIDEO:
        return {
            ...state,
            isPlaying: false,
        };
    case Actions.SET_DURATION:
        return {
            ...state,
            duration: action.time,
        };
    case Actions.UPDATE_CURRENT_TIME:
        return {
            ...state,
            currentVideoTime: action.time,
            changeCurrentTimeTo: null,
        };
    case Actions.CHANGE_CURRENT_TIME:
        return {
            ...state,
            changeCurrentTimeTo: action.time,
        };
    case Actions.SET_BUFFER_TIME:
        return {
            ...state,
            bufferTime: action.time,
        };
    case Actions.SET_VIDEO_DIMENSIONS:
        return {
            ...state,
            dimensions: action.dimensions,
        };
    case Actions.VIDEO_IS_WAITING:
        return {
            ...state,
            isWaiting: true,
        };
    case Actions.VIDEO_IS_READY:
        return {
            ...state,
            isWaiting: false,
        };
    default:
        return state;
    }
}

const defaultVideoSettings = {
    showTickers: false,
};

export function videoSettings(state = defaultVideoSettings, action) {
    switch (action.type) {
    case Actions.TOGGLE_TICKERS:
        return {
            showTickers: !state.showTickers,
        };
    default:
        return state;
    }
}
