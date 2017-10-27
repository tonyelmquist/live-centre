import Actions from '../constants/reduxConstants';

const defaultState = {
    showSportsOverlay: true,
    showECommerceOverlay: true,
    showSettingsOverlay: true,
};

export default function overlayManagerReducer(state = defaultState, action) {
    switch (action.type) {
    case Actions.SHOW_ECOMMERCE_OVERLAY:
        return {
            ...state,
            showSportsOverlay: false,
            showECommerceOverlay: true,
            showSettingsOverlay: false,
        };
    case Actions.SHOW_SPORTS_OVERLAY:
        return {
            ...state,
            showSportsOverlay: true,
            showECommerceOverlay: false,
            showSettingsOverlay: false,
        };
    case Actions.SHOW_SETTINGS_OVERLAY:
        return {
            ...state,
            showSportsOverlay: false,
            showECommerceOverlay: false,
            showSettingsOverlay: true,
        };
    case Actions.SHOW_ALL_OVERLAYS:
        return {
            ...state,
            showSportsOverlay: true,
            showECommerceOverlay: true,
            showSettingsOverlay: true,
        };
    default:
        return state;
    }
}
