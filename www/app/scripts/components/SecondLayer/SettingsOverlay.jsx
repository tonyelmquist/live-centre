import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyOverlay from './EmptyOverlay';
import FontAwesome from 'react-fontawesome';

class SettingsOverlay extends Component {
    handleCheck = () => {
        //console.log("handle check");
        this.props.toggleTickers();
    }
    handleTouch = (e) => {
        //console.log(" TOUCH ");
        e.stopPropagation();
    }
    render() {
        return (
            <div className={`settings-overlay ${this.props.show ? 'show' : ''}`}>
                <div className={`empty-overlay ${this.props.isOpen ? 'isOpen' : ''}`} style={{ padding: '40px' }} onTouchTap={this.handleTouch}>
                    <FontAwesome
                        className="close-button"
                        name="close"
                        size="2x"
                        style={{ position: 'fixed', right: '10px', top: '5px', zIndex: 3000 }}
                        onTouchTap={this.props.onClose}
                    />
                    <h2>Video settings</h2>
                    <p>Video speed</p>
                    <select>
                        <option value="slow">Slow: 0.5</option>
                        <option value="normal">Normal: 1.0</option>
                        <option value="normal">Fast: 1.5</option>
                    </select>
                    <h2>Sport video settings</h2>
                    <p>Show football commentaries <input type="checkbox" checked={this.props.showTickers} onChange={this.handleCheck} /></p>
                </div>
            </div>
        );
    }
}

SettingsOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    toggleSetting: PropTypes.func.isRequired,
};

export default SettingsOverlay;
