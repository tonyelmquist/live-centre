import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import FidgetSpinner from '../components/buttons/FidgetSpinner';
import BurstButton from '../components/buttons/BurstButton';
import ChatOverlay from '../components/SecondLayer/ChatOverlay';
import PenaltyCard from '../components/SecondLayer/PenaltyCard';
import ScoreOverlay from '../components/SecondLayer/ScoreOverlay';
import LineupOverlay from '../components/SecondLayer/LineupOverlay';
import PopIndicator from '../components/SecondLayer/PopIndicator';
import PlayerInfoOverlay from '../components/SecondLayer/PlayerInfoOverlay';
import Replayer from '../components/VideoPlayer/Replayer';
import HighlightsRow from '../components/VideoPlayer/HighlightsRow';
import { toggleChatMenu, sendMessage } from '../actions/chatMessages';
import { hideHighlights } from '../actions/videoPlayer';

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
            isBurstButtonShowing: false,
            isLineupShowing: false,
            isPlayerInfoShowing: false,
            now: new Date().getTime(),
        };

        // this.state.socket.on('NEW_PENALTY_CARD', (data) => {
        //     self.setState({
        //         penaltyCard: {
        //             isShowing: true,
        //             text: data.message,
        //             color: data.type,
        //         },
        //     });

        //     setTimeout(() => {
        //         self.setState({
        //             penaltyCard: {
        //                 isShowing: false,
        //             },
        //         });
        //     }, 7000);
        // });

        this.onMessageSend = this.onMessageSend.bind(this);
        this.displayLineup = this.displayLineup.bind(this);
        this.moveToPlayerInfo = this.moveToPlayerInfo.bind(this);
        this.onPlayerInfoClose = this.onPlayerInfoClose.bind(this);
        this.onPlayerInfoBack = this.onPlayerInfoBack.bind(this);
        this.onLineupClose = this.onLineupClose.bind(this);
        this.handleHighlightsClose = this.handleHighlightsClose.bind(this);
    }

    onMessageSend(message) {
        this.props.dispatch(
      sendMessage(message),
    );
    }

    onPlayerInfoClose() {
        this.setState({
            isPlayerInfoShowing: false,
            isBurstButtonShowing: true,
        });
    }

    onPlayerInfoBack() {
        this.setState({
            isPlayerInfoShowing: false,
            isLineupShowing: true,
        });
    }

    onLineupClose() {
        this.setState({
            isLineupShowing: false,
            isBurstButtonShowing: true,
        });
    }

    moveToPlayerInfo() {
        this.setState({
            isLineupShowing: false,
            isPlayerInfoShowing: true,
        });
    }

    displayLineup(teamToDisplay) {
        this.setState({
            isBurstButtonShowing: false,
            isLineupShowing: true,
            teamToDisplay,
        });
    }

    handleHighlightsClose() {
        this.props.dispatch(hideHighlights());
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
        console.log(this.props.sportsInfo);
        return (
      <div className="data-overlay">
        <PenaltyCard
          open={this.state.penaltyCard.isShowing}
          text={this.state.penaltyCard.text}
          color={this.state.penaltyCard.color}
        />
        <ScoreOverlay
          score={this.props.score}
          teamOneData={this.getTeamDetails(this.teamOne)}
          teamTwoData={this.getTeamDetails(this.teamTwo)}
          onTeamOneClick={() => this.displayLineup(1)}
          onTeamTwoClick={() => this.displayLineup(2)}
        />
        <PopIndicator
          startTime={this.state.now}
          endTime={this.state.now + (1 * 60000)}
          onClick={() => console.log('click')}
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
          isShowing={this.state.isPlayerInfoShowing}
          onClose={this.onPlayerInfoClose}
          onRightButton={this.onPlayerInfoBack}
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
    chat: PropTypes.object.isRequired,
    replay: PropTypes.object.isRequired,
    highlights: PropTypes.object.isRequired,
    sportsInfo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    score: state.dataOverlay,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
    sportsInfo: state.sportsInfo,
});

export default connect(mapStateToProps)(DataOverlay);
