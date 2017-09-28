import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const LoadingIcon = (props) => {
    return (
        <div style={{
            position: 'absolute',
            top: '45vh',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'auto',
            filter: 'drop-shadow(5px 5px 5px #222)',
            ...props.style,
        }}>
            <FontAwesome name={props.type} spin size={props.size} />
        </div>
    );
};

LoadingIcon.defaultProps = {
    type: 'refresh',
    style: {},
    size: '2x',
};

LoadingIcon.propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.string,
};
export default LoadingIcon;
