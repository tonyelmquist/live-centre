import React from 'react';
import PropTypes from 'prop-types';
import { HighlightsControl, ReplayControl, SettingsControl, PlayToggle, VolumeControl, ForwardControl, BackwardControl } from './Controls.jsx';
import ProgressBar from './ProgressBar';
import Replayer from './Replayer';
import HighlightsRow from './HighlightsRow';
import { showReplay, hideReplay, showHighlights, setControlBarVisibility, 
    isVideoSettingsOpen, showProductOverlay, showProductThumb, 
     updateCurrentTime, changeCurrentTime, skipCurrentTimeBy, setDuration, playVideo, pauseVideo, toggleVideoTickers } from '../../actions/videoPlayer';
import SettingsOverlay from '../SecondLayer/SettingsOverlay';
import { connect } from 'react-redux';

import { Orientation } from '../../constants/reduxConstants';

class VideoControls extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            replay: {
                showReplay: false,
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

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.controlBarVisibility !== this.props.controlBarVisibility
            || nextProps.orientation !== this.props.orientation) {
            return true;
        } else if(!this.props.controlBarVisibility) {
            return false;
        }
        return true;
    }


    showReplay = (e) => {
        if(this.controlsAreVisible()){
            this.hideControlBar();
            e.stopPropagation();
            
                    const currentTime = this.props.videoPlayer.currentVideoTime;
                    const newTime = currentTime - 10;
            
                    this.hideControlBar();
            
                    this.setState({
                        replay: {
                            showReplay: true,
                            timestamp: newTime,
                            videoUrl: this.props.video.videoUrl,
                        } });
                    window.setTimeout(() => this.setState({ replay: { showReplay: false } }), 12000);
        }
    }

    hideReplay = () => {
        this.setState({replay: {showReplay: false}});
    }

    showHighLights = (e) => {
        e.stopPropagation();
        this.hideControlBar();
        this.setState({ highlights: { open: true } });
    }

    handleHighlightsClose = () => {
        this.setState({ highlights: { open: false } });
    }

    getHighlights = () => [
        { timestamp: 0,
            description: 'A HIGHLIGHT',
            thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png' },
        {
            timestamp: 10,
            description: 'ANOTHER HIGHLIGHT',
            title: 'ANOTHER HIGHLIGHT',
            thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png',
        },
    ]



    playVideo = () => {
        this.hideControlBar();
        this.props.dispatch(playVideo());
    }

    pauseVideo = () => {
        this.props.dispatch(pauseVideo());
    }

    changeCurrentTime = (time) => {
        this.props.dispatch(changeCurrentTime(time));
    }


    togglePlay = () => {
        if(this.controlsAreVisible()){
            if (this.props.videoPlayer.isPlaying) {
                this.pauseVideo();
            } else {
                this.playVideo();
            }
        }
    }


    onOpenSettings = () => {
        this.hideControlBar();
        this.props.dispatch(isVideoSettingsOpen(true));
    };

    closeSettings = () => {
        this.props.dispatch(isVideoSettingsOpen(false));
    }
    
    hideControlBar = () => {
        this.props.dispatch(setControlBarVisibility(false));
    }
    showControlBar = () => {
        this.props.dispatch(setControlBarVisibility(true));
    }

    getStyles = () => ({
            opacity: this.props.controlBarVisibility ? 1 : 0,
            transition: '0.3s ease all',
    });

    controlsAreVisible = () => {
        return this.props.controlBarVisibility
    }

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
            console.log(newTime);
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

    render() {
        const { isPlaying, duration, currentVideoTime } = this.props.videoPlayer;
        return (
            <div>
                <div className="gradient-overlay" style={{ ...this.getStyles(), zIndex: 0 }} />
                <div className="video-controls icon-shadow" style={this.getStyles()}>
                    <PlayToggle onTouch={this.togglePlay} isPlaying={isPlaying} />
                    
                    
                    <BackwardControl onTouch={this.skipBackward} extraStyle={{opacity: 1}} />
                    <ForwardControl onTouch={this.skipForward} extraStyle={{opacity: 1}} />
                    
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
                        <Replayer
                            open={this.state.replay.showReplay}
                            videoUrl={this.state.replay.videoUrl}
                            timestamp={this.state.replay.timestamp}
                            hideReplay={this.hideReplay}
                        />
                        <HighlightsRow
                            open={this.state.highlights.open}
                            highlights={this.getHighlights()}
                            videoUrl={this.state.highlights.videoUrl}
                            handleClose={() => this.handleHighlightsClose()}
                        />
                        <SettingsOverlay
                            toggleTickers={this.toggleTickers} 
                            showTickers={this.props.videoSettings.showTickers}
                            isOpen={this.props.isVideoSettingsOpen} 
                            onClose={() => this.closeSettings()}
                        /> 
                    </div>
                    : <div />
                }
          </div>
        );
    }
}

const mapStateToProps = state => ({
    videoPlayer: state.videoPlayer,
    controlBarVisibility: state.playback.controlBarVisibility,
    video: state.playback.video,
    videoSettings: state.videoSettings,
    orientation: state.settings.screenOrientation,
    isVideoSettingsOpen: state.playback.isVideoSettingsOpen,
});

export default connect(mapStateToProps)(VideoControls);

