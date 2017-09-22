import React from 'react';

import productArray from '../../constants/products';

class Cart extends React.Component {
    getProduct = (productID) => {
        console.log(productArray);
        const thisProduct = productArray.products.find(
      product => product.productID === productID,
    );
        console.log(thisProduct);
        return thisProduct;
    };

    renderProductList() {
        let productList = [];
        let total = 0;
        for (var key in this.props.cart) {
            const thisProduct = this.getProduct(parseInt(key));
            const subtotal = thisProduct.price * this.props.cart[key];
            total += subtotal;
            productList.push(
        <tr>
          <td className="align-center">
            <img
              alt={thisProduct.productTitle}
              src={thisProduct.thumbnailImage}
            />
          </td>
          <td>{thisProduct.productTitle}</td>
          <td className="align-right">{this.props.cart[key]}</td>
          <td className="align-right">{thisProduct.price}</td>
          <td className="align-right">{subtotal}</td>
        </tr>,
      );
        }
        productList.push(
      <tr>
        <td colSpan={4} className="align-right">
          Total
        </td>
        <td className="align-right">{total}</td>
      </tr>,
    );

        return productList;
    }

    render() {
        return (
      <div className={`cart ${this.props.show ? 'show' : ''}`}>
        <div
          className="close-btn"
          onTouchTap={this.props.onHideCart}
          role="button"
          tabIndex="0"
        >
          {' '}
          <i className="fa fa-close" />
        </div>
        <table className="shopping-cart-table">
          <tr>
            <th colSpan={2} className="align-left">
              Item
            </th>
            <th className="align-right">Quantity</th>
            <th className="align-right">Price</th>
            <th className="align-right">Subtotal</th>
          </tr>
          {this.renderProductList()}
        </table>
        <div
          className="buy-btn"
          onTouchTap={this.props.onCompleteCheckout}
          role="button"
          tabIndex="0"
        >
          <span>{i18next.t('buttons_place_order')}</span>
        </div>
      </div>
        );
    }
}

export default Cart;
