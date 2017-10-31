import React from 'react';

const BuyNow = (props) => {
    const componentClasses = ['buy-now'];
    if (props.show) {
        componentClasses.push('show');
    }

    return (
    <div className={componentClasses.join(' ')}>
      <span className="payment-label">Pay using</span>
      <select className="payment-method" value={props.paymentMethod}>
        <option value="A">**** **** **** 4192</option>
        <option value="B">***** *** **** 7024</option>
      </select>
      <span className="payment-label">Ship to</span>
      <select className="shipping-method" value={props.shippingMethod}>
        <option value="A">Sirigata 3, 3324 Molde</option>
        <option value="B">Oppdalsveien 44B, 1102 Hell</option>
      </select>
      <div
        className="buy-btn"
        onTouchTap={props.onCompleteBuyNow}
        role="button"
        tabIndex="0"
      >
        <span>
          {i18next.t('buttons_place_order')}
        </span>
      </div>
    </div>
    );
};

export default BuyNow;
