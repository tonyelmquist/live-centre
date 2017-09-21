import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PenaltyCard from '../../components/SecondLayer/PenaltyCard';
import ScoreOverlay from '../../components/SecondLayer/ScoreOverlay';
import PlayerInfoOverlay from '../../components/SecondLayer/PlayerInfoOverlay';
import LineupOverlay from '../../components/SecondLayer/LineupOverlay';
import TickerContainer from '../../components/SecondLayer/TickerContainer';
import { getMatchData, getPlayerData } from '../../utils/loadMatchData';
import { changeScore, changeClock, setActiveEvents } from '../../actions/dataOverlay';
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

    componentDidUpdate(prevProps) {
        const matchTimeline = this.props.matches[this.props.video.matchId].timeline;

        // Check if we can get the timeline at all. Before we do anything.
        if (matchTimeline){
            //If this is new/different match timeline, set it in the timelinemanager. Also set start buffer.
            if (this.timelineManager.timeline !== matchTimeline) {
                this.timelineManager.timeline = matchTimeline;
                this.timelineManager.buffer = this.props.video.matchStart;
            }


            // If time has changed update the overlay based on new events. 
            if (prevProps.currentTime !== this.props.currentTime) {
                //The active timeline events are now anything happened after currentTime. 
                this.timelineManager.setActiveTimelineEvents(this.props.currentTime * 1000);

                //If thhere are active events, set the clock, score and change the tickers. 
                if (this.timelineManager.activeEvents.length > 0){
                    const activeEvents = this.timelineManager.activeEvents;
                    this.setClock(activeEvents);
                    this.setScore(activeEvents);
                    this.props.dispatch(setActiveEvents(activeEvents));
                    
                    
                } else {
                    this.props.dispatch(changeClock(0));
                }
            }
        }
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

    // Setting sports score
    setScore = (activeEvents) => {
        let newScore = { home: 0, away: 0 };
        // Go backwards through the array and get the first instance of 'score_change'
        for (let i = 0; i < activeEvents.length; i++) {
            if (activeEvents[i].type === 'score_change') {
                newScore = {
                    home: activeEvents[i].home_score,
                    away: activeEvents[i].away_score,
                };
            }
        }
        if (this.props.dataOverlayScore.home !== newScore.home || this.props.dataOverlayScore.away !== newScore.away) {
            this.props.dispatch(changeScore(newScore));
        }
    }

    //Parse and set the clock. 
    setClock = (activeEvents) => {
        const periodStart = activeEvents.filter(value => value.type === 'period_start' && value.period === 2);
        const breakStart = activeEvents.filter(value => value.type === 'break_start');
        if (periodStart.length > 0) {
            const clock =
                    (((this.props.currentTime * 1000)
                    - parseInt(this.props.video.matchStart)
                    - (new Date(periodStart[0].time) - new Date(activeEvents[0].time)))
                    + 2700000);

            this.props.dispatch(changeClock(clock));
        } else if (breakStart.length > 0) {
            if (this.props.dataOverlayClock !== 2700000) {
                this.props.dispatch(changeClock(2700000));
            }
        } else {
            console.log('VIDEO', this.props.video);
            const clock = (this.props.currentTime * 1000) - this.props.video.matchStart;
            this.props.dispatch(changeClock(clock));
        }
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


    getOverlayData = () => {
        console.log('Try to get overlaydata');
        // If this videos match data isn't in the store, retreive it
        if (typeof this.props.sportsInfo.matches[this.props.selectedVideo.matchId] === 'undefined') {
            getMatchData(this.props.selectedVideo.matchId);
        } else {
            console.log('Data for Match', this.props.sportsInfo.matches[this.props.selectedVideo.matchId]);
        }
    }

    getLatestTickers = () => {
        const tickers = this.props.activeEvents;
        // if(tickers.length > 20){
        //     return tickers.slice(Math.max(tickers.length - 20, 1));
        // }
        return tickers;
    }

    render() {
        this.getOverlayData();

        return (
            <div>
                {/* <PenaltyCard
                    open={this.state.penaltyCard.isShowing}
                    text={this.state.penaltyCard.text}
                    color={this.state.penaltyCard.color}
                />*/}
                {/* <TickerContainer
                    isLineupShowing={this.state.isLineupShowing}
                    controlBarVisibility={this.props.controlBarVisibility}
                    messages={this.getLatestTickers()}
                    matchInfo={this.props.matches[this.props.video.matchId]}
                /> */}
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

            </div>
        );
    }
}

SoccerDataOverlay.propTypes = {
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

export default connect(mapStateToProps)(SoccerDataOverlay);
