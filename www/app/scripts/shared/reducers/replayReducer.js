import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(
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
