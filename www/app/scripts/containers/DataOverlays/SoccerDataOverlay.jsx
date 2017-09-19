import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PenaltyCard from '../../components/SecondLayer/PenaltyCard';
import ScoreOverlay from '../../components/SecondLayer/ScoreOverlay';
import PlayerInfoOverlay from '../../components/SecondLayer/PlayerInfoOverlay';
import LineupOverlay from '../../components/SecondLayer/LineupOverlay';
import TickerContainer from '../../components/SecondLayer/TickerContainer';
import { getMatchData, getPlayerData } from '../../utils/loadMatchData';

class SoccerDataOverlay extends Component {
    
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

    moveToPlayerInfo = (playerId) => {
        if (typeof this.props.sportsInfo.players[playerId] === 'undefined') {
            console.log('sport info undefined, getting data');
            getPlayerData(playerId, (player) => {
                this.setState({
                    selectedPlayer: player,
                    isLineupShowing: false,
                    isPlayerInfoShowing: true,
                });
            });
        } else {
            console.log('Data for Player', this.props.sportsInfo.players[playerId]);
            this.setState({
                selectedPlayer: this.props.sportsInfo.players[playerId],
                isLineupShowing: false,
                isPlayerInfoShowing: true,
            });
        }
    }

    displayLineup = (teamToDisplay) => {
        this.setState({
            isBurstButtonShowing: false,
            isLineupShowing: true,
            teamToDisplay,
        });
    }

    getTeamDetails = (team) => {
        console.log('team', team);
        if (typeof this.props.sportsInfo.teams[team] === 'undefined') {
            console.warn('Attempted to get no existant team - ', team, ' - check line 112 DataOverlay');
            return {};
        }

        return this.props.sportsInfo.teams[team];
    }

    getHomeTeam = () => {
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            return {
                jersey: {},
            };
        }
        return this.props.sportsInfo.matches[this.props.selectedVideo.matchId].home.team;
    }

    getAwayTeam = () => {
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            return {
                jersey: {},
            };
        }
        return this.props.sportsInfo.matches[this.props.selectedVideo.matchId].away.team;
    }

    getHomeLineup = () => {
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            return {
                jersey: {},
                starting_lineup: [],
            };
        }
        return this.props.sportsInfo.matches[this.props.selectedVideo.matchId].home.lineup;
    }

    getAwayLineup = () => {
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            return {
                jersey: {},
                starting_lineup: [],
            };
        }
        return this.props.sportsInfo.matches[this.props.selectedVideo.matchId].away.lineup;
    }

    render() {
        return (
            <div>
                {/* <PenaltyCard
                    open={this.state.penaltyCard.isShowing}
                    text={this.state.penaltyCard.text}
                    color={this.state.penaltyCard.color}
                />*/}
                <ScoreOverlay
                    score={this.props.score}
                    homeData={this.getHomeTeam()}
                    awayData={this.getAwayTeam()}
                    onHomeTeamClick={() => this.displayLineup(1)}
                    onAwayTeamClick={() => this.displayLineup(2)}
                    clock={this.props.clock}
                />
                <LineupOverlay
                    isShowing={this.state.isLineupShowing}
                    homeData={this.getHomeLineup()}
                    awayData={this.getAwayLineup()}
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
                <TickerContainer
                    isLineupShowing={this.state.isLineupShowing}
                    controlBarVisibility={this.props.controlBarVisibility}
                />

            </div>
        );
    }
}

SoccerDataOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    score: PropTypes.object.isRequired,
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
    score: state.dataOverlay.score,
    clock: state.dataOverlay.clock,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
    sportsInfo: state.sportsInfo,
    popNotifications: state.notifications.popNotifications,
    playback: state.playback,
    selectedVideo: state.playback.video,
});

export default connect(mapStateToProps)(SoccerDataOverlay);
