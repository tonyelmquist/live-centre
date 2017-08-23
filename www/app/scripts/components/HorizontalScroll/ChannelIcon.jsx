import React from 'react';

const ChannelIcon = (props) => {
    const isActive = props.activeFilter === props.name;
    return (
        <div className={isActive ? 'inline scrollItem active' : 'inline scrollItem'} onTouchTap={props.handleClick} key={`scroll-item-${props.id}`}>
            <p className="channelIcon"><span className={props.icon} /></p>
            {props.overlay}
        </div>
    );
};

export default ChannelIcon;
