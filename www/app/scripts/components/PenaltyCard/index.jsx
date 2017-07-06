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
          <div className={`penalty-card ${this.props.open ? 'open' : ''}`}>
            <span>{this.props.text}</span>
          </div>
        );
    }
}

PenaltyCard.defaultProps = {
    open: false,
    text: '',
};

PenaltyCard.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
};

export default PenaltyCard;
