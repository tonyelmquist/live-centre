import React from 'react';
import FontAwesome from 'react-fontawesome';

const CartButton = (props) => {

    return (
        <FontAwesome
            onTouchTap={props.onShowCart}
            name="shopping-cart"
            style={{right: '40px', top: '0'}}
            className={`icon-shadow small-control shopping-cart ${props.show
            ? 'show'
            : ''} `}/>
    );
};

export default CartButton;
