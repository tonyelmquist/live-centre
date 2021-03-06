class ReduxConstants {
    // AUTHENTICATION
    static get LOGIN_SUCCESS() { return 'LOGIN_SUCCESS'; }
    static get LOGOUT_SUCCESS() { return 'LOGOUT_SUCCESS'; }
    static get AUTH_SET_DISPLAY_NAME() { return 'AUTH_SET_DISPLAY_NAME'; }
    static get SET_LOGIN_FORM_ERROR() { return 'SET_LOGIN_FORM_ERROR'; }

    // CHAT MESSAGES
    static get GET_MESSAGE() { return 'GET_MESSAGE'; }
    static get GET_MESSAGES() { return 'GET_MESSAGES'; }
    static get SEND_MESSAGE() { return 'SEND_MESSAGE'; }
    static get CLEAR_MESSAGES() { return 'CLEAR_MESSAGES'; }
    static get TOGGLE_CHAT_MENU() { return 'TOGGLE_CHAT_MENU'; }

    // MODALS
    static get SHOW_LOGIN_MODAL() { return 'SHOW_LOGIN_MODAL'; }

    // SplashScreen
    static get SET_SPLASH_SHOWING() { return 'SET_SPLASH_SHOWING'; }
    static get SET_SPLASH_READY() { return 'SET_SPLASH_READY'; }

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

    static get INSERT_MATCH_DATA() { return 'INSERT_MATCH_DATA'; }
    static get INSERT_TEAM_DATA() { return 'INSERT_TEAM_DATA'; }
    static get INSERT_PLAYER_DATA() { return 'INSERT_PLAYER_DATA'; }

    // NAVIGATION
    static get MENU_TOGGLE() { return 'MENU_TOGGLE'; }
    static get MENU_SHOW() { return 'MENU_SHOW'; }
    static get MENU_HIDE() { return 'MENU_HIDE'; }
    static get CHANGE_PAGE_TAB_INDEX() { return 'CHANGE_PAGE_TAB_INDEX'; }
    static get REMOVE_PAGE_TAB_INDEX() { return 'REMOVE_PAGE_TAB_INDEX'; }
    static get PAGE_TAB_GO_BACK() { return 'PAGE_TAB_GO_BACK'; }

    static get DRAWER_MENU_TOGGLE() { return 'DRAWER_MENU_TOGGLE'; }
    static get DRAWER_MENU_SHOW() { return 'DRAWER_MENU_SHOW'; }
    static get DRAWER_MENU_HIDE() { return 'DRAWER_MENU_HIDE'; }

    static get BOTTOM_NAV_SHOW() { return 'BOTTOM_NAV_SHOW'; }
    static get BOTTOM_NAV_HIDE() { return 'BOTTOM_NAV_HIDE'; }
    static get CHANGE_NAV_INDEX() { return 'CHANGE_NAV_INDEX'; }

    static get SWITCH_SHADE() { return 'SWITCH_SHADE'; }
    static get SWITCH_USER_MENU() { return 'SWITCH_USER_MENU'; }

    static get RESUME_APP() { return 'RESUME_APP'; }
    static get PAUSE_APP() { return 'PAUSE_APP'; }

    // VIDEO OVERLAY
    static get VIDEO_OVERLAY_OPEN() { return 'VIDEO_OVERLAY_OPEN'; }
    static get VIDEO_OVERLAY_CLOSE() { return 'VIDEO_OVERLAY_CLOSE'; }
    static get VIDEO_OVERLAY_MAXIMIZE() { return 'VIDEO_OVERLAY_MAXIMIZE'; }
    static get VIDEO_OVERLAY_MINIMIZE() { return 'VIDEO_OVERLAY_MINIMIZE'; }
    static get VIDEO_OVERLAY_SET_INFO() { return 'VIDEO_OVERLAY_SET_INFO'; }
    static get TOGGLE_COLLAPSE_INFO() { return 'TOGGLE_COLLAPSE_INFO'; }
    static get COLLAPSE_INFO() { return 'COLLAPSE_INFO'; }

    // SEARCH
    static get TOGGLE_SEARCH() { return 'TOGGLE_SEARCH'; }
    static get SEARCH_KEYWORD() { return 'SEARCH_KEYWORD'; }
    static get EMPTY_SEARCH() { return 'EMPTY_SEARCH'; }
    static get CLOSE_SEARCH() { return 'CLOSE_SEARCH'; }
    static get CHANGE_SEARCH_FILTER_INDEX() { return 'CHANGE_SEARCH_FILTER_INDEX'; }
    static get FOCUSED_SEARCH() { return 'FOCUS_SEARCH'; }
    static get BLURRED_SEARCH() { return 'BLUR_SEARCH'; }

    // DATA OVERLAY
    static get CHANGE_SCORE() { return 'CHANGE_SCORE'; }
    static get CHANGE_CLOCK() { return 'CHANGE_CLOCK'; }
    static get SET_ACTIVE_EVENTS() { return 'SET_ACTIVE_EVENTS'; }

    // SETTINGS
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

    // VIDEOCARD
    static get CHANGE_CARD_INDEX() { return 'CHANGE_CARD_INDEX'; }
    static get SHOW_VIDEO_CARD() { return 'SHOW_VIDEO_CARD'; }
    static get HIDE_VIDEO_CARD() { return 'HIDE_VIDEO_CARD'; }
    static get CHANGE_CARD_CATEGORY() { return 'CHANGE_CARD_CATEGORY'; }
    static get CHANGE_VIDEO_INFO() { return 'CHANGE_VIDEO_INFO'; }

    // VIDEO PLAYER
    static get SHOW_REPLAY() { return 'SHOW_REPLAY'; }
    static get HIDE_REPLAY() { return 'HIDE_REPLAY'; }

    static get SHOW_HIGHLIGHTS() { return 'SHOW_HIGHLIGHTS'; }
    static get HIDE_HIGHLIGHTS() { return 'HIDE_HIGHLIGHTS'; }

    static get SET_VIDEO_DIMENSIONS() { return 'SET_VIDEO_DIMENSIONS'; }

    static get TOGGLE_TICKERS() { return 'TOGGLE_TICKERS'; }

    static get VIDEO_IS_WAITING() { return 'VIDEO_IS_WAITING'; }
    static get VIDEO_IS_READY() { return 'VIDEO_IS_READY'; }

    // static get SET_CURRENT_TIME() { return 'SET_CURRENT_TIME'; }

    static get MARK_AS_WISHLIST() { return 'MARK_AS_WISHLIST'; }
    static get REMOVE_FROM_WISHLIST() { return 'REMOVE_FROM_WISHLIST'; }
    static get MARK_SELECTED_AS_WISHLIST() { return 'MARK_SELECTED_AS_WISHLIST'; }

    static get ENTER_FULL_SCREEN() { return 'ENTER_FULL_SCREEN'; }
    static get EXIT_FULL_SCREEN() { return 'EXIT_FULL_SCREEN'; }

    static get SHOW_ECOMMERCE_OVERLAY() { return 'SHOW_ECOMMERCE_OVERLAY'; }
    static get SHOW_SPORTS_OVERLAY() { return 'SHOW_SPORTS_OVERLAY'; }
    static get SHOW_SETTINGS_OVERLAY() { return 'SHOW_SETTINGS_OVERLAY'; }
    static get SHOW_ALL_OVERLAYS() { return 'SHOW_ALL_OVERLAYS'; }

    static get VIDEO_SELECTED() { return 'VIDEO_SELECTED'; }
    static get INVALIDATE_SELECTED() { return 'INVALIDATE_SELECTED'; }

    static get SET_CONTROL_BAR_VISIBILITY() { return 'SET_CONTROL_BAR_VISIBILITY'; }
    static get SET_VIDEO_SETTINGS_OPEN() { return 'SET_VIDEO_SETTINGS_OPEN'; }

    static get PLAY_VIDEO() { return 'PLAY_VIDEO'; }
    static get PAUSE_VIDEO() { return 'PAUSE_VIDEO'; }

    static get SET_DURATION() { return 'SET_DURATION'; }
    static get SET_BUFFER_TIME() { return 'SET_BUFFER_TIME'; }

    static get UPDATE_CURRENT_TIME() { return 'UPDATE_CURRENT_TIME'; }
    static get CHANGE_CURRENT_TIME() { return 'CHANGE_CURRENT_TIME'; }
    static get SKIP_CURRENT_TIME_BY() { return 'SKIP_CURRENT_TIME_BY'; }
    static get RESET_CURRENT_TIME() { return 'RESET_CURRENT_TIME'; }


    // NOTIFICATIONS
    static get ADD_NEW_POP_NOTIFICATION() { return 'ADD_NEW_POP_NOTIFICAITON'; }
    static get REHYDRATE_POP_NOTIFICATIONS() { return 'REHYDRATE_POP_NOTIFICATIONS'; }
    static get REMOVE_POP_NOTIFICATION() { return 'REMOVE_POP_NOTIFICATION'; }

    static get ADD_NEW_NOTIFICATION() { return 'ADD_NEW_NOTIFICAITON'; }
    static get REHYDRATE_NOTIFICATIONS() { return 'REHYDRATE_NOTIFICATIONS'; }
    static get REMOVE_NOTIFICATION() { return 'REMOVE_NOTIFICATION'; }

    // PAGES
    //   PROGRAMPAGE
    static get CHANGE_PROGRAMS_TAB_INDEX() { return 'CHANGE_PROGRAMS_TAB_INDEX'; }
    //   SPORTSPAGE
    static get CHANGE_PLAYER_INDEX() { return 'CHANGE_PLAYER_INDEX'; }
    static get CHANGE_PLAYER_INDEX_TAB() { return 'CHANGE_PLAYER_INDEX_TAB'; }
    static get OPEN_SPORT_PLAYER_OVERLAY() { return 'OPEN_SPORT_PLAYER_OVERLAY'; }
    static get CLOSE_SPORT_PLAYER_OVERLAY() { return 'CLOSE_SPORT_PLAYER_OVERLAY'; }
    static get ADD_SPORT_VIDEO() { return 'ADD_SPORT_VIDEO'; }

    // ECOMMERCE
    static get ADD_TO_CART() { return 'ADD_TO_CART'; }
    static get BUY_NOW() { return 'CHECKOUT_NOW'; }
    static get CANCEL_CHECKOUT() { return 'CANCEL_CHECKOUT'; }
    static get CANCEL_BUY_NOW() { return 'CANCEL_BUY_NOW'; }
    static get COMPLETE_CHECKOUT() { return 'COMPLETE_CHECKOUT'; }
    static get COMPLETE_BUY_NOW() { return 'COMPLETE_BUY_NOW'; }
    static get SHOW_PRODUCT_OVERLAY() { return 'SHOW_PRODUCT_OVERLAY'; }
    static get HIDE_PRODUCT_OVERLAY() { return 'HIDE_PRODUCT_OVERLAY'; }
    static get SHOW_CART() { return 'SHOW_CART'; }
    static get HIDE_CART() { return 'HIDE_CART'; }
    static get REMOVE_FROM_CART() { return 'REMOVE_FROM_CART'; }
    static get SHOW_PRODUCT_THUMB() { return 'SHOW_PRODUCT_THUMB'; }
    static get HIDE_PRODUCT_THUMB() { return 'HIDE_PRODUCT_THUMB'; }

}

export class Orientation {
    static get PORTRAIT() { return 'PORTRAIT'; }
    static get LANDSCAPE() { return 'LANDSCAPE'; }
}

export default ReduxConstants;
