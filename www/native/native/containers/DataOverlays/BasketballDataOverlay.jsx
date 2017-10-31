import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBasketballGameData } from '../../../../../native/shared/utils/loadMatchData';

class BasketballDataOverlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isHomeRosterShowing: false,
            isAwayRosterShowing: false,
        };
    }

    componentWillMount = () => {
        this.getOverlayData();
    }


    getOverlayData = () => {
        console.log('Try to get overlaydata');
        // If this videos match data isn't in the store, retreive it
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            getBasketballGameData(this.props.selectedVideo.matchId);
        } else {
            console.log('Data for Match', this.props.sportsInfo.matches[this.props.selectedVideo.matchId]);
        }
    }

    showHomeRoster = () => {
        this.setState({ isHomeRosterShowing: !this.state.isHomeRosterShowing });
    }

    showAwayRoster = () => {
        this.setState({ isAwayRosterShowing: !this.state.isAwayRosterShowing });
    }

    stopPropagation = (e) => {
        e.stopPropagation();
    }

    render() {
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            return <div />;
        }

        const matchData = this.props.sportsInfo.matches[this.props.selectedVideo.matchId];
        return (
            <div className={`basketball-overlay ${this.props.show ? 'show' : ''}`}>
                <div className="basketball-overlay-center">
                    <div className="background-box">
                        <span className={`basketball-home ${this.state.isHomeRosterShowing ? 'isOpen' : ''}` } onTouchTap={this.showHomeRoster}>
                            {matchData.home.team.name}
                        </span>
                        <span className="vs">vs</span>
                        <span className={`basketball-away ${this.state.isAwayRosterShowing ? 'isOpen' : ''}`}onTouchTap={this.showAwayRoster}>
                            {matchData.away.team.name}
                        </span>
                    </div>
                </div>
                {/*<div className="basketball-overlay-home-name" onTouchTap={this.showHomeRoster}>
                    {matchData.home.team.name}
                </div>

                <div className="basketball-overlay-away-name" onTouchTap={this.showAwayRoster}>
                    {matchData.away.team.name}
                </div>*/}

                <div className={`basketball-overlay-home-roster ${this.state.isHomeRosterShowing ? 'isShowing' : ''}`} onTouchEnd={this.stopPropagation}>
                    <ul>
                        {matchData.home.lineup.map(value => <li>{value.full_name}</li>)}
                    </ul>
                </div>

                <div className={`basketball-overlay-away-roster ${this.state.isAwayRosterShowing ? 'isShowing' : ''}`} onTouchEnd={this.stopPropagation}>
                    <ul>
                        {matchData.away.lineup.map(value => <li>{value.full_name}</li>)}
                    </ul>
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
    show: state.overlayManager.showSportsOverlay,
});

export default connect(mapStateToProps)(BasketballDataOverlay);
