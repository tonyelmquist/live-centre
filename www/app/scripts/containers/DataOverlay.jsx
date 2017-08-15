import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import FidgetSpinner from '../components/buttons/FidgetSpinner';
import BurstButton from '../components/buttons/BurstButton';
import ChatOverlay from '../components/SecondLayer/ChatOverlay';
import PenaltyCard from '../components/SecondLayer/PenaltyCard';
import ScoreOverlay from '../components/SecondLayer/ScoreOverlay';
import EmptyOverlay from '../components/SecondLayer/EmptyOverlay';
import LineupOverlay from '../components/SecondLayer/LineupOverlay';
import PopIndicatorManager from '../components/SecondLayer/PopIndicatorManager';
import PlayerInfoOverlay from '../components/SecondLayer/PlayerInfoOverlay';
import Replayer from '../components/VideoPlayer/Replayer';
import HighlightsRow from '../components/VideoPlayer/HighlightsRow';
import { toggleChatMenu, sendMessage } from '../actions/chatMessages';
import { removeNotification } from '../actions/notifications';
import { hideHighlights, isVideoSettingsOpen } from '../actions/videoPlayer';
import { newNotification } from '../actions/notifications';

class DataOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            penaltyCard: {
                isShowing: false,
                text: '',
                color: '',
            },
            fidgetSpinner: {
                isShowing: false,
            },
            selectedPlayer: null,
            isBurstButtonShowing: false,
            isLineupShowing: false,
            isPlayerInfoShowing: false,
            isSettingsOverlayShowing: false,
        };

        window.addEventListener('keydown', (e) => {
            console.log(e.keyCode);

            if (e.shiftKey && e.keyCode === 81) {
                console.log('notification');
                this.props.dispatch(newNotification(Math.round(Math.random() * 100), "data.message", 2, new Date().getTime()));
            }
        });
    }

    onMessageSend = (message) => {
        this.props.dispatch(
      sendMessage(message),
    );
    }

    onPlayerInfoClose = () => {
        this.setState({
            isPlayerInfoShowing: false,
            isBurstButtonShowing: true,
        });
    }

    onPlayerInfoBack = () => {
        this.setState({
            isPlayerInfoShowing: false,
            isLineupShowing: true,
        });
    }

    onLineupClose = () => {
        this.setState({
            isLineupShowing: false,
            isBurstButtonShowing: true,
        });
    }

    moveToPlayerInfo = (player) => {
        this.setState({
            selectedPlayer: player,
            isLineupShowing: false,
            isPlayerInfoShowing: true,
        });
    }

    displayLineup = (teamToDisplay) => {
        this.setState({
            isBurstButtonShowing: false,
            isLineupShowing: true,
            teamToDisplay,
        });
    }

    handleHighlightsClose = () => {
        this.props.dispatch(hideHighlights());
    }

    removeNotification = (id) => {
        this.props.dispatch(removeNotification(id));
    }

    getTeamDetails = (team) => {
        if (typeof this.props.sportsInfo.teams[team] === 'undefined') {
            console.warn('Attempted to get no existant team - ', team, ' - check line 112 DataOverlay');
            return {};
        }

        return this.props.sportsInfo.teams[team];
    }

    teamOne = 'Barcelona';
    teamTwo = 'RealMadrid';

    render() {
        return (
      <div className="data-overlay">
        {/*<PenaltyCard
          open={this.state.penaltyCard.isShowing}
          text={this.state.penaltyCard.text}
          color={this.state.penaltyCard.color}
        />*/}
        <ScoreOverlay
          score={this.props.score}
          teamOneData={this.getTeamDetails(this.teamOne)}
          teamTwoData={this.getTeamDetails(this.teamTwo)}
          onTeamOneClick={() => this.displayLineup(1)}
          onTeamTwoClick={() => this.displayLineup(2)}
        />
        <PopIndicatorManager
          removeNotification={id => this.removeNotification(id)}
          notifications={this.props.notifications}
        />
        <LineupOverlay
          isShowing={this.state.isLineupShowing}
          teamOneData={this.getTeamDetails(this.teamOne)}
          teamTwoData={this.getTeamDetails(this.teamTwo)}
          onClose={this.onLineupClose}
          teamToDisplay={this.state.teamToDisplay}
          onIconClick={this.moveToPlayerInfo}
        />
        <PlayerInfoOverlay
          player={this.state.selectedPlayer}
          isShowing={this.state.isPlayerInfoShowing}
          onClose={this.onPlayerInfoClose}
          onRightButton={this.onPlayerInfoBack}
        />
        <EmptyOverlay
            isOpen={this.props.playback.isVideoSettingsOpen}
            onClose={() => this.props.dispatch(isVideoSettingsOpen(false))}
        />
        {this.props.replay.replayerOpen &&
          <Replayer
            open={this.props.replay.replayerOpen}
            videoUrl={this.props.replay.videoUrl}
            timestamp={this.props.replay.timestamp}
          />}
        {this.props.highlights.highlightsOpen &&
          <HighlightsRow
            open={this.props.highlights.highlightsOpen}
            highlights={this.props.highlights.highlights}
            videoUrl={this.props.highlights.videoUrl}
            handleClose={this.handleHighlightsClose}
          />}
      </div>
        );
    }
}

DataOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired,
    // chat: PropTypes.object.isRequired,
    replay: PropTypes.object.isRequired,
    highlights: PropTypes.object.isRequired,
    sportsInfo: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    score: state.dataOverlay,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
    sportsInfo: state.sportsInfo,
    notifications: state.notifications.notifications,
    playback: state.playback,
});

export default connect(mapStateToProps)(DataOverlay);
