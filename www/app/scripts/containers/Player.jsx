import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimelineManager from '../utils/Managers/TimelineManager';
import { maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../actions/overlayX';
import { Orientation } from '../constants/reduxConstants';
import DataOverlay from './DataOverlay';
import { showReplay, hideReplay, showHighlights, setControlBarVisibility, isVideoSettingsOpen, showProductOverlay, showProductThumb, hideProductThumb } from '../actions/videoPlayer';
import '../../../node_modules/video-react/dist/video-react.css';
import ProductThumb from '../components/OverlayX/ProductThumb';
import ProductOverlay from '../components/OverlayX/ProductOverlay';
import isDblTouchTap from '../utils/isDblTouchTap';
import { changeScore, changeClock } from '../actions/secondLayer';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import VideoControls from '../components/VideoPlayer/VideoControls';
import PrePlayOverlay from '../components/OverlayX/PrePlayOverlay';

const tickProximityInterval = 5000;
/**
 * Overlay Video Player.
 *
 * @class Player
 * @extends {React.Component}
 */
class Player extends React.Component {
    state = {
        isPreOverlayShowing: true,
        forcedLandscapeMode: false,
        productID: 0,
        showProductOverlay: false,
        showProductThumb: false,
        player: {
            playing: false,
        },
    };

    timelineManager = new TimelineManager();

    limit = 50;

    controlBarTimeoutTest1 = null;

    componentDidMount = () => {
        // this.largeVideoPlayer.subscribeToStateChange(this.handleStateChange.bind(this));

        if (typeof this.props.matches[this.props.video.matchId] !== 'undefined' && this.timelineManager.timeline !== this.props.matches[this.props.video.matchId]) {
            this.timelineManager.timeline = this.props.matches[this.props.video.matchId].timeline;
            this.timelineManager.buffer = this.props.video.matchStart;
        }

        this.largeVideoPlayer.video.addEventListener('timeupdate', () => {
            this.timelineManager.setActiveTimelineEvents(this.largeVideoPlayer.video.currentTime * 1000);

            // Control Score
            if (this.timelineManager.activeEvents.length > 0) {
                const periodStart = this.timelineManager.activeEvents.filter(value => value.type === 'period_start' && value.period === 2);
                const breakStart = this.timelineManager.activeEvents.filter(value => value.type === 'break_start');
                if (periodStart.length > 0) {
                    const clock =
                        (((this.largeVideoPlayer.video.currentTime * 1000)
                        - parseInt(this.props.video.matchStart)
                        - (new Date(periodStart[0].time) - new Date(this.timelineManager.activeEvents[0].time)))
                        + 2700000);

                    this.props.dispatch(changeClock(clock));
                } else if (breakStart.length > 0) {
                    if (this.props.dataOverlayClock !== 2700000) {
                        this.props.dispatch(changeClock(2700000));
                    }
                } else {
                    const clock = (this.largeVideoPlayer.video.video.currentTime * 1000) - this.props.video.matchStart;
                    this.props.dispatch(changeClock(clock));
                }
            } else if (this.props.dataOverlayClock !== 0) {
                this.props.dispatch(changeClock(0));
            }
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.player.playing !== this.state.player.playing) {
            this.handlePlayState();
        }
        if (!this.props.overlayX.open) {
            this.largeVideoPlayer.video.pause();
        }

        let newScore = { home: 0, away: 0 };
        // Go backwards through the array and get the first instance of 'score_change'
        for (let i = 0; i < this.timelineManager.activeEvents.length; i++) {
            if (this.timelineManager.activeEvents[i].type === 'score_change') {
                newScore = {
                    home: this.timelineManager.activeEvents[i].home_score,
                    away: this.timelineManager.activeEvents[i].away_score,
                };
            }
        }

        // console.log(this.props.dataOverlayScore, newScore, this.props.dataOverlayScore.home !== newScore.home || this.props.dataOverlayScore.away !== newScore.away);
        if (this.props.dataOverlayScore.home !== newScore.home || this.props.dataOverlayScore.away !== newScore.away) {
            this.props.dispatch(changeScore(newScore));
        }
    }

    componentWillUpdate = (nextProps) => {
        if (typeof this.props.matches[this.props.video.matchId] !== 'undefined' && this.timelineManager.timeline !== this.props.matches[nextProps.video.matchId].timeline) {
            this.timelineManager.timeline = this.props.matches[nextProps.video.matchId].timeline;
            this.timelineManager.buffer = this.props.video.matchStart;
        }

        if (
            typeof this.largeVideoPlayer !== 'undefined' &&
            this.largeVideoPlayer !== null
        ) {
            if (this.videoLoaded !== nextProps.video.videoUrl) {
                this.setState({ isPreOverlayShowing: true });
                this.largeVideoPlayer.video.load();

                this.videoLoaded = nextProps.video.videoUrl;
            }
        }
    };

    handlePlayState = () => {
        if (this.getVideoPlayer()) {
            if (this.state.player.playing) {
                this.getVideoPlayer().play();
            } else {
                this.getVideoPlayer().pause();
            }
        }
    }

    onPrePlayTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }

        this.setState({ isPreOverlayShowing: false });
        if (typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            this.playVideo();
            this.videoLoaded = this.props.video.videoUrl;

            this.props.dispatch(setControlBarVisibility(true));
            setTimeout(() => {
                if (!this.largeVideoPlayer.video.paused) {
                    this.props.dispatch(setControlBarVisibility(false));
                }
            }, 3000);
        }
    };

    onScroll = (e) => {
        // e.stopPropagation();
    }
    onCloseTouch = (e) => {
        // e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(closeOverlayX());
    };
    onMinimizeTouch = (e) => {
        // e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(minimizeOverlayX());
    };
    onShowProductOverlay = () => {
        this.props.dispatch(showProductOverlay());
    };
    tickInProximity = (currentTime) => {
        const currentTimeInMS = currentTime * 1000;
        const thisTimeline = this.props.video._timeline;
        if (thisTimeline.events !== undefined) {
            const currentEvent = thisTimeline.events.find(
            event => ((event.timestamp - tickProximityInterval < currentTimeInMS) && (currentTimeInMS < event.timestamp + tickProximityInterval)),
            );

            if (currentEvent !== undefined) {
                if (!this.props.showProductThumb) { this.props.dispatch(showProductThumb(currentEvent.productID)); }
            } else if (this.props.showProductThumb) { this.props.dispatch(hideProductThumb(0)); }
        }
    }
    showHighlights = (videoUrl, highlights) => {
        this.props.dispatch(showHighlights(videoUrl, highlights));
    };

    handleStateChange = (state, prevState) => {
        this.setState({
            player: state,
            currentTime: state.currentTime,
        });
        this.tickInProximity(state.currentTime);
    };

    onOpenSettings = () => {
        this.props.dispatch(isVideoSettingsOpen(true));
    };

    onTouchTap = (e) => {
        console.log('on touch tap');
        // document.activeElement.blur();
        // e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }
        this.props.dispatch(setControlBarVisibility(true));
        clearTimeout(this.controlBarTimeoutTest1);
        this.controlBarTimeoutTest1 = setTimeout(() => {
            if (!this.largeVideoPlayer.video.paused) {
                this.props.dispatch(setControlBarVisibility(false));
            }
        }, 3000);
    }

    getVideoPlayer = () => {
        if (typeof this.largeVideoPlayer !== 'undefined') {
            return this.largeVideoPlayer.video;
        }
        console.log('Could not find videoplayer');
        return null;
    }

    playVideo = () => {
        this.setState({ player: { playing: true } });
    }

    pauseVideo = () => {
        this.setState({ player: { playing: false } });
    }

    togglePlay = () => {
        if (this.state.player.playing) {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    }

    render() {
        return (
          <div onScroll={this.onScroll} onTouchTap={this.onTouchTap} >

            <VideoPlayer
                poster={this.props.video.thumbnail}
                source={`${this.props.video.videoUrl}#t=${this.props.videoPosition}`}
                ref={(ref) => { this.largeVideoPlayer = ref; }}
            />

            <VideoControls
                largeVideoPlayer={this.largeVideoPlayer}
                video={this.props.video}
                onOpenSettings={() => this.onOpenSettings()}
                showReplay={this.showReplay}
                controlBarVisibility={this.props.controlBarVisibility}
                togglePlay={this.togglePlay}
                playState={this.state.player}
                videoPlayer={this.getVideoPlayer()}
                orientation={this.props.orientation}
            />

            <PrePlayOverlay video={this.getVideoPlayer()} maximized={this.props.overlayX.maximized}
                orientation={this.props.orientation} isPreOverlayShowing={this.state.isPreOverlayShowing}
                onPrePlayTouch={this.onPrePlayTouch} onCloseTouch={this.onCloseTouch} onMinimizeTouch={this.onMinimizeTouch}
            />

            <ProductThumb productID={this.props.productID} showProductThumb={this.props.showProductThumb} onTouchTap={() => this.onShowProductOverlay()} />
            <ProductOverlay overlayMaximized={this.props.overlayX.maximized} productID={this.props.productID} showProductOverlay={this.props.showProductOverlay} />
            {this.props.orientation === Orientation.LANDSCAPE &&
            typeof this.largeVideoPlayer !== 'undefined' &&
            !this.state.isPreOverlayShowing &&
            this.props.video.matchId !== null
            ? <DataOverlay />
            : ''}

        </div>
        );
    }
}

Player.defaultProps = {
    videoPosition: 0,
    showProductOverlay: false,
    showProductThumb: false,
    productID: 0,
};

Player.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoPosition: PropTypes.number,
    orientation: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    overlayX: PropTypes.object.isRequired,
    productID: PropTypes.number.isRequired,
    showProductThumb: PropTypes.bool.isRequired,
    showProductOverlay: PropTypes.bool.isRequired,
    matches: PropTypes.object.isRequired,
    dataOverlayScore: PropTypes.object.isRequired,
    controlBarVisibility: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    videoPosition: state.playback.currentTime,
    controlBarVisibility: state.playback.controlBarVisibility,
    overlayX: state.overlayX,
    orientation: state.settings.screenOrientation,
    productID: state.productThumb.productID,
    showProductThumb: state.productThumb.showProductThumb,
    showProductOverlay: state.productOverlay.showProductOverlay,
    matches: state.sportsInfo.matches,
    dataOverlayScore: state.dataOverlay.score,
    dataOverlayClock: state.dataOverlay.clock,
});

export default connect(mapStateToProps)(Player);


 /* <Video playsInline poster={this.props.video.thumbnail} ref={ref => (this.largeVideoPlayer = ref)} >
              <ControlBar autoHide>
                <PlayToggle />
                { this.props.orientation === Orientation.LANDSCAPE ? <FontAwesome name="cog" style={settingsIconStyles} onTouchTap={this.onOpenSettings} /> : <div />}
                { this.props.orientation === Orientation.LANDSCAPE ? <FontAwesome name="undo" style={replayIconStyles} onTouchTap={() => this.showReplay(this.props.video.videoUrl, 0)} /> : <div />}
                { this.props.orientation === Orientation.LANDSCAPE ? <FontAwesome name="star" style={highlightsIconStyles} onTouchTap={() => this.showHighlights(this.props.video.videoUrl, [
                  { timestamp: 0, description: 'A HIGHLIGHT', thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png' },
                    {
                        timestamp: 10,
                        description: 'ANOTHER HIGHLIGHT',
                        title: 'ANOTHER HIGHLIGHT',
                        thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png',
                    },
                ])} /> : <div />}

              </ControlBar>
              <source src={`${this.props.video.videoUrl}#t=${this.props.videoPosition}`} />
            </Video> */
