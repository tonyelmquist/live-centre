import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Icons/Spinner';

class SplashScreen extends Component {
    render() {
        let spinnerOpacity = this.props.isReady ? 0 : 1;
        return (
            <div className={`splash-screen ${this.props.isShowing ? 'isHidden' : ''}`}>
                <div className="welcome-text">
                    <span className="welcome">Welcome to the</span> <br />
                    <span className="title">IMR Media Center</span>
                </div>
                <div className="footer" style={{ opacity: spinnerOpacity, transition: '.5s all' }}>
                    Please wait while we prepare your demo...
                </div>
                <Spinner style={{ top: '60%', filter: 'none', opacity: spinnerOpacity, transition: '.5s all' }} />
            </div>
        );
    }
}

SplashScreen.propTypes = {
    isReady: PropTypes.bool.isRequired, 
    isShowing: PropTypes.bool.isRequired,
};

export default SplashScreen;