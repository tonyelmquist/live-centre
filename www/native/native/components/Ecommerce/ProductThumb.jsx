import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showProductOverlay } from '../../../../../native/shared/actions/videoPlayer';

import productArray from '../../../../../native/shared/constants/products';

class ProductThumb extends React.Component {
    product = (productID) => {
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        return thisProduct;
    };

    onShowProductOverlay = (e) => {
        e.stopPropagation();
        if (this.props.showProductThumb) {
            this.props.dispatch(showProductOverlay(this.props.productID));
        }
    };

    render() {
        let thisProduct = {};

        if (this.props.productID) { thisProduct = this.product(this.props.productID); }

        return (
      //     <div className={'productThumb ' + (props.highlighted ? 'highlighted' : '')} style={{ left: props.position + '%' }} >
      <div
        className={`productThumb ${this.props.show
          ? 'highlighted'
          : ''}`}
          onTouchTap={this.props.onSelectProduct}
      >
        <img
          src={thisProduct.thumbnailImage}
          alt={thisProduct.description}
          key={thisProduct.productID}
        />
      </div>
    );
    }
}

ProductThumb.propTypes = {
    productID: PropTypes.number.isRequired,
    showProductThumb: PropTypes.bool.isRequired,
};

ProductThumb.defaultProps = {
    productID: 0,
    showProductThumb: false,
};

export default ProductThumb;
