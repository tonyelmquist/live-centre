import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyOverlay from './EmptyOverlay';

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
            <div>
                <div className={`empty-overlay ${this.props.isOpen ? 'isOpen' : ''}`} style={{ padding: '40px' }} onTouchTap={this.handleTouch}>
                    <h2>Video settings</h2>
                    <p>Video speed</p>
                    <select>
                        <option value="slow">Slow: 0.5</option>
                        <option value="normal">Normal: 1.0</option>
                        <option value="normal">Fast: 1.5</option>
                    </select>
                    <h2>Sport video settings</h2>
                    <p>Show football commentaries <input type="checkbox" checked={this.props.showTickers} onChange={this.handleCheck} /></p>
                    <button className="formBtn small secondaryBtn" style={{display: 'block'}} onClick={this.props.onClose}>Close</button>
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
