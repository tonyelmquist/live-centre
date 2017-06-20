import Actions from '../constants/reduxConstants.js';

export function changeLang(lang) {
    return {type: Actions.CHANGE_LANG, lang};
}

export function changeAudioLang(lang) {
    return {type: Actions.CHANGE_AUDIO_LANG, lang};
}

export function changeSubtitleLang(lang) {
    return {type: Actions.CHANGE_SUBTITLE_LANG, lang};
}

export function toggleRecommendations() {
    return { type: Actions.TOGGLE_RECOMMENDATIONS };
}
