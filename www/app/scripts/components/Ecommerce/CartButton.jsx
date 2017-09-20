import React from 'react';
import FontAwesome from 'react-fontawesome';

const CartButton = (props) => {

    return (
        <div className={`shopping-cart ${props.show
          ? 'show'
          : ''}`}>
            <FontAwesome name="shopping-cart"/>
        </div>
    );
};

export default CartButton;
