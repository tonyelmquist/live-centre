import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Overlay from '../../components/common/Overlay';
import Playback from '../../components/common/Playback';

import PortraitVideo from './PortraitVideo';
import { Orientation } from '../../constants/reduxConstants';

class VideoX extends Component {

    startTouchPosition = {};
    endTouchPosition = {};

    videoLoaded = '';
    videoPosition = 0;
    hasTimeUpdated = false;

    componentWillUpdate = (nextProps) => {
        if (typeof this.videoPlayer !== 'undefined' && this.videoPlayer !== null && !this.hasTimeUpdated) {
            this.props.updateTime(this.videoPlayer.currentTime);
            this.hasTimeUpdated = true;
        }
    }

    render() {
        console.info('Now playing in OverlayX, ', this.props.videoUrl, this.props.currentTime);
        

        return (this.props.screenOrientation === Orientation.PORTRAIT) ?
            (
                <PortraitVideo />
            ) : (
                <Overlay isOpen={this.props.isOpen}>
                    <Playback videoUrl={this.props.videoUrl} />
                </Overlay>
            );
    }
}

VideoX.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    videoUrl: PropTypes.string,
    screenOrientation: PropTypes.string.isRequired,
    updateTime: PropTypes.func.isRequired,
    resetTime: PropTypes.func.isRequired,
    currentTime: PropTypes.number.isRequired,
};

export default VideoX;