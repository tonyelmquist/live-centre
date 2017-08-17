import React from 'react';

const ScrollItem = (props) => {
    return (
        <div className="inline scrollItem" onTouchTap={props.handleClick} key={`scroll-item-${props.id}`}>
            <img src={props.img} className="itemImage" />
            {props.overlay}
        </div>
    );
};

export default ScrollItem;
