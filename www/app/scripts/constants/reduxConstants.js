class ReduxConstants {
    // Login Actions
    static get LOGIN_SUCCESS() { return 'LOGIN_SUCCESS'; }
    static get LOGIN_FAILED() { return 'LOGIN_FAILED'; }
    static get LOGOUT_SUCCESS() { return 'LOGOUT_SUCCESS'; }

    // Registration
    static get SHOW_REG_DIALOG() { return 'SHOW_REG_DIALOG'; }
    static get HIDE_REG_DIALOG() { return 'HIDE_REG_DIALOG'; }

    // Bottom NavigationMenu
    static get BOTTOM_NAV_SHOW() { return 'BOTTOM_NAV_SHOW'; }
    static get BOTTOM_NAV_HIDE() { return 'BOTTOM_NAV_HIDE'; }
    static get CHANGE_NAV_INDEX() { return 'CHANGE_NAV_INDEX'; }


    // Language
    static get CHANGE_LANG() { return 'CHANGE_LANG'; }

    // Video Playback
    static get VIDEO_SELECTED() { return 'VIDEO_SELECTED'; }
    static get INVALIDATE_SELECTED() { return 'INVALIDATE_SELECTED'; }
    static get ENTER_FULL_SCREEN() { return 'ENTER_FULL_SCREEN'; }
    static get EXIT_FULL_SCREEN() { return 'EXIT_FULL_SCREEN'; }

    // Data Overlay
    static get CHANGE_SCORE() { return 'CHANGE_SCORE'; }
    static get GET_MESSAGE() { return 'GET_MESSAGE'; }
    static get SEND_MESSAGE() { return 'SEND_MESSAGE'; }

    // Header/top-nav
    static get MENU_TOGGLE() { return 'MENU_TOGGLE'; }
    static get MENU_SHOW() { return 'MENU_SHOW'; }
    static get MENU_HIDE() { return 'MENU_HIDE'; }

    // Search
    static get TOGGLE_SEARCH() { return 'TOGGLE_SEARCH'; }
    static get SEARCH_KEYWORD() { return 'SEARCH_KEYWORD'; }
    static get EMPTY_SEARCH() { return 'EMPTY_SEARCH'; }
    static get CLOSE_SEARCH() { return 'CLOSE_SEARCH'; }

    // Filter
    static get CLEAR_FILTERS() { return 'CLEAR_FILTER'; }
    static get TOGGLE_FILTER() { return 'TOGGLE_FILTER'; }

    // Video Card
    static get CHANGE_CARD_INDEX() { return 'CHANGE_CARD_INDEX'; }
    static get SHOW_VIDEO_CARD() { return 'SHOW_VIDEO_CARD'; }
    static get HIDE_VIDEO_CARD() { return 'HIDE_VIDEO_CARD'; }
    static get CHANGE_CARD_CATEGORY() { return 'CHANGE_CARD_CATEGORY'; }
    static get CHANGE_VIDEO_INFO() { return 'CHANGE_VIDEO_INFO'; }

    // Overlay
    static get SHOW_OVERLAY() { return 'SHOW_OVERLAY'; }
    static get HIDE_OVERLAY() { return 'HIDE_OVERLAY'; }

    // VIDEOS FETCH
    static get FETCH_VIDEO_SUCCESS() { return 'FETCH_VIDEO_SUCCESS'; }
    static get FETCH_VIDEO_FAILED() { return 'FETCH_VIDEO_FAILED'; }

    // SERIES FETCH
    static get FETCH_SERIES_SUCCESS() { return 'FETCH_SERIES_SUCCESS'; }
    static get FETCH_SERIES_FAILED() { return 'FETCH_SERIES_FAILED'; }

    // CHANNELS FETCH
    static get FETCH_CHANNELS_SUCCESS() { return 'FETCH_CHANNELS_SUCCESS'; }
    static get FETCH_CHANNELS_FAILED() { return 'FETCH_CHANNELS_FAILED'; }

    // SEASONS FETCH
    static get FETCH_SEASONS_SUCCESS() { return 'FETCH_SEASONS_SUCCESS'; }
    static get FETCH_SEASONS_FAILED() { return 'FETCH_SEASONS_FAILED'; }

    // TAGS FETCH
    static get FETCH_TAGS_SUCCESS() { return 'FETCH_TAGS_SUCCESS'; }
    static get FETCH_TAGS_FAILED() { return 'FETCH_TAGS_FAILED'; }

    // Settings
    static get CHANGE_LANG() { return 'CHANGE_LANG'; }
    static get CHANGE_SUBTITLE_LANG() { return 'CHANGE_SUBTITLE_LANG'; }
    static get CHANGE_AUDIO_LANG() { return 'CHANGE_AUDIO_LANG'; }
    static get TOGGLE_RECOMMENDATIONS() { return 'TOGGLE_RECOMMENDATIONS'; }

    static get FETCH_USER_SETTINGS_SENT() { return 'FETCH_USER_SETTINGS_SENT'; }
    static get FETCH_USER_SETTINGS_SUCCESS() { return 'FETCH_USER_SETTINGS_SUCCESS'; }
    static get FETCH_USER_SETTINGS_FAILED() { return 'FETCH_USER_SETTINGS_FAILED'; }

    static get SAVING_USER_SETTINGS() { return 'SAVING_USER_SETTINGS'; }
    static get SAVED_USER_SETTINGS() { return 'SAVED_USER_SETTINGS'; }
    static get SAVING_USER_SETTINGS_FAILED() { return 'SAVING_USER_SETTINGS_FAILED'; }

}

export default ReduxConstants;
