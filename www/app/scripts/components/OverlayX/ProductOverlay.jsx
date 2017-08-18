import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import productArray from '../../constants/products';
import { hideProductOverlay } from '../../actions/videoPlayer';
import { Orientation } from '../../constants/reduxConstants';

class ProductOverlay extends Component {
    product = (productID) => {
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        return thisProduct;
    };

    onHideProductOverlay = () => {
        this.props.dispatch(hideProductOverlay());
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
      >
        <img
          src={product.thumbnailImage}
          alt={product.description}
          productId={product.productID}
          className="product-overlay-image"
        />
        <p className="product-description"> {product.description}</p>
        <div
          className="close-btn"
          onTouchTap={() => this.onHideProductOverlay()}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-close" />
          </div>
          <p className="product-price">Price: {product.price}</p>      
          <div
          className="buy-btn"
          onTouchTap={() => this.onHideProductOverlay()}
          role="button"
          tabIndex="0"
        >
        
          <span>{i18next.t('buttons_buy_now')}</span>
          {/*<i className="fa fa-shopping-cart" />*/}
        </div>
      </div>
        );
    }
}

ProductOverlay.propTypes = {
    showProductOverlay: PropTypes.bool.isRequired,
    productID: PropTypes.number.isRequired,
    orientation: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

ProductOverlay.defaultProps = {
    showProductOverlay: false,
    productID: 0,
};

const mapStateToProps = state => ({
    productID: state.productThumb.productID,
    showProductThumb: state.productThumb.showProductThumb,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(ProductOverlay);
