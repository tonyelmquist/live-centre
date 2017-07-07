import Actions from '../constants/reduxConstants';

export function showReplay(videoUrl, timestamp) {
    return { type: Actions.SHOW_REPLAY,
        videoUrl,
        timestamp };
}

export function hideReplay() {
    return { type: Actions.HIDE_REPLAY };
}
