import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductThumb from '../../components/OverlayX/ProductThumb';
import ProductOverlay from '../../components/OverlayX/ProductOverlay';


class ECommerceOverlay extends Component {

    onShowProductOverlay

    render() {

        console.log(this.props);

        return (
            <div className={`ecommerce-overlay ${this.props.isOpen ? 'isOpen' : ''}`}>
            <ProductThumb productID={this.props.productID} showProductThumb={this.props.showProductThumb} onTouchTap={() => this.onShowProductOverlay()} />
            <ProductOverlay productID={this.props.productID} showProductOverlay={this.props.showProductOverlay} />
            </div>
        );
    }
}

ECommerceOverlay.defaultProps = {
    showProductOverlay: false,
    showProductThumb: false,
    showCheckoutNow: false,
    productID: 0,
    paymentMethod: '**** **** **** 4192',
    shippingMethod: 'Sirigata 3, 3324 Molde',
};


export default ECommerceOverlay;
