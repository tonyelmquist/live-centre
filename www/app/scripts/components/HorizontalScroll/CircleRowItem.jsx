import React from 'react';
import Avatar from 'material-ui/Avatar';

const CircleRowItem = ({img, overlay, handleClick, style}) => {
    return (
        <div className="inline circleAvatar" onTouchTap={handleClick}>
            <Avatar size={80} style={style} src={img} className="avatar" />
            {overlay}
        </div>
    );
};

export default CircleRowItem;
