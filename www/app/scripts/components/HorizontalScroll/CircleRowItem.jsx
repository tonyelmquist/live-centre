import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';

const CircleRowItem = ({img, overlay, handleClick, style, size}) => {
    return (
        <div className="inline circleAvatar" onTouchTap={handleClick}>
            <Avatar size={size} style={style} src={img} className="avatar" />
            {overlay}
        </div>
    );
};

CircleRowItem.defaultProps = {
    size: 80,
};

CircleRowItem.propTypes = {
    size: PropTypes.int,
};
export default CircleRowItem;
