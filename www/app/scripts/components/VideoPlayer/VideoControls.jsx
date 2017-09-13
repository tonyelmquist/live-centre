import React from 'react';
import PropTypes from 'prop-types';
import { HighlightsControl, ReplayControl, SettingsControl, PlayToggle, VolumeControl } from './Controls.jsx';
import ProgressBar from './ProgressBar';
import Replayer from './Replayer';
import HighlightsRow from './HighlightsRow';

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


    showReplay = (e) => {
        e.stopPropagation();

        const currentTime = this.props.largeVideoPlayer.video.currentTime;
        const newTime = currentTime - 10;

        this.props.hideControlBar();

        this.setState({
            replay: {
                showReplay: true,
                timestamp: newTime,
                videoUrl: this.props.video.videoUrl,
            } });
        window.setTimeout(() => this.setState({ replay: { showReplay: false } }), 12000);
    }

    showHighLights = (e) => {
        e.stopPropagation();
        this.props.hideControlBar();
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

    getStyles = () => ({
            opacity: this.props.controlBarVisibility ? 1 : 0,
            transition: '0.3s ease all',
        })
    

    render() {
        return (
            <div>
                <div className="gradient-overlay" style={{ ...this.getStyles(), zIndex: 0 }} />
                <div className="video-controls icon-shadow" style={this.getStyles()}>
                    <PlayToggle onTouch={this.props.togglePlay} isPlaying={this.props.playState.playing} />
                    <SettingsControl onTouch={this.props.onOpenSettings} />
                    <ReplayControl onTouch={this.showReplay} />
                    <HighlightsControl onTouch={this.showHighLights} />
                    {/* <VolumeControl /> */}
                
                <ProgressBar
                    videoPlayer={this.props.videoPlayer}
                    orientation={this.props.orientation}
                />
                </div>
                <Replayer
                    open={this.state.replay.showReplay}
                    videoUrl={this.state.replay.videoUrl}
                    timestamp={this.state.replay.timestamp}
                />
                <HighlightsRow
                    open={this.state.highlights.open}
                    highlights={this.getHighlights()}
                    videoUrl={this.state.highlights.videoUrl}
                    handleClose={() => this.handleHighlightsClose()}
                />
          </div>
        );
    }
}

export default VideoControls;
