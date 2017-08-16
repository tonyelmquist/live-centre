import React from 'react';

const ScrollItem = (props) => {
    return (
        <div className="inline scrollItem" onTouchTap={props.handleClick} key={`scroll-item-${props.id}`}>
            <img style={props.imgStyle} src={props.img} className="itemImage" />
            {props.overlay}
        </div>
    );
};

export default ScrollItem;
