import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoX from './VideoX';
import ContentX from './ContentX';
import { sendMessage } from '../../actions/chatMessages';

import { maximizeOverlayX, minimizeOverlayX, closeOverlayX } from '../../actions/overlayX';

class OverlayX extends Component {

    onMessageSend = (message) => {
        this.props.dispatch(sendMessage(`User ${Math.round(Math.random() * 100)}`, message));
    }

    render() {
        console.log(this.props.video);
        return (
            <div className={`overlay-x-container ${this.props.overlayX.maximized ? 'maximized' : 'minimized'} ${this.props.overlayX.open ? 'open' : 'closed'}`}>
                <VideoX currentTime={this.props.playback.currentTime} updateTime={this.updateTime} resetTime={this.resetTime} screenOrientation={this.props.settings.screenOrientation} onMaximize={this.onMaximize} onMinimize={this.onMinimize} isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} videoUrl={this.props.video.videoUrl} />
                <ContentX isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized} onMessageSend={this.onMessageSend} chat={this.props.chat.messages}/>
            </div>
        );
    }
}

OverlayX.propTypes = {

};

const mapStateToProps = state => ({
    video: state.playback.video,
    settings: state.settings,
    overlayX: state.overlayX,
    playback: state.playback,
    chat: state.chat,
});

export default connect(mapStateToProps)(OverlayX);