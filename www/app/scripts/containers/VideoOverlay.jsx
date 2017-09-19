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
            <div className={`overlay-x-container ${this.props.VideoOverlay.maximized ? 'maximized' : 'minimized'} ${this.props.VideoOverlay.open ? 'open' : 'closed'}`}>
                <PlayerMotionController
                    isOpen={this.props.VideoOverlay.open}
                    isMaximized={this.props.VideoOverlay.maximized}
                    ref={ref => (this.overlayRef = ref)}
                    orientation={this.props.orientation}
                    dispatch={this.props.dispatch}
                >
                    <Player />
                </PlayerMotionController>
                <ContentMotionController
                    isOpen={this.props.VideoOverlay.open}
                    isMaximized={this.props.VideoOverlay.maximized}
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
    VideoOverlay: PropTypes.object.isRequired,
    videoPlayerDimensions: PropTypes.object.isRequired,
    orientation: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    VideoOverlay: state.VideoOverlay,
    videoPlayer: state.videoPlayer,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(VideoOverlay);
