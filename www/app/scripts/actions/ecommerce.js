import Actions from '../constants/reduxConstants';

export function addToCart(productID) {
    return { type: Actions.ADD_TO_CART, productID };
}

export function buyNow() {
    return { type: Actions.BUY_NOW };
}

export function showCart() {
    return { type: Actions.SHOW_CART };
}

export function cancelCheckout() {
    return { type: Actions.CANCEL_CHECKOUT };
}

export function cancelBuyNow() {
    return { type: Actions.CANCEL_BUY_NOW };
}

export function completeCheckout() {
    return { type: Actions.COMPLETE_CHECKOUT };
}

export function completeBuyNow() {
    return { type: Actions.COMPLETE_BUY_NOW };
}

export function showProductOverlay(productID) {
    return { type: Actions.SHOW_PRODUCT_OVERLAY, productID };
}

export function hideProductOverlay() {
    return { type: Actions.HIDE_PRODUCT_OVERLAY };
}

export function hideCart() {
    return { type: Actions.HIDE_CART };
}

export function removeFromCart(productID) {
    return { type: Actions.REMOVE_FROM_CART, productID };
}

export function showProductThumb(productID) {
    return { type: Actions.SHOW_PRODUCT_THUMB, productID };
}

export function hideProductThumb() {
    return { type: Actions.HIDE_PRODUCT_THUMB };
}
