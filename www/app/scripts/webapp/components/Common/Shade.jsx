import React from 'react';
import PropTypes from 'prop-types';

export default function Shade({ onoff, onTouch }) {
    return (
        <div className={`shade ${onoff ? 'is-on' : 'is-off'}`} onTouchTap={onTouch} />
    );
}

Shade.propTypes = {
    onoff: PropTypes.bool.isRequired,
    onTouch: PropTypes.func.isRequired,
};
