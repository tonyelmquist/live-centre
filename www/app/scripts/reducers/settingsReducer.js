import Actions from '../constants/reduxConstants';
import Settings from '../classes/settings';
import {REHYDRATE} from 'redux-persist/constants';

const defaultSettings = new Settings({
    language:'en',
    subtitleLanguage:'en',
    audioLanguage:'en',
    recommendations:false
});

export default function settings(state = {options: defaultSettings, saving: false} , action) {

    // Create a clone of the current Settings class object
    const newSettings = Object.assign( {}, state.options );
    Object.setPrototypeOf( newSettings, Settings.prototype );

    switch (action.type) {
        //Inital Fetch request
        case Actions.FETCH_USER_SETTINGS_SUCCESS:
            return Object.assign({}, state, {
                options: action.settings
            });

        //Saving User Settings
        case Actions.SAVING_USER_SETTINGS:
            return Object.assign({}, state, {
                saving: 'saving'
            });

        //Saving User Settings SUCCESS
        case Actions.SAVED_USER_SETTINGS:
            return Object.assign({}, state, {
                saving: 'saved'
            });

        //Saving User Settings FAILED
        case Actions.SAVING_USER_SETTINGS_FAILED:
            return Object.assign({}, state, {
                saving: 'failed'
            });

        // Change Language
        case Actions.CHANGE_LANG:
            newSettings.language = action.lang;

            return Object.assign({}, state, {
                options: newSettings
            });

        // Change Audio Language
        case Actions.CHANGE_AUDIO_LANG:
            newSettings.audioLanguage = action.lang;

            return Object.assign({}, state, {
                options: newSettings
            });

        // Change Subtitle Language
        case Actions.CHANGE_SUBTITLE_LANG:
            newSettings.subtitleLanguage = action.lang;

            return Object.assign({}, state, {
                options: newSettings
            });

        // Toggle Recommendations
        case Actions.TOGGLE_RECOMMENDATIONS:
            newSettings.toggleRecommendations();

            return Object.assign({}, state, {
                options: newSettings
            });

        // Default
        default:
            return state;
    }
}
