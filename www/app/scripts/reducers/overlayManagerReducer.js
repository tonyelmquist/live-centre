import Actions from '../constants/reduxConstants';

const defaultState = {
    showSportsOverlay: true,
    showECommerceOverlay: true,
};

export default function overlayManagerReducer(state = defaultState, action) {
    switch (action.type) {
    case Actions.SHOW_ECOMMERCE_OVERLAY:
        return {
            ...state,
            showSportsOverlay: false,
            showECommerceOverlay: true,
        };
    case Actions.SHOW_SPORTS_OVERLAY:
        return {
            ...state,
            showSportsOverlay: true,
            showECommerceOverlay: false,
        };
    case Actions.SHOW_ALL_OVERLAYS:
        return {
            ...state,
            showSportsOverlay: true,
            showECommerceOverlay: true,
        };
    default:
        return state;
    }
}