import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyOverlay from './EmptyOverlay';

class SettingsOverlay extends Component {
    handleCheck = () => {
        console.log("handle check");
        this.props.toggleTickers();
    }
    render() {
        return (
            <EmptyOverlay isOpen={this.props.isOpen} onClose={this.props.onClose}>
                <h1>Settings </h1>
                <p>Toggle soccer tickers <input type="checkbox" checked={this.props.showTickers} onChange={this.handleCheck} /></p>
            </EmptyOverlay>
        );
    }
}

SettingsOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    toggleSetting: PropTypes.func.isRequired,
};

export default SettingsOverlay;
