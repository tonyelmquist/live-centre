import React from 'react';

const ScrollItem = ({key, img, overlay, handleClick}) => {
    return (
        <div className="inline scrollItem" onTouchTap={handleClick} key={`circlerow-item-${key}`}>
            <img size={80} src={img} className="itemImage" />
            {overlay}
        </div>
    );
};

export default ScrollItem;
