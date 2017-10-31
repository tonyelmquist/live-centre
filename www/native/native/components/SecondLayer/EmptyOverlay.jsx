import React from 'react';
import PropTypes from 'prop-types';

const EmptyOverlay = (props) => {
    return (
        <div className={`empty-overlay ${props.isOpen ? 'isOpen' : ''}`}>
            {props.children}
            <button className="formBtn small secondaryBtn" style={{display: 'block'}} onClick={props.onClose}>Close</button>
        </div>
    );
}

EmptyOverlay.defaultProps = {
    children: (<div />),
};

EmptyOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default EmptyOverlay;
