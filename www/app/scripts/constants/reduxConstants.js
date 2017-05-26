class ReduxConstants {
    //Actions UI


    //Login Actions
    static get LOGIN_SUCCESS() {return "LOGIN_SUCCESS"; }
    static get LOGIN_FAILED() {return "LOGIN_FAILED"; }
    static get LOGOUT_SUCCESS() {return "LOGOUT_SUCCESS"; }
    //Registration
    static get SHOW_REG_DIALOG() {return "SHOW_REG_DIALOG"; }
    static get HIDE_REG_DIALOG() {return "HIDE_REG_DIALOG"; }

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
    static get FETCH_CATEGORIES_SUCCESS() { return "FETCH_CATEGORIES_SUCCESS"; }

    //Video Playback
    static get VIDEO_SELECTED() { return "VIDEO_SELECTED"; }
    static get INVALIDATE_SELECTED() { return "INVALIDATE_SELECTED"; }

    //Data Overlay
    static get CHANGE_SCORE() { return "CHANGE_SCORE"; }
    static get GET_MESSAGE() { return "GET_MESSAGE"; }
    static get SEND_MESSAGE() { return "SEND_MESSAGE"; }

    //Header/top-nav
    static get MENU_TOGGLE() {return "MENU_TOGGLE"; }
    static get MENU_SHOW() {return "MENU_SHOW"; }
    static get MENU_HIDE() {return "MENU_HIDE"; }

    //Video Card
    static get CHANGE_CARD_INDEX() { return "CHANGE_CARD_INDEX"; }
    static get SHOW_VIDEO_CARD() { return "SHOW_VIDEO_CARD"; }
    static get HIDE_VIDEO_CARD() { return "HIDE_VIDEO_CARD"; }
    static get CHANGE_CARD_CATEGORY() { return "CHANGE_CARD_CATEGORY"; }

}

export default ReduxConstants;
