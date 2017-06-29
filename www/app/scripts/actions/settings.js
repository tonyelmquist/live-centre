// import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import Actions from '../constants/reduxConstants';


export function fetchUserSettingsSent() {
    return { type: Actions.FETCH_USER_SETTINGS_SENT };
}

export function fetchUserSettingsSuccess(settings) {
    return { type: Actions.FETCH_USER_SETTINGS_SUCCESS, settings };
}

export function fetchUserSettingsFailed() {
    return { type: Actions.FETCH_USER_SETTINGS_FAILED };
}

export function savingUserSettings() {
    return { type: Actions.SAVING_USER_SETTINGS };
}

export function savedUserSettings() {
    return { type: Actions.SAVED_USER_SETTINGS };
}

export function savingUserSettingsFailed() {
    return { type: Actions.SAVING_USER_SETTINGS_FAILED };
}

export function changeLang(lang) {
    return { type: Actions.CHANGE_LANG, lang };
}

export function changeAudioLang(lang) {
    return { type: Actions.CHANGE_AUDIO_LANG, lang };
}

export function changeSubtitleLang(lang) {
    return { type: Actions.CHANGE_SUBTITLE_LANG, lang };
}

export function toggleRecommendations() {
    return { type: Actions.TOGGLE_RECOMMENDATIONS };
}

export function saveUserSettings(settings) {
    return (dispatch) => {
        dispatch(savingUserSettings());
        // const promise =
        axios({
            method: 'post',
            url: 'http://ec2-35-158-87-9.eu-central-1.compute.amazonaws.com/user',
            headers: {
                Authorization: 'Basic mcAPI2o17-H35t-password',
            },
            data: settings.toJson(),

        }).then(() => {
            dispatch(savedUserSettings());
        }).catch(() => {
            dispatch(savingUserSettingsFailed());
        });
    };
}
