import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentTimeInOverlayX, maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../../actions/overlayX';

import { Motion, spring, presets } from 'react-motion';

import Player from '../Player';

class PortraitVideo extends Component {

    limit = 50;
    onClick = (e) => {
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
            this.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.onMaximize();
        }
    }

    onMaximize = () => {
        this.props.dispatch(maximizeOverlayX());
    }

    onMinimize = () => {
        if (!this.props.overlayX.maximized) {
            this.props.dispatch(closeOverlayX());
        } else {
            this.props.dispatch(minimizeOverlayX());
        }
    }

    componentWillUnmount = () => {
        if (typeof this.videoPlayer !== 'undefined' && this.videoPlayer !== null) {
            this.props.dispatch(setCurrentTimeInOverlayX(this.videoPlayer.currentTime));
        }
    }

    render() {
        // if(typeof this.videoPlayer !== 'undefined' && this.videoPlayer !== null) {
        //     if (this.videoLoaded !== this.props.videoUrl) {
        //         this.videoPlayer.load();
        //         const currTime =  this.props.videoPosition;
        //         this.videoPlayer.addEventListener('loadedmetadata', function() {
        //             this.currentTime = currTime;
        //         }, false)
        //         this.videoLoaded = this.props.videoUrl;
        //     } 
        // }

        // if (!this.props.overlayX.open && typeof this.videoPlayer !== 'undefined' && this.videoPlayer !== null) {
        //     this.videoPlayer.pause();
        // }

        return (
            <Motion style={{y: spring(this.props.overlayX.open ? (this.props.overlayX.maximized ? 0 : 360) : 550, {stiffness: 60, damping: 15}), scale: spring(this.props.overlayX.maximized ? 1 : .6, {stiffness: 60, damping: 15})}}>
                {({y, scale}) => 
                <Player ref={ref => (this.videoPlayer = ref)} autoPlay controls='false' playsInline className={`ox-video-container`} onClick={this.onClick} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} style={{
                    transform: `scale(${scale}) translate3d(0, ${y}%, 0)`,
                }}>
                    <source src={this.props.videoUrl + '#t=' + this.props.videoPosition} />
                </Player>
                }
            </Motion>
        );
    }
}

PortraitVideo.propTypes = {

};

const mapStateToProps = state => ({
    overlayX: state.overlayX,
    playback: state.playback,
    videoUrl: state.playback.url,
    videoPosition: state.playback.currentTime,
});

export default connect(mapStateToProps)(PortraitVideo);