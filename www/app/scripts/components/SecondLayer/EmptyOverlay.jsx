import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmptyOverlay extends Component {
    render() {
        return (
            <div className={`empty-overlay ${this.props.isOpen ? 'isOpen' : ''}`}>
                <p>Settings here</p>
                <button onClick={this.props.onClose}>Close</button>
            </div>
        );
    }
}

EmptyOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EmptyOverlay;