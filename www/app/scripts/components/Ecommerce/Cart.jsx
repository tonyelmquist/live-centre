import React from 'react';

const Cart = (props) => {
    return (
    <div className={`cart ${props.show
          ? 'show'
          : ''}`}
    >
     <div
          className="close-btn"
          onTouchTap={props.onHideCart}
          role="button"
          tabIndex="0"
        >
          {' '}<i className="fa fa-close" />
        </div>
          I AM A SHOPPING CART!
          </div>);
};

export default Cart;
