import Actions from '../constants/ActionTypes';

// Videos
export function changeTheme(data) {
    return { type: Actions.CHANGE_THEME, data };
}

export default changeTheme;
