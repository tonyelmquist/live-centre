import axios from 'axios';
import Actions, { Orientation } from '../constants/reduxConstants';

/**
 * Action to indicate that a request has been sent to get the user details
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function fetchUserSettingsSent() {
    return { type: Actions.FETCH_USER_SETTINGS_SENT };
}

/**
 * Action to indicate success of fetch of user settings, inputs to store
 * 
 * @memberof Actions
 * @param {any} Settings User Settings
 * @export
 * @returns Dispatchable Action
 */
export function fetchUserSettingsSuccess(settings) {
    return { type: Actions.FETCH_USER_SETTINGS_SUCCESS, settings };
}

/**
 * Action to indicate that a request for user settings has failed
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function fetchUserSettingsFailed() {
    return { type: Actions.FETCH_USER_SETTINGS_FAILED };
}

/**
 * Action to indicate that a request has been sent to save the user settings
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function savingUserSettings() {
    return { type: Actions.SAVING_USER_SETTINGS };
}

/**
 * Action to indicate that user settings have been successfully saved
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function savedUserSettings() {
    return { type: Actions.SAVED_USER_SETTINGS };
}

/**
 * Action to indicate that user settings has failed
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function savingUserSettingsFailed() {
    return { type: Actions.SAVING_USER_SETTINGS_FAILED };
}

/**
 * Action to change the base language
 * 
 * @memberof Actions
 * @param {string} lang i18 Enum
 * @export
 * @returns Dispatchable Action
 */
export function changeLang(lang) {
    return { type: Actions.CHANGE_LANG, lang };
}

/**
 * Action to change the audio language
 * 
 * @memberof Actions
 * @param {string} lang i18 Enum
 * @export
 * @returns Dispatchable Action
 */
export function changeAudioLang(lang) {
    return { type: Actions.CHANGE_AUDIO_LANG, lang };
}

/**
 * Action to change the subtitle language
 * 
 * @memberof Actions
 * @param {string} lang i18 Enum
 * @export
 * @returns Dispatchable Action
 */
export function changeSubtitleLang(lang) {
    return { type: Actions.CHANGE_SUBTITLE_LANG, lang };
}

/**
 * Action to toggle the user recommendations
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function toggleRecommendations() {
    return { type: Actions.TOGGLE_RECOMMENDATIONS };
}

/**
 * Action to save the user settings, sends an AJAX call to the relevant server
 * 
 * @memberof Actions
 * @param {Settings} settings New Settings to be saved
 * @export
 * @returns Dispatchable Action
 */
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

/**
 * Action to set to portrait mode
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function setPortrait() {
    return { type: Actions.SET_ORIENTATION, orientation: Orientation.PORTRAIT };
}

/**
 * Action to set to landscape mode
 * 
 * @memberof Actions
 * @export
 * @returns Dispatchable Action
 */
export function setLandscape() {
    return { type: Actions.SET_ORIENTATION, orientation: Orientation.LANDSCAPE };
}
