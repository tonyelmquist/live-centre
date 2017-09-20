import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import productArray from '../../constants/products';
import {
  hideProductOverlay,
  hideProductThumb,
} from '../../actions/videoPlayer';
import {
  addToCart,
  checkout,
  buyNow,
  cancelCheckoutNow,
  completeCheckout,
  completeCheckoutNow,
} from '../../actions/ecommerce';
import { Orientation } from '../../constants/reduxConstants';
import ProductDetails from '../Ecommerce/ProductDetails';
import BuyNow from '../Ecommerce/BuyNow';

class ProductOverlay extends Component {

    componentDidUpdate() {
        // Hide product overlay when VideoOverlay is minimized.
        if (!this.props.overlayMaximized) {
            this.props.dispatch(hideProductOverlay());
            this.props.dispatch(hideProductThumb());
        }
    }

    product = (productID) => {
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        return thisProduct;
    };

    onHideProductOverlay = (e) => {
        e.stopPropagation();
        this.props.dispatch(hideProductOverlay());
        this.props.dispatch(cancelCheckoutNow());
    };

    onCompleteCheckoutNow = () => {
        this.props.dispatch(completeCheckoutNow(this.props.productID));
    };

        onBuyNow = () => {
        this.props.dispatch(buyNow(this.props.productID));
    };


    render() {
        let product = { description: '', thumbnailImage: '', price: 0 };
        if (this.props.productID !== 0) {
            product = this.product(this.props.productID);
        }

        return (
      <div
        className={`product-overlay ${this.props.showProductOverlay
          ? 'isShowing'
          : ''} ${this.props.orientation === Orientation.PORTRAIT
          ? 'portrait'
          : ''}`}
        onTouchTap={e => e.stopPropagation()}
      >
        <div
          className="close-btn"
          onTouchTap={this.onHideProductOverlay}
          role="button"
          tabIndex="0"
        >
          {' '}<i className="fa fa-close" />
        </div>
        <img
          src={product.thumbnailImage}
          alt={product.description}
          key={product.productID}
          className="product-overlay-image"
        />

        <BuyNow onBuyNow={this.onBuyNow} show={this.props.showCheckoutNow} />
        <ProductDetails
              description={product.description}
              price={product.price}
              onBuyNow={this.onBuyNow}
              onAddToCart={this.onAddToCart}
              show={!this.props.showCheckoutNow}
        />
      </div>
        );
    }
}

ProductOverlay.propTypes = {
    showProductOverlay: PropTypes.bool.isRequired,
    productID: PropTypes.number.isRequired,
    orientation: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    overlayMaximized: PropTypes.bool.isRequired,
    showCheckoutNow: PropTypes.bool.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    shippingMethod: PropTypes.string.isRequired,
};

ProductOverlay.defaultProps = {
    showProductOverlay: false,
    showCheckoutNow: false,
    productID: 0,
    paymentMethod: '**** **** **** 4192',
    shippingMethod: 'Sirigata 3, 3324 Molde',
};

const mapStateToProps = state => ({
    productID: state.productOverlay.selectedProductID,
    showProductThumb: state.productThumb.showProductThumb,
    orientation: state.settings.screenOrientation,
    showCheckoutNow: state.ecommerce.showCheckoutNow,
    cart: state.ecommerce.productArray,
});

export default connect(mapStateToProps)(ProductOverlay);
