import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerMotionController from '../components/VideoOverlay/MotionControllers/PlayerMotionController';
import ContentMotionController from '../components/VideoOverlay/MotionControllers/ContentMotionController';
import Player from './Player';
import VideoContent from '../components/VideoOverlay/VideoContent';
import FirebaseDB from '../utils/FirebaseDB';
import { getMessages } from '../actions/chatMessages';

class VideoOverlay extends Component {

    setChatChannel = () => {
        FirebaseDB.readMessagesInChannel(this.props.video.id, (value) => {
            this.props.dispatch(getMessages(value));
        });
    }


    render() {
        if (typeof this.props.video.id !== 'undefined') {
            this.setChatChannel();
            return (
            <div className={`overlay-x-container ${this.props.videoOverlay.maximized ? 'maximized' : 'minimized'} ${this.props.videoOverlay.open ? 'open' : 'closed'}`}>
                <PlayerMotionController
                    isOpen={this.props.videoOverlay.open}
                    isMaximized={this.props.videoOverlay.maximized}
                    ref={ref => (this.overlayRef = ref)}
                    orientation={this.props.orientation}
                    dispatch={this.props.dispatch}
                >
                    <Player />
                </PlayerMotionController>
                <ContentMotionController
                    isOpen={this.props.videoOverlay.open}
                    isMaximized={this.props.videoOverlay.maximized}
                    videoHeight={this.props.videoPlayer.dimensions.height}
                >
                    <VideoContent />
                </ContentMotionController>
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

VideoOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,
    videoOverlay: PropTypes.object.isRequired,
    videoPlayerDimensions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    videoOverlay: state.videoOverlay,
    videoPlayer: state.videoPlayer,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(VideoOverlay);
