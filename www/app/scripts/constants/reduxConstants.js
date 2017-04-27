class ReduxConstants {
    //Actions UI
    static get SIDEBAR_SHOW() { return "SIDEBAR_SHOW"; }
    static get SIDEBAR_HIDE() { return "SIDEBAR_HIDE"; }

    //Login Actions
    static get LOGIN_SUCCESS() {return "LOGIN_SUCCESS"; }
    static get LOGIN_FAILED() {return "LOGIN_FAILED"; }

    static get LOGOUT_SUCCESS() {return "LOGOUT_SUCCESS"; }

    //Bottom NavigationMenu
    static get BOTTOM_NAV_SHOW() { return "BOTTOM_NAV_SHOW"; }
    static get BOTTOM_NAV_HIDE() { return "BOTTOM_NAV_HIDE"; }
    static get CHANGE_NAV_INDEX() { return "CHANGE_NAV_INDEX"; }

    //Language
    static get CHANGE_LANG() { return "CHANGE_LANG"; }

    //API Fetch Video Metadata Items
    static get FETCH_METADATA_SENT() { return "FETCH_METADATA_SENT"; }
    static get FETCH_METADATA_FAILED() { return "FETCH_METADATA_FAILED"; }
    static get FETCH_METADATA_SUCCESS() { return "FETCH_METADATA_SUCCESS"; }

    //Video Playback
    static get VIDEO_SELECTED() { return "VIDEO_SELECTED"; }
    static get INVALIDATE_SELECTED() { return "INVALIDATE_SELECTED"; }

    //Data Overlay
    static get CHANGE_SCORE() { return "CHANGE_SCORE"; }
}

export default ReduxConstants;
