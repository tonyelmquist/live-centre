import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DefaultPlayer as Video } from 'react-html5video';

import { Motion, spring, presets } from 'react-motion';

class VideoX extends Component {

    state = {
        open: true,
    }

    limit = 50;

    startTouchPosition = {};
    endTouchPosition = {};

    onClick = (e) => {
        console.log('Video Paused?', this.videoPlayer.paused);
        if (this.videoPlayer.paused) {
            this.videoPlayer.play();
        } else {
            this.videoPlayer.pause();
        }
    }
    
    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    }

    onTouchEnd = (e) => {
        this.endTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };
        
        if (this.startTouchPosition.y - this.endTouchPosition.y < -this.limit) {
            this.props.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.props.onMaximize();
        }
    }

    videoLoaded = '';

    render() {
        console.log('Now playing in OverlayX, ', this.props.videoUrl);
        if(typeof this.videoPlayer !== 'undefined') {
            if (this.videoLoaded !== this.props.videoUrl) {
                console.log(this.videoPlayer.load());
                this.videoLoaded = this.props.videoUrl;
            }
        }

        if (!this.props.isOpen && typeof this.videoPlayer !== 'undefined') {
            this.videoPlayer.pause();
        }

        return (
            // Minimized, Closed, Open
            <Motion style={{y: spring(this.props.isOpen ? (this.props.isMaximized ? 0 : 360) : 550, {stiffness: 60, damping: 15}), scale: spring(this.props.isMaximized ? 1 : .6, {stiffness: 60, damping: 15})}}>
                {({y, scale}) => 
                <video ref={ref => (this.videoPlayer = ref)} autoPlay controls='false' playsInline className={`ox-video-container`} onClick={this.onClick} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} style={{
                    transform: `scale(${scale}) translate3d(0, ${y}%, 0)`,
                }}>
                    <source src={this.props.videoUrl} />
                </video>
                }
            </Motion>
        );
    }
}

VideoX.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    videoUrl: PropTypes.string,
};

export default VideoX;