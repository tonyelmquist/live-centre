import React from 'react';

const ChannelIcon = (props) => {
    console.log("activeFilter?", props.activeFilter);
    console.log("compare", props.activeFilter, props.name);
    const isActive = props.activeFilter === props.name;
    console.log(isActive);
    return (
        <div className={isActive ? 'inline scrollItem active' : 'inline scrollItem'} onTouchTap={props.handleClick} key={`scroll-item-${props.id}`}>
            <p className="channelIcon"><span className={props.icon} /></p>
            {props.overlay}
        </div>
    );
};

export default ChannelIcon;
