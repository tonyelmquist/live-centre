import React, { Component } from 'react';
import PropTypes from 'prop-types';
import productArray from '../../constants/products';
import { Orientation } from '../../constants/reduxConstants';
import ProductDetails from '../Ecommerce/ProductDetails';
import BuyNow from '../Ecommerce/BuyNow';

class ProductOverlay extends Component {

    product = (productID) => {
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        return thisProduct;
    };



    render() {

        let product = { description: '', thumbnailImage: '', price: 0 };
        if (this.props.productID !== 0) {
            product = this.product(this.props.productID);
        }


        return (
      <div
        className={`product-overlay ${this.props.show
          ? 'isShowing'
          : ''} ${this.props.orientation === Orientation.PORTRAIT
          ? 'portrait'
          : ''}`}
        onTouchTap={e => e.stopPropagation()}
      >
        <div
          className="close-btn"
          onTouchTap={this.props.onHideProductOverlay}
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

        <BuyNow onCompleteBuyNow={this.props.onCompleteBuyNow} show={this.props.showBuyNow} />
        <ProductDetails
              description={product.description}
              price={product.price}
              onBuyNow={this.props.onBuyNow}
              onAddToCart={this.props.onAddToCart}
              show={!this.props.showBuyNow}
        />
      </div>
        );
    }
}

ProductOverlay.propTypes = {
    show: PropTypes.bool.isRequired,
    productID: PropTypes.number.isRequired,
    orientation: PropTypes.string.isRequired,
    showBuyNow: PropTypes.bool.isRequired,
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



export default ProductOverlay;
