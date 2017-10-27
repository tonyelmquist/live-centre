import Actions from '../constants/reduxConstants';

export function showECommerceOverlay() {
    return { type: Actions.SHOW_ECOMMERCE_OVERLAY };
}

export function showSportsOverlay() {
    return { type: Actions.SHOW_SPORTS_OVERLAY };
}

export function showSettingsOverlay() {
    return { type: Actions.SHOW_SETTINGS_OVERLAY };
}

export function showAllOverlays() {
    return { type: Actions.SHOW_ALL_OVERLAYS };
}
