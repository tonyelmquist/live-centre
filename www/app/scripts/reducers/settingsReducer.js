import Actions from '../constants/reduxConstants';
import {REHYDRATE} from 'redux-persist/constants';

export default function settings(state = {lang: 'en', audioLang: 'en', subtitleLang: 'en', recommendations: true} , action) {
    switch (action.type) {
        case Actions.CHANGE_LANG:
            return Object.assign({}, state, {
                lang: action.lang
            });
        case Actions.CHANGE_AUDIO_LANG:
            return Object.assign({}, state, {
                audioLang: action.lang
            });
        case Actions.CHANGE_SUBTITLE_LANG:
            return Object.assign({}, state, {
                subtitleLang: action.lang
            });
        case Actions.TOGGLE_RECOMMENDATIONS:
            return Object.assign({}, state, {
                recommendations: !state.recommendations
            });
        default:
            return state;
    }
}
