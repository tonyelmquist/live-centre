import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showProductOverlay } from '../../actions/videoPlayer';

import productArray from '../../constants/products';

class ProductThumb extends React.Component {
    product = (productID) => {
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        return thisProduct;
    };

    onShowProductOverlay = () => {
        this.props.dispatch(showProductOverlay());
    };

    render() {
        let thisProduct = {};

        if (this.props.productID) { thisProduct = this.product(this.props.productID); }

        return (
      //     <div className={'productThumb ' + (props.highlighted ? 'highlighted' : '')} style={{ left: props.position + '%' }} >
      <div
        className={`productThumb ${this.props.showProductThumb
          ? 'highlighted'
          : ''}`}
          onTouchTap={() => this.onShowProductOverlay()}
      >
        <img
          src={thisProduct.thumbnailImage}
          alt={thisProduct.description}
          productId={thisProduct.productID}
        />
      </div>
    );
    }
}

ProductThumb.propTypes = {
    productID: PropTypes.number.isRequired,
    showProductThumb: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

ProductThumb.defaultProps = {
    productID: 0,
    showProductThumb: false,
};

const mapStateToProps = state => ({
    productID: state.productThumb.productID,
    showProductThumb: state.productThumb.showProductThumb,
});

export default connect(mapStateToProps)(ProductThumb);
