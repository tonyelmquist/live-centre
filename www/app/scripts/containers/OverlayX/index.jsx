import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoX from './VideoX';
import ContentX from './ContentX';

import { maximizeOverlayX, minimizeOverlayX, closeOverlayX } from '../../actions/overlayX';

class OverlayX extends Component {

    onMaximize = () => {
        this.props.dispatch(maximizeOverlayX());
    }

    onMinimize = () => {
        if (!this.props.overlayX.maximized) {
            this.props.dispatch(closeOverlayX());
        } else {
            this.props.dispatch(minimizeOverlayX());
        }
    }

    render() {
        return (
            <div className={`overlay-x-container ${this.props.overlayX.maximized ? 'maximized' : 'minimized'} ${this.props.overlayX.open ? 'open' : 'closed'}`}>
                <VideoX onMaximize={this.onMaximize} onMinimize={this.onMinimize} isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} videoUrl={this.props.videoUrl} />
                <ContentX isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} />
            </div>
        );
    }
}

OverlayX.propTypes = {

};

const mapStateToProps = state => ({
    overlayX: state.overlayX,
    videoUrl: state.playback.url
});

export default connect(mapStateToProps)(OverlayX);