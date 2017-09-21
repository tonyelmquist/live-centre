import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class BasketballDataOverlay extends Component {

    constructor(props) {
        super(props);
    }


    getOverlayData = () => {
        console.log('Try to get overlaydata');
        // If this videos match data isn't in the store, retreive it
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            getMatchData(this.props.selectedVideo.matchId);
        } else {
            console.log('Data for Match', this.props.sportsInfo.matches[this.props.selectedVideo.matchId]);
        }
    }

    render() {
        return (
            <div>
                <div style={{position: 'absolute', left: 200, top: 200}}>
                    Test
                </div>

            </div>
        );
    }
}

BasketballDataOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired,
    activeEvents: PropTypes.object.isRequired,
    // chat: PropTypes.object.isRequired,
    replay: PropTypes.object.isRequired,
    highlights: PropTypes.object.isRequired,
    sportsInfo: PropTypes.object.isRequired,
    popNotifications: PropTypes.array.isRequired,
    selectedVideo: PropTypes.object.isRequired,
    clock: PropTypes.number.isRequired,
    controlBarVisibility: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    currentTime: state.videoPlayer.currentVideoTime,
    video: state.playback.video,
    dataOverlayScore: state.dataOverlay.score,
    dataOverlayClock: state.dataOverlay.clock,
    activeEvents: state.dataOverlay.activeEvents,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
    sportsInfo: state.sportsInfo,
    popNotifications: state.notifications.popNotifications,
    playback: state.playback,
    selectedVideo: state.playback.video,
    matches: state.sportsInfo.matches,
});

export default connect(mapStateToProps)(BasketballDataOverlay);
