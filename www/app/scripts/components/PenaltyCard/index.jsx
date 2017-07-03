import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PenaltyCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`penalty-card ${this.props.open ? 'open' : ''}`}>
                <span>{this.props.text}</span>
            </div>
        );
    }
}

PenaltyCard.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
};

export default PenaltyCard;