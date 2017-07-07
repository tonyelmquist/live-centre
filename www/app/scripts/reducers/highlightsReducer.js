import Actions from '../constants/reduxConstants';

export default function dataOverlayReducer(
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
