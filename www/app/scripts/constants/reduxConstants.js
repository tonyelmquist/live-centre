class ReduxConstants {
    // AUTHENTICATION
    static get LOGIN_SUCCESS() { return 'LOGIN_SUCCESS'; }
    static get LOGIN_FAILED() { return 'LOGIN_FAILED'; }
    static get LOGOUT_SUCCESS() { return 'LOGOUT_SUCCESS'; }
    static get SHOW_REG_DIALOG() { return 'SHOW_REG_DIALOG'; }
    static get HIDE_REG_DIALOG() { return 'HIDE_REG_DIALOG'; }

    // CHAT MESSAGES
    static get GET_MESSAGE() { return 'GET_MESSAGE'; }
    static get SEND_MESSAGE() { return 'SEND_MESSAGE'; }
    static get CLEAR_MESSAGES() { return 'CLEAR_MESSAGES'; }
    static get TOGGLE_CHAT_MENU() { return 'TOGGLE_CHAT_MENU'; }

    // MODALS
    static get SHOW_LOGIN_MODAL() { return 'SHOW_LOGIN_MODAL'; }

    // FETCH DATA
    static get FETCH_VIDEO_SUCCESS() { return 'FETCH_VIDEO_SUCCESS'; }
    static get FETCH_VIDEO_FAILED() { return 'FETCH_VIDEO_FAILED'; }
    static get FETCH_VIDEOS_SUCCESS() { return 'FETCH_VIDEOS_SUCCESS'; }

    static get FETCH_SERIES_SUCCESS() { return 'FETCH_SERIES_SUCCESS'; }
    static get FETCH_SERIES_FAILED() { return 'FETCH_SERIES_FAILED'; }

    static get FETCH_CHANNELS_SUCCESS() { return 'FETCH_CHANNELS_SUCCESS'; }
    static get FETCH_CHANNELS_FAILED() { return 'FETCH_CHANNELS_FAILED'; }

    static get FETCH_SEASONS_SUCCESS() { return 'FETCH_SEASONS_SUCCESS'; }
    static get FETCH_SEASONS_FAILED() { return 'FETCH_SEASONS_FAILED'; }

    static get FETCH_TAGS_SUCCESS() { return 'FETCH_TAGS_SUCCESS'; }
    static get FETCH_TAGS_FAILED() { return 'FETCH_TAGS_FAILED'; }

    // NAVIGATION
    static get MENU_TOGGLE() { return 'MENU_TOGGLE'; }
    static get MENU_SHOW() { return 'MENU_SHOW'; }
    static get MENU_HIDE() { return 'MENU_HIDE'; }

    static get DRAWER_MENU_TOGGLE() { return 'DRAWER_MENU_TOGGLE'; }
    static get DRAWER_MENU_SHOW() { return 'DRAWER_MENU_SHOW'; }
    static get DRAWER_MENU_HIDE() { return 'DRAWER_MENU_HIDE'; }

    static get BOTTOM_NAV_SHOW() { return 'BOTTOM_NAV_SHOW'; }
    static get BOTTOM_NAV_HIDE() { return 'BOTTOM_NAV_HIDE'; }
    static get CHANGE_NAV_INDEX() { return 'CHANGE_NAV_INDEX'; }

    //OVERLAY-X
    static get OVERLAY_X_OPEN() { return 'OVERLAY_X_OPEN'; }
    static get OVERLAY_X_CLOSE() { return 'OVERLAY_X_CLOSE'; }
    static get OVERLAY_X_MAXIMIZE() { return 'OVERLAY_X_MAXIMIZE'; }
    static get OVERLAY_X_MINIMIZE() { return 'OVERLAY_X_MINIMIZE'; }
    static get OVERLAY_X_SET_INFO() { return 'OVERLAY_X_SET_INFO'; }
    static get TOGGLE_COLLAPSE_INFO() { return 'TOGGLE_COLLAPSE_INFO' ;}
    static get COLLAPSE_INFO() { return 'COLLAPSE_INFO' ;}

    // SEARCH
    static get TOGGLE_SEARCH() { return 'TOGGLE_SEARCH'; }
    static get SEARCH_KEYWORD() { return 'SEARCH_KEYWORD'; }
    static get EMPTY_SEARCH() { return 'EMPTY_SEARCH'; }
    static get CLOSE_SEARCH() { return 'CLOSE_SEARCH'; }
    static get CHANGE_SEARCH_FILTER_INDEX() { return 'CHANGE_SEARCH_FILTER_INDEX'; }
    static get FOCUSED_SEARCH() { return 'FOCUS_SEARCH'; }
    static get BLURRED_SEARCH() { return 'BLUR_SEARCH'; }

    // SECOND LAYER
    static get CHANGE_SCORE() { return 'CHANGE_SCORE'; }

    //SETTINGS
    static get CHANGE_LANG() { return 'CHANGE_LANG'; }
    static get CHANGE_SUBTITLE_LANG() { return 'CHANGE_SUBTITLE_LANG'; }
    static get CHANGE_AUDIO_LANG() { return 'CHANGE_AUDIO_LANG'; }
    static get TOGGLE_RECOMMENDATIONS() { return 'TOGGLE_RECOMMENDATIONS'; }
    static get SET_ORIENTATION() { return 'SET_ORIENTATION'; }

    static get FETCH_USER_SETTINGS_SENT() { return 'FETCH_USER_SETTINGS_SENT'; }
    static get FETCH_USER_SETTINGS_SUCCESS() { return 'FETCH_USER_SETTINGS_SUCCESS'; }
    static get FETCH_USER_SETTINGS_FAILED() { return 'FETCH_USER_SETTINGS_FAILED'; }

    static get SAVING_USER_SETTINGS() { return 'SAVING_USER_SETTINGS'; }
    static get SAVED_USER_SETTINGS() { return 'SAVED_USER_SETTINGS'; }
    static get SAVING_USER_SETTINGS_FAILED() { return 'SAVING_USER_SETTINGS_FAILED'; }

    //VIDEOCARD
    static get CHANGE_CARD_INDEX() { return 'CHANGE_CARD_INDEX'; }
    static get SHOW_VIDEO_CARD() { return 'SHOW_VIDEO_CARD'; }
    static get HIDE_VIDEO_CARD() { return 'HIDE_VIDEO_CARD'; }
    static get CHANGE_CARD_CATEGORY() { return 'CHANGE_CARD_CATEGORY'; }
    static get CHANGE_VIDEO_INFO() { return 'CHANGE_VIDEO_INFO'; }

    //VIDEO PLAYER
    static get SHOW_REPLAY() { return 'SHOW_REPLAY'; }
    static get HIDE_REPLAY() { return 'HIDE_REPLAY'; }

    static get SHOW_HIGHLIGHTS() { return 'SHOW_HIGHLIGHTS'; }
    static get HIDE_HIGHLIGHTS() { return 'HIDE_HIGHLIGHTS'; }

    static get SET_CURRENT_TIME() { return 'SET_CURRENT_TIME'; }

    static get MARK_AS_WISHLIST() { return 'MARK_AS_WISHLIST'; }

    static get ENTER_FULL_SCREEN() { return 'ENTER_FULL_SCREEN'; }
    static get EXIT_FULL_SCREEN() { return 'EXIT_FULL_SCREEN'; }

    static get VIDEO_SELECTED() { return 'VIDEO_SELECTED'; }
    static get INVALIDATE_SELECTED() { return 'INVALIDATE_SELECTED'; }

    static get SET_CONTROL_BAR_VISIBILITY() { return 'SET_CONTROL_BAR_VISIBILITY'; }
    static get SET_VIDEO_SETTINGS_OPEN() { return 'SET_VIDEO_SETTINGS_OPEN'; }


    //NOTIFICATIONS
    static get ADD_NEW_NOTIFICATION() { return 'ADD_NEW_NOTIFICAITON'; }
    static get REHYDRATE_NOTIFICATIONS() { return 'REHYDRATE_NOTIFICATIONS'; }
    static get REMOVE_NOTIFICATION() { return 'REMOVE_NOTIFICATION'; }

    //PAGES
    //PROGRAMPAGE
    static get CHANGE_PROGRAMS_TAB_INDEX() { return 'CHANGE_PROGRAMS_TAB_INDEX'; }
    //SPORTSPAGE
    static get CHANGE_TEAM_TAB_INDEX() { return 'CHANGE_TEAM_TAB_INDEX' ;}
    static get CHANGE_PLAYER_INDEX() { return 'CHANGE_PLAYER_INDEX' ;}
    static get CHANGE_PLAYER_INDEX_TAB() { return 'CHANGE_PLAYER_INDEX_TAB' ;}
    static get OPEN_SPORT_PLAYER_OVERLAY() { return 'OPEN_SPORT_PLAYER_OVERLAY' ;}
    static get CLOSE_SPORT_PLAYER_OVERLAY() { return 'CLOSE_SPORT_PLAYER_OVERLAY'; }

}

export class Orientation {
    static get PORTRAIT() { return 'PORTRAIT'; }
    static get LANDSCAPE() { return 'LANDSCAPE'; }
}

export default ReduxConstants;
