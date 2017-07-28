import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PenaltyCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'red',
        };
    }

    render() {
        return (
          <div className={`penalty-card ${this.props.open ? 'open' : ''}`} style={{ background: this.props.color }}>
            <span>{this.props.text}</span>
          </div>
        );
    }
}

PenaltyCard.defaultProps = {
    open: false,
    text: '',
    color: 'red',
};

PenaltyCard.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    color: PropTypes.string,
};

export default PenaltyCard;
