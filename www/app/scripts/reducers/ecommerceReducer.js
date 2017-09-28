import Actions from '../constants/reduxConstants';

const defaultState = {
    cart: [],

    popupManager: {
        showCartButton: false,
        showBuyNow: false,
        showCart: false,
        showProductThumb: false,
        showProductOverlay: false,
    },
    products: [],
    selectedProduct: 0,
    currentProduct: 1,
};

export default function ecommerceReducer(state = defaultState, action) {

    switch (action.type) {
    case Actions.ADD_TO_CART:

        const quantity = state.cart[action.productID];

        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: false,
                showCartButton: true,
                showProductOverlay: false,
            },
            cart: {
                ...state.cart,
                [action.productID]: (quantity || 0) + 1,
            },
        };

    case Actions.BUY_NOW:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: true,
                showCart: false,
            },
        };
    case Actions.CANCEL_BUY_NOW:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: false,
            },
        };
    case Actions.CANCEL_CHECKOUT:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: false,
                showCartButton: true,
            },
        };
    case Actions.SHOW_CART:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: true,
                showProductOverlay: false,
            },
        };

    case Actions.HIDE_CART:
        return Object.assign({}, state, {
            popupManager: {
                showCheckoutNow: false,
                showCartButton: true,
                showCart: false,
            },
        });

    case Actions.COMPLETE_CHECKOUT:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: false,
                showCartButton: false,
            },
            cart: [],
        };
    case Actions.COMPLETE_BUY_NOW:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showBuyNow: false,
                showCart: false,
                showProductOverlay: false,
            },
        };

    case Actions.FETCH_PRODUCTS_SUCCESS:
        return Object.assign({}, state, {
            products: action.products,
        });

    case Actions.SHOW_PRODUCT_OVERLAY:
        return {
            ...state,
            selectedProduct: action.productID,
            popupManager: {
                ...state.popupManager,
                showProductOverlay: true,
                showCart: false,
            },
        };

    case Actions.HIDE_PRODUCT_OVERLAY:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showProductOverlay: false,
                showBuyNow: false,
            },
        };

    case Actions.SHOW_PRODUCT_THUMB:
        return {
            ...state,
            currentProduct: action.productID,
            popupManager: {
                ...state.popupManager,
                showProductThumb: true,
            },
        };

    case Actions.HIDE_PRODUCT_THUMB:
        return {
            ...state,
            popupManager: {
                ...state.popupManager,
                showProductThumb: false,
            },
        };

    default:
        return state;
    }
}
