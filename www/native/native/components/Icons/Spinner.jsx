import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Spinner = (props) => {
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
            <FontAwesome name={props.type} pulse size={props.size} />
        </div>
    );
};

Spinner.defaultProps = {
    type: 'spinner',
    style: {},
    size: '2x',
};

Spinner.propTypes = {
    type: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.string,
};
export default Spinner;
