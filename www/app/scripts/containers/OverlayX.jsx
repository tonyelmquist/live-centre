import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Overlay from '../components/OverlayX/Overlay';
import Player from './Player';
import ContentX from '../components/OverlayX/ContentX';
import { sendMessage } from '../actions/chatMessages';
import { toggleCollapseInfo, collapseInfo } from '../actions/overlayX';
import { videoSelected, markAsWishlist, resetCurrentTimeInPlayer } from '../actions/videoPlayer';

class OverlayX extends Component {

    onMessageSend = (message) => {
        this.props.dispatch(sendMessage(message));
    }

    toggleCollapseInfo = () => {
        console.log('toggle collapse');
        this.props.dispatch(toggleCollapseInfo());
    }

    collapseInfo = () => {
        this.props.dispatch(collapseInfo());
    }

    onTileOpen = (video) => {
        // this.props.dispatch(openOverlayX());
        // this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInPlayer());
    }

    handleAddToWishlist = (videoId) => {
        this.props.dispatch(markAsWishlist(videoId));
    }

    render() {
        if (typeof this.props.video.id !== 'undefined') {
            return (
            <div className={`overlay-x-container ${this.props.overlayX.maximized ? 'maximized' : 'minimized'} ${this.props.overlayX.open ? 'open' : 'closed'}`}>
                <Overlay isOpen={this.props.overlayX.open} isMaximized={this.props.overlayX.maximized}>
                    <Player />
                </Overlay>
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
                    onTileOpen={this.onTileOpen}
                    handleAddToWishlist={this.handleAddToWishlist}
                    isControlBarVisible={this.props.playback.controlBarVisibility}
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
    dispatch: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    overlayX: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    seasons: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired,
    allVideos: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
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
