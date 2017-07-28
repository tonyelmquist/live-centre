import { REHYDRATE } from 'redux-persist/constants';
import Actions from '../constants/reduxConstants';
import Settings from '../classes/settings';

const defaultSettings = new Settings({
    language: 'en',
    subtitleLanguage: 'en',
    audioLanguage: 'en',
    recommendations: false,
});

export default function settings(state = { options: defaultSettings, saving: false, screenOrientation: '' }, action) {
    // Create a clone of the current Settings class object
    const newSettings = Object.assign({}, state.options);
    Object.setPrototypeOf(newSettings, Settings.prototype);

    let settingsPayload = {};
    if (typeof action.payload !== 'undefined') {
        settingsPayload = action.payload.isUserLoggedIn;
    }

    switch (action.type) {
    // case REHYDRATE:
    //     if (settings) {
    //         return settingsPayload;
    //     }
    //     return state;

        // Inital Fetch request
    case Actions.FETCH_USER_SETTINGS_SUCCESS:
        return Object.assign({}, state, {
            options: action.settings,
        });

        // Saving User Settings
    case Actions.SAVING_USER_SETTINGS:
        return Object.assign({}, state, {
            saving: 'saving',
        });

        // Saving User Settings SUCCESS
    case Actions.SAVED_USER_SETTINGS:
        return Object.assign({}, state, {
            saving: 'saved',
        });

        // Saving User Settings FAILED
    case Actions.SAVING_USER_SETTINGS_FAILED:
        return Object.assign({}, state, {
            saving: 'failed',
        });

        // Change Language
    case Actions.CHANGE_LANG:
        newSettings.language = action.lang;

        return Object.assign({}, state, {
            options: newSettings,
        });

        // Change Audio Language
    case Actions.CHANGE_AUDIO_LANG:
        newSettings.audioLanguage = action.lang;

        return Object.assign({}, state, {
            options: newSettings,
        });

        // Change Subtitle Language
    case Actions.CHANGE_SUBTITLE_LANG:
        newSettings.subtitleLanguage = action.lang;

        return Object.assign({}, state, {
            options: newSettings,
        });

        // Toggle Recommendations
    case Actions.TOGGLE_RECOMMENDATIONS:
        newSettings.toggleRecommendations();

        return Object.assign({}, state, {
            options: newSettings,
        });

        // Default
    case Actions.SET_ORIENTATION:
        return Object.assign({}, state, {
            screenOrientation: action.orientation
        })
    default:
        return state;
    }
}

export function langReducer(state = 'en', action) {
    let persistedLang = '';
    if (typeof action.payload !== 'undefined') {
        persistedLang = action.payload.lang;
    }
    switch (action.type) {
    case REHYDRATE:
        if (persistedLang) {
            return persistedLang;
        }
        return state;
    case Actions.CHANGE_LANG:
        return action.lang;
    default:
        return state;
    }
}
