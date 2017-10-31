import Actions from '../constants/ActionTypes';
import { getThemeByName } from '../constants/Themes';

const initialState = getThemeByName();

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        // case Actions.CHANGE_THEME:
        //     return getThemeByName(action.data);
        case Actions.CHANGE_THEME:
            return action.data;
        default:
            return state;
    }
}
