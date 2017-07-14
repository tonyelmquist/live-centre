import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoX from './VideoX';
import ContentX from './ContentX';
import { setCurrentTimeInOverlayX, resetCurrentTimeInOverlayX } from '../../actions/overlayX';

import { maximizeOverlayX, minimizeOverlayX, closeOverlayX } from '../../actions/overlayX';

class OverlayX extends Component {

    

    updateTime = (time) => {
        this.props.dispatch(setCurrentTimeInOverlayX(time));
    }

    resetTime = () => {
        this.props.dispatch(resetCurrentTimeInOverlayX());
    }

    render() {
        return (
            <div className={`overlay-x-container ${this.props.overlayX.maximized ? 'maximized' : 'minimized'} ${this.props.overlayX.open ? 'open' : 'closed'}`}>
                <VideoX currentTime={this.props.playback.currentTime} updateTime={this.updateTime} resetTime={this.resetTime} screenOrientation={this.props.settings.screenOrientation} onMaximize={this.onMaximize} onMinimize={this.onMinimize} isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} videoUrl={this.props.videoUrl} />
                <ContentX isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} />
            </div>
        );
    }
}

OverlayX.propTypes = {

};

const mapStateToProps = state => ({
    videoUrl: state.playback.url,
    settings: state.settings,
    overlayX: state.overlayX,
    playback: state.playback,
});

export default connect(mapStateToProps)(OverlayX);