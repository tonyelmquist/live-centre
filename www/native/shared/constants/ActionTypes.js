export default class ActionTypes {
    // Login Actions
    static get LOGIN_SUCCESS() {
        return 'LOGIN_SUCCESS';
    }
    static get LOGIN_FAILED() {
        return 'LOGIN_FAILED';
    }
    static get LOGOUT_SUCCESS() {
        return 'LOGOUT_SUCCESS';
    }
    // VIDEOS FETCH
    static get FETCH_VIDEO_SUCCESS() {
        return 'FETCH_VIDEO_SUCCESS';
    }
    static get FETCH_VIDEO_FAILED() {
        return 'FETCH_VIDEO_FAILED';
    }
    static get FETCH_VIDEOS_SUCCESS() {
        return 'FETCH_VIDEOS_SUCCESS';
    }
    // CATEGORIES
    static get CATEGORIES_UPDATE_SUCCESS() {
        return 'CATEGORIES_UPDATE_SUCCESS';
    }
    static get CATEGORIES_UPDATE_FAILED() {
        return 'CATEGORIES_UPDATE_FAILED';
    }
    // THEMES
    static get CHANGE_THEME() {
        return 'CHANGE_THEME';
    }

    // CONNECTION
    static get CONNECTION_STATUS_CHANGE() {
        return 'CONNECTION_STATUS_CHANGE';
    }

    // ORIENTATION
    static get ORIENTATION_CHANGE() {
        return 'ORIENTATION_CHANGE';
    }

    // IMMERSIVE MODE
    static get IMMERSIVE_MODE_CHANGE() {
        return 'IMMERSIVE_MODE_CHANGE';
    }

    // DIMENSIONS
    static get DIMENSIONS_CHANGE() {
        return 'DIMENSIONS_CHANGE';
    }

    // STATUSBAR STATE
    static get STATUSBAR_STATE_CHANGE() {
        return 'STATUSBAR_STATE_CHANGE';
    }

    // APP STATE
    static get APP_STATE_CHANGE() {
        return 'APP_STATE_CHANGE';
    }
}
