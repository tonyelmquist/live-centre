import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoX extends Component {

    startTouchPosition = {};
    endTouchPosition = {};

    limit = 50;
    
    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };
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

    render() {
        return (
            <div className={`ox-video-container`}  onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} />
        );
    }
}

VideoX.propTypes = {

};

export default VideoX;