import React from 'react';
import Avatar from 'material-ui/Avatar';

const CircleRowItem = ({item, overlay}) => {
    return (
        <div className="inline circleAvatar" key={`circlerow-item-${item.key}`}>
            <Avatar size={80} src={item.img} className="avatar" />
            {overlay}
        </div>
    );
};

export default CircleRowItem;
