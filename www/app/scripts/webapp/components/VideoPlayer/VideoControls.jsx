import React from 'react';
import PropTypes from 'prop-types';
import { HighlightsControl, ReplayControl, SettingsControl, PlayToggle, VolumeControl, ForwardControl, BackwardControl } from './Controls';
import ProgressBar from './ProgressBar';
import Replayer from './Replayer';
import HighlightsRow from './HighlightsRow';
import LoadingIcon from '../Icons/LoadingIcon';
import { showReplay, hideReplay, showHighlights, setControlBarVisibility,
    isVideoSettingsOpen, showProductOverlay, showProductThumb,
     updateCurrentTime, changeCurrentTime, skipCurrentTimeBy, setDuration, playVideo, pauseVideo, toggleVideoTickers, videoSelected } from '../../../shared/actions/videoPlayer';
import SettingsOverlay from '../SecondLayer/SettingsOverlay';
import {
  showSettingsOverlay,
  showAllOverlays,
} from '../../../shared/actions/overlayManager';
import { connect } from 'react-redux';

import { Orientation } from '../../../shared/constants/reduxConstants';

class VideoControls extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            replay: {
                showReplay: false,
                open: false,
                timestamp: 0,
                videoUrl: '',
            },
            highlights: {
                open: false,
                videoUrl: '',
            },
            player: {
                timeupdate: false,
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.controlBarVisibility !== this.props.controlBarVisibility
            || nextProps.videoPlayer.isPlaying !== this.props.videoPlayer.isPlaying
            || nextProps.orientation !== this.props.orientation
            || nextProps.isVideoSettingsOpen !== this.props.isVideoSettingsOpen
            || nextState.replay.showReplay !== this.state.replay.showReplay
            || nextProps.videoSettings.showTickers !== this.props.videoSettings.showTickers
            || nextProps.videoPlayer.isWaiting !== this.props.videoPlayer.isWaiting
            || nextState.replay.open !== this.state.replay.open){
            return true;
        } else if (!this.props.controlBarVisibility) {
            return false;
        }
        return true;
    }

    //Closes settings, recommendations and replay
    closeAllOverlays = ( ) => {
        console.log("Close all overlays");
        this.closeSettings();
        this.handleHighlightsClose();
        this.hideReplay();
    }


    showReplay = (e) => {
        //
        console.log(this.state.replay, 'REPLAY STATE');
        if (this.controlsAreVisible() && !this.state.replay.showReplay) {
            e.stopPropagation();
            this.closeAllOverlays();
            this.hideControlBar();

            const currentTime = this.props.videoPlayer.currentVideoTime;
            const newTime = currentTime - 10;
            console.log('show replayer');
            this.setState({
                replay: {
                    showReplay: true,
                    open: false,
                    timestamp: newTime,
                    videoUrl: this.props.video.videoUrl,
                },
            });
            setTimeout(() => {
                this.setState({
                    replay: {
                        ...this.state.replay,
                        open: true,
                    },
                });
            }, 200);
        }
    }

    hideReplay = () => {
        this.setState({ replay: {
            ...this.state.replay,
            open: false,
            showReplay: false,
        } });
    }

    showHighLights = (e) => {
        e.stopPropagation();
        this.hideControlBar();
        this.closeAllOverlays();
        this.setState({ highlights: { open: true } });
    }

    handleHighlightsClose = () => {
        this.setState({ highlights: { open: false } });
    }

    playVideo = () => {
        this.props.dispatch(playVideo());
    }

    pauseVideo = () => {
        this.props.dispatch(pauseVideo());
    }

    changeCurrentTime = (time) => {

        console.log("Change current time", time, this.props.videoPlayer.bufferTime);
        if(this.props.videoPlayer.bufferTime + 2 > time){
            console.log("NO LOADING REQUIRED");
        } else {
            console.log("Loading required");
        }

        this.props.dispatch(changeCurrentTime(time));
    }


    togglePlay = () => {
        if (this.controlsAreVisible()) {
            if (this.props.videoPlayer.isPlaying) {
                this.pauseVideo();
            } else {
                this.playVideo();
            }
        }
    }


    onOpenSettings = (e) => {
        e.stopPropagation();
        console.log('open settings');
        this.closeAllOverlays();
        this.props.dispatch(isVideoSettingsOpen(true));
        this.props.dispatch(showSettingsOverlay());
        this.hideControlBar();
    };

    closeSettings = () => {
        this.props.dispatch(isVideoSettingsOpen(false));
        this.props.dispatch(showAllOverlays());
    }

    hideControlBar = () => {
        this.props.dispatch(setControlBarVisibility(false));
    }
    showControlBar = () => {
        this.props.dispatch(setControlBarVisibility(true));
    }

    controlsAreVisible = () => this.props.controlBarVisibility

    skipForward = () => {
        if (this.controlsAreVisible()) {
            let newTime = this.props.videoPlayer.currentVideoTime + 10;
            if (newTime > this.props.videoPlayer.duration) {
                newTime = this.props.videoPlayer.duration;
            }
            this.changeCurrentTime(newTime);
        }
    }
    skipBackward = () => {
        if (this.controlsAreVisible()) {
            let newTime = this.props.videoPlayer.currentVideoTime - 10;
            if (newTime < 0) {
                newTime = 0.1;
            }
            this.changeCurrentTime(newTime);
        }
    }

    handleTouch = () => {
        clearTimeout(this.props.hideControlTimeout);
    }

    toggleTickers = () => {
        this.props.dispatch(toggleVideoTickers());
    }

    onTileOpen = (video) => {
        this.props.dispatch(videoSelected(video));
    }

    render() {
        const { isPlaying, duration, currentVideoTime, isWaiting } = this.props.videoPlayer;
        const controlBarVisibility = this.props.controlBarVisibility;
        return (
            <div className={`video-control-overlay ${isWaiting ? 'isWaiting' : 'isPlaying'} ${controlBarVisibility ? 'show' : 'hide'} `}>
                
                <div className="gradient-overlay"/>
                <div className="video-controls icon-shadow">
                    
                    {isWaiting
                        ? <LoadingIcon size="3x"
                            style={{ top: '50%', color: '#fff', filter: 'none' }} />
                        : <PlayToggle onTouch={this.togglePlay} isPlaying={isPlaying} />
                    }
                
                    <BackwardControl onTouch={this.skipBackward} />
                    <ForwardControl onTouch={this.skipForward} />

                    {this.props.orientation === Orientation.LANDSCAPE
                        ? <div>
                            <SettingsControl onTouch={this.onOpenSettings} />
                            <ReplayControl onTouch={this.showReplay} />
                            <HighlightsControl onTouch={this.showHighLights} />
                          </div>
                        : <div />
                    }
                    {/* <VolumeControl /> */}

                <ProgressBar
                    videoPlayer={this.props.videoPlayer}
                    orientation={this.props.orientation}
                    changeCurrentTime={this.changeCurrentTime}
                    handleTouch={this.handleTouch}
                />
                </div>
                {this.props.orientation === Orientation.LANDSCAPE ?
                    <div>
                        {this.state.replay.showReplay ?
                        <Replayer
                            open={this.state.replay.open}
                            videoUrl={this.state.replay.videoUrl}
                            timestamp={this.state.replay.timestamp}
                            hideReplay={this.hideReplay}
                        />
                        : <div />}
                        <HighlightsRow
                            open={this.state.highlights.open}
                            allVideos={this.props.videos}
                            video={this.props.video}
                            tag={this.props.tags[this.props.video.tags]}
                            //videoUrl={this.state.highlights.videoUrl}
                            onTileOpen={this.onTileOpen}
                            handleClose={() => this.handleHighlightsClose()}
                        />
                        <SettingsOverlay
                            toggleTickers={this.toggleTickers}
                            showTickers={this.props.videoSettings.showTickers}
                            isOpen={this.props.isVideoSettingsOpen}
                            onClose={() => this.closeSettings()}
                            show={this.props.showSettingsOverlay}
                        />
                    </div>
                    : <div />
                }
          </div>
        );
    }
}

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
    videoPlayer: state.videoPlayer,
    controlBarVisibility: state.playback.controlBarVisibility,
    video: state.playback.video,
    videoSettings: state.videoSettings,
    orientation: state.settings.screenOrientation,
    isVideoSettingsOpen: state.playback.isVideoSettingsOpen,
    showSettingsOverlay: state.overlayManager.showSettingsOverlay,
});

export default connect(mapStateToProps)(VideoControls);

