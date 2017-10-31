import React from 'react';

const ProductDetails = (props) => {
    const componentClasses = ['product-details'];
    if (props.show) {
        componentClasses.push('show');
    }

    return (
    <div className={componentClasses.join(' ')}>
      <div className="product-description">
        <p>
          {props.description}
        </p>
        <p>
          Price: {props.price}
        </p>
      </div>

      <div
        className="cart-btn"
        onTouchTap={props.onAddToCart}
        role="button"
        tabIndex="0"
      >
        <span>
          {i18next.t('buttons_add_to_cart')}
        </span>
      </div>
      <div
        className="buy-btn"
        onTouchTap={props.onBuyNow}
        role="button"
        tabIndex="0"
      >
        <span>
          {i18next.t('buttons_buy_now')}
        </span>
      </div>
    </div>
    );
};

export default ProductDetails;
