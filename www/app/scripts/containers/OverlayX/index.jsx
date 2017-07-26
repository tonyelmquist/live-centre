import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoX from './VideoX';
import ContentX from './ContentX';
import { sendMessage } from '../../actions/chatMessages';
import { toggleCollapseInfo, collapseInfo } from '../../actions/overlayX';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import { maximizeOverlayX, minimizeOverlayX, closeOverlayX } from '../../actions/overlayX';

class OverlayX extends Component {

    onMessageSend = (message) => {
        this.props.dispatch(sendMessage(`User ${Math.round(Math.random() * 100)}`, message));
    }

    toggleCollapseInfo = () => {
        this.props.dispatch(toggleCollapseInfo())
    }

    collapseInfo = () => {
        this.props.dispatch(collapseInfo())
    }

    render() {
        if (typeof this.props.video.id !== "undefined") {
            return (
            <div className={`overlay-x-container ${this.props.overlayX.maximized ? 'maximized' : 'minimized'} ${this.props.overlayX.open ? 'open' : 'closed'}`}>
                <VideoX
                    currentTime={this.props.playback.currentTime}
                    updateTime={this.updateTime}
                    resetTime={this.resetTime}
                    screenOrientation={this.props.settings.screenOrientation}
                    onMaximize={this.onMaximize}
                    onMinimize={this.onMinimize}
                    isOpen={this.props.overlayX.open}
                    isMaximized={this.props.overlayX.maximized}
                    videoUrl={this.props.video.videoUrl} />
                <ContentX
                    video={this.props.video}
                    allVideos={this.props.allVideos}
                    isOpen={this.props.overlayX.open}
                    isMaximized={this.props.overlayX.maximized}
                    onMessageSend={this.onMessageSend}
                    chat={this.props.chat.messages}
                    series={this.props.series}
                    seasons={this.props.seasons}
                    tags={this.props.tags}
                    collapseInfo={this.collapseInfo}
                    toggleCollapseInfo={this.toggleCollapseInfo}
                    isCollapsed={this.props.overlayX.collapsedInfo}
                />
            </div>
            );
        }
        if (this.props.video) {
            return (
                <div />
            );
        }
        return <div />;
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
    seasons: state.seasons,
    series: state.series,
    allVideos: state.videos,
    tags: state.tags,
});

export default connect(mapStateToProps)(OverlayX);



                    // allVideos={this.props.allVideos}