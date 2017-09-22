import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addToCart,
  buyNow,
  showCart,
  cancelCheckout,
  cancelBuyNow,
  completeCheckout,
  completeBuyNow,
  showProductOverlay,
  hideProductOverlay,
  hideCart,
  removeFromCart,
  showProductThumb,
  hideProductThumb,
} from '../../actions/ecommerce';
import { newPopNotification } from '../../actions/notifications';

import ProductOverlay from '../../components/Ecommerce/ProductOverlay';
import ProductThumb from '../../components/Ecommerce/ProductThumb';
import CartButton from '../../components/Ecommerce/CartButton';
import Cart from '../../components/Ecommerce/Cart';

const showProductDuration = 5000;

class ECommerceDataOverlay extends Component {

    tickInProximity = (currentTime) => {


        const currentTimeInMS = currentTime * 1000;

        const thisTimeline = this.props.timeline;

        if (thisTimeline.events !== undefined) {
            const currentEvent = thisTimeline.events.find(
            event => ((event.timestamp < currentTimeInMS) && (currentTimeInMS < event.timestamp + showProductDuration)),
            );
            if (currentEvent !== undefined) {
                if (!this.props.showProductThumb) { this.props.dispatch(showProductThumb(currentEvent.productID)); }
            } else if (this.props.showProductThumb) { this.props.dispatch(hideProductThumb()); }
        }
    }

    onHideProductOverlay = () => {
        this.props.dispatch(hideProductOverlay());
    };

    onAddToCart = () => {
        this.props.dispatch(addToCart(this.props.selectedProduct));
        this.props.dispatch(newPopNotification(Math.round(Math.random() * 100), 'Item added to cart', 0.1, new Date().getTime()));
    };

    onShowCart = () => {
        this.props.dispatch(showCart());
    };

    onCancelCheckout = () => {
        this.props.dispatch(cancelCheckout());
    };

    onCancelBuyNow = () => {
        this.props.dispatch(cancelBuyNow());
    };

    onShowProductOverlay = () => {
        this.props.dispatch(showProductOverlay(this.props.currentProduct));
    };

    onCompleteBuyNow = () => {
        this.props.dispatch(completeBuyNow());
        this.props.dispatch(newPopNotification(Math.round(Math.random() * 100), 'Your order has been placed!', 0.1, new Date().getTime()));
    };

    onCompleteCheckout = () => {
        this.props.dispatch(completeCheckout());
    };

    onHideCart = () => {
        this.props.dispatch(hideCart());
    };

    onBuyNow = () => {
        this.props.dispatch(buyNow());
    }

    componentDidUpdate = () => {
        this.tickInProximity(this.props.currentTime);
    }

    onRemoveFromCart = (productID) => {
        this.props.dispatch(removeFromCart(productID));
    };

    render() {
        return (
      <div>
        <ProductOverlay
          productID={this.props.selectedProduct}
          show={this.props.showProductOverlay}
          showBuyNow={this.props.showBuyNow}
          onBuyNow={this.onBuyNow}
          onHideProductOverlay={this.onHideProductOverlay}
          orientation={this.props.orientation}
          onCompleteBuyNow={this.onCompleteBuyNow}
          onAddToCart={this.onAddToCart}
        />
        <ProductThumb
          productID={this.props.currentProduct}
          show={this.props.showProductThumb}
          onSelectProduct={this.onShowProductOverlay}
        />
        <Cart
          paymentMethod={this.props.paymentMethod}
          shippingMethod={this.props.shippingMethod}
          cart={this.props.cart}
          show={this.props.showCart}
          onHideCart={this.onHideCart}
          onCompleteCheckout={this.onCompleteCheckout}
        />
        <CartButton
          show={this.props.showCartButton}
          onShowCart={this.onShowCart}
        />
      </div>
        );
    }
}

ECommerceDataOverlay.defaultProps = {
    paymentMethod: '**** **** **** 4192',
    shippingMethod: 'Sirigata 3, 3324 Molde',
};

const mapStateToProps = state => ({
    currentProduct: state.ecommerce.currentProduct,
    selectedProduct: state.ecommerce.selectedProduct,
    showProductThumb: state.ecommerce.popupManager.showProductThumb,
    orientation: state.settings.screenOrientation,
    showBuyNow: state.ecommerce.popupManager.showBuyNow,
    showProductOverlay: state.ecommerce.popupManager.showProductOverlay,
    showCartButton: state.ecommerce.popupManager.showCartButton,
    showCart: state.ecommerce.popupManager.showCart,
    cart: state.ecommerce.cart,
    timeline: state.playback.video._timeline,
    currentTime: state.videoPlayer.currentVideoTime,
});

export default connect(mapStateToProps)(ECommerceDataOverlay);
