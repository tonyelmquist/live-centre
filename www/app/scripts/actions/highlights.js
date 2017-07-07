import Actions from '../constants/reduxConstants';

export function showHighlights(videoUrl, highlights) {
    return { type: Actions.SHOW_HIGHLIGHTS,
        videoUrl,
        highlights };
}

export function hideHighlights() {
    return { type: Actions.HIDE_HIGHLIGHTS };
}
