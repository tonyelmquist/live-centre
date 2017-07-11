import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import FidgetSpinner from '../components/FidgetSpinner';
import BurstButton from '../components/BurstButton';
import ChatOverlay from '../components/ChatOverlay';
import PenaltyCard from '../components/PenaltyCard';
import ScoreOverlay from '../components/ScoreOverlay';
import LineupOverlay from '../components/LineupOverlay';
import Replayer from '../components/Replayer';
import HighlightsRow from '../components/HighlightsRow';
import PlayerInfoOverlay from '../components/PlayerInfoOverlay';
import { toggleChatMenu, sendMessage } from '../actions/chatMessages';
import { hideHighlights } from '../actions/highlights';

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
            socket: io('localhost:3000'), // Connect to specific video channel in the future?
        };

        const self = this;

        this.state.socket.on('NEW_PENALTY_CARD', (data) => {
            self.setState({
                penaltyCard: {
                    isShowing: true,
                    text: data.message,
                    color: data.type,
                },
            });

            setTimeout(() => {
                self.setState({
                    penaltyCard: {
                        isShowing: false,
                    },
                });
            }, 7000);
        });

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
      sendMessage(`User ${Math.round(Math.random() * 100)}`, message),
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

    render() {
        const self = this;
        this.burstButtonLinks = [
            {
                id: 1,
                action() {
                    self.props.dispatch(toggleChatMenu());
                },
                icon: (
          <g>
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </g>
        ),
            },
            {
                id: 2,
                action() {
                },
                icon: (
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </g>
        ),
            },
            {
                id: 3,
                icon: (
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </g>
        ),
            },
            {
                id: 4,
                icon: (
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </g>
        ),
            },
            {
                id: 5,
                action() {
                    self.setState({ isPenaltyCardShowing: true });
                    setTimeout(() => {
                        self.setState({ isPenaltyCardShowing: false });
                    }, 7000);
                },
                icon: (
          <g>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </g>
        ),
            },
        ];

        return (
      <div>
        {/* <div className="trapezoid" />*/}
        {/* <div style={styles.dataStyle}>Score: {this.props.score}</div>*/}
         <BurstButton buttonLinks={this.burstButtonLinks} color="rgb(8, 3, 28)" hidden={this.state.isBurstButtonShowing} />
        <FidgetSpinner />
        <ChatOverlay
          open={this.props.chat.chatOpen}
          messages={this.props.chat.messages}
          onMessageSend={this.onMessageSend}
        />
        <PenaltyCard
          open={this.state.penaltyCard.isShowing}
          text={this.state.penaltyCard.text}
          color={this.state.penaltyCard.color}
        />
        <ScoreOverlay
          score={this.props.score}
          onTeamOneClick={() => this.displayLineup(1)}
          onTeamTwoClick={() => this.displayLineup(2)}
        />
        <LineupOverlay
          isShowing={this.state.isLineupShowing}
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
};

const mapStateToProps = state => ({
    score: state.dataOverlay,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
});

export default connect(mapStateToProps)(DataOverlay);
