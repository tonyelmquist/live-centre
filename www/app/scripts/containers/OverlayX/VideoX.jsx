import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../../components/common/Overlay';
import Player from '../../containers/Player';

import PortraitVideo from './PortraitVideo';
import { Orientation } from '../../constants/reduxConstants';
import DataOverlay from '../DataOverlay';


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
        return (
                <Overlay isOpen={this.props.isOpen} isMaximized={this.props.isMaximized}>
                    <Player />
                </Overlay>
            );
    }
}

VideoX.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    videoUrl: PropTypes.string,
    screenOrientation: PropTypes.string.isRequired,
    currentTime: PropTypes.number.isRequired,
};

export default VideoX;