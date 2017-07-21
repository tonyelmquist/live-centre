import React from 'react';
import Avatar from 'material-ui/Avatar';

const CircleRowItem = ({key, img, overlay, handleClick}) => {
    return (
        <div className="inline circleAvatar" onTouchTap={handleClick} key={`circlerow-item-${key}`}>
            <Avatar size={80} src={img} className="avatar" />
            {overlay}
        </div>
    );
};

export default CircleRowItem;
