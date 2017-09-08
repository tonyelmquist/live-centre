import React from 'react';
import PropTypes from 'prop-types';
import { HighlightsControl, ReplayControl, SettingsControl } from './Controls.jsx';

class VideoControls extends React.Component {
    showReplay = () => {
        console.log("show replay", this.props.largeVideoPlayer);

    }
    onOpenSettings = () => {
        console.log("on open settings", this.props.largeVideoPlayer);        
    }
    showHighLights = () => {
        console.log("Show highlights");
    }

    render () {
        console.log("Video controls rendered");
        return (
            <div className="video-controls">
                <SettingsControl onTouch={this.onOpenSettings} />
                <ReplayControl onTouch={() => this.showReplay(this.props.video.videoUrl, 0)} />
                <HighlightsControl onTouch={() => this.showHighlights(this.props.video.videoUrl)} />
            </div>
        );
    } 
};

export default VideoControls;
