import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PenaltyCard from '../../components/SecondLayer/PenaltyCard';
import ScoreOverlay from '../../components/SecondLayer/ScoreOverlay';
import PlayerInfoOverlay from '../../components/SecondLayer/PlayerInfoOverlay';
import LineupOverlay from '../../components/SecondLayer/LineupOverlay';
import TickerContainer from '../../components/SecondLayer/TickerContainer';
import { getMatchData, getPlayerData } from '../../utils/loadMatchData';
import { changeScore, changeClock } from '../../actions/secondLayer';
import TimelineManager from '../../utils/Managers/TimelineManager';

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

    timelineManager = new TimelineManager();

    componentDidUpdate() {
        if (typeof this.props.matches[this.props.video.matchId] !== 'undefined' && this.timelineManager.timeline !== this.props.matches[this.props.video.matchId]) {
            this.timelineManager.timeline = this.props.matches[this.props.video.matchId].timeline;
            this.timelineManager.buffer = this.props.video.matchStart;
        }

        // this.largeVideoPlayer.video.addEventListener('timeupdate', () => {
        //     this.timelineManager.setActiveTimelineEvents(this.largeVideoPlayer.video.currentTime * 1000);

        //     // Control Score
        //     if (this.timelineManager.activeEvents.length > 0) {
        //         const periodStart = this.timelineManager.activeEvents.filter(value => value.type === 'period_start' && value.period === 2);
        //         const breakStart = this.timelineManager.activeEvents.filter(value => value.type === 'break_start');
        //         if (periodStart.length > 0) {
        //             const clock =
        //                     (((this.largeVideoPlayer.video.currentTime * 1000)
        //                     - parseInt(this.props.video.matchStart)
        //                     - (new Date(periodStart[0].time) - new Date(this.timelineManager.activeEvents[0].time)))
        //                     + 2700000);

        //             this.props.dispatch(changeClock(clock));
        //         } else if (breakStart.length > 0) {
        //             if (this.props.dataOverlayClock !== 2700000) {
        //                 this.props.dispatch(changeClock(2700000));
        //             }
        //         } else {
        //             const clock = (this.largeVideoPlayer.video.video.currentTime * 1000) - this.props.video.matchStart;
        //             this.props.dispatch(changeClock(clock));
        //         }
        //     } else if (this.props.dataOverlayClock !== 0) {
        //         this.props.dispatch(changeClock(0));
        //     }
        // });

        // // Setting Score
        // let newScore = { home: 0, away: 0 };
        // // Go backwards through the array and get the first instance of 'score_change'
        // for (let i = 0; i < this.timelineManager.activeEvents.length; i++) {
        //     if (this.timelineManager.activeEvents[i].type === 'score_change') {
        //         newScore = {
        //             home: this.timelineManager.activeEvents[i].home_score,
        //             away: this.timelineManager.activeEvents[i].away_score,
        //         };
        //     }
        // }

        // // console.log(this.props.dataOverlayScore, newScore, this.props.dataOverlayScore.home !== newScore.home || this.props.dataOverlayScore.away !== newScore.away);
        // if (this.props.dataOverlayScore.home !== newScore.home || this.props.dataOverlayScore.away !== newScore.away) {
        //     this.props.dispatch(changeScore(newScore));
        // }
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
            isPlayerInfoShowing: false,
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
                    score={this.props.dataOverlayScore}
                    homeData={this.getHomeTeam()}
                    awayData={this.getAwayTeam()}
                    onHomeTeamClick={() => this.displayLineup(1)}
                    onAwayTeamClick={() => this.displayLineup(2)}
                    clock={this.props.dataOverlayClock}
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
    video: state.playback.video,
    dataOverlayScore: state.dataOverlay.score,
    dataOverlayClock: state.dataOverlay.clock,
    chat: state.chat,
    replay: state.replay,
    highlights: state.highlights,
    sportsInfo: state.sportsInfo,
    popNotifications: state.notifications.popNotifications,
    playback: state.playback,
    selectedVideo: state.playback.video,
    matches: state.sportsInfo.matches,
});

export default connect(mapStateToProps)(SoccerDataOverlay);
