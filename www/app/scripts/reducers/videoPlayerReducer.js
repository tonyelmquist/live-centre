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

export function handleSelection(state = { isSelected: false, video: {}, isFullscreen: false, currentTime: 0 }, action) {
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
    case Actions.SET_CURRENT_TIME:
        return Object.assign({}, state, {
            currentTime: action.time,
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
