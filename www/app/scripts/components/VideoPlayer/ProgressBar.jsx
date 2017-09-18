import React from 'react';
import { Orientation } from '../../constants/reduxConstants';

class ProgressBar extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            player: {
                timeupdate: false,
                trackPos: null,
            },
            //leftOffset: 105,
        }
    };

    // totalOffset = 155;
    // maxProgressWidth = window.innerWidth - this.totalOffset; //total offset

    // componentDidUpdate(prevProps) {
    //     if(this.props.orientation !== prevProps.orientation){
    //         //If orientation changes, set the progress width again. 
    //         this.state.maxProgressWidth = window.innerWidth - this.totalOffset; //total offset
    //     }
    // }

    skipTo = (time) => {
        this.props.changeCurrentTime(time);
    }

    trackTimeFromPos = (pos) => {
        const touchPos = pos - this.getLeftOffset(); // The left offset for the progress bar. 
        // pixels -> percentage
        const percentageJump = touchPos / this.getMaxProgressWidth();
        // percentage -> time
        const jumpTo = this.props.videoPlayer.duration * percentageJump;
        return jumpTo;
    };

    trackMovement = (e) => {
        let pos =  e.changedTouches[0].clientX;
        pos -= this.getLeftOffset();
        const maxProgressWidth = this.getMaxProgressWidth()
        const percentageJump = pos / maxProgressWidth
        this.setState({ trackPos: percentageJump * maxProgressWidth });
    };

    onTouchStart = (e) => {
        document.addEventListener('touchmove', this.trackMovement, true);
    };

    touchEnd = (e) => {
        const touchPos = e.changedTouches[0].clientX;
        document.removeEventListener('touchmove', this.trackMovement, true);
        this.skipTo(this.trackTimeFromPos(touchPos));

        setTimeout(() => this.setState({ trackPos: null }), 500); //Wait 200 ms until we reset the trackpos.
    };


    getProgressBarPos = () => {
        if (!this.state.trackPos){
            return this.getPercentageDuration() * this.getMaxProgressWidth();
        } else if (this.state.trackPos !== null) {
            if(this.state.trackPos > this.getMaxProgressWidth()){
                return this.getMaxProgressWidth();
            } else if(this.state.trackPos < 0){
                return 0;
            }
            return this.state.trackPos;
        } 
        return 0;
    }

    getPercentageDuration = () => {
        return this.props.videoPlayer.currentVideoTime / this.props.videoPlayer.duration;
    }

    formatTime = (s) => {
        const minutes = s / 60;
        const seconds = s % 60;
        return `${Math.floor(minutes)}:${Math.floor(seconds)}`;
    };
    getLeftOffset = () => {
        if (this.props.orientation === Orientation.PORTRAIT){
            return 0;
        }
        return 105;
    }
    getMaxProgressWidth = () => {
        let totalOffset;
        if(this.props.orientation === Orientation.PORTRAIT){
            totalOffset = 0;
        } else {
            totalOffset = 155;
        }
        return window.innerWidth - totalOffset;
    }

    getStyle = () => {
        if (this.props.orientation === Orientation.PORTRAIT){
            return {
                leftOffset: 0,
                timeLeftOffset: 10,
                bottomOffsetText: 25,
                bottomOffset: 8,

            };
        }
        return {
            leftOffset: 105,
            timeLeftOffset: 65,
            bottomOffsetText: 12,
            bottomOffset: 5,
        };
    }

    render() {
        const maxProgressWidth = this.getMaxProgressWidth();

        const progressBarContainer = maxProgressWidth;

        const { isPlaying, changeCurrentTime, duration, currentVideoTime } = this.props.videoPlayer;
        let timeProgressInPixels
        if(duration){
            timeProgressInPixels = this.getProgressBarPos();
            if(timeProgressInPixels > maxProgressWidth - 7){
                timeProgressInPixels = maxProgressWidth - 7;
            } else if(timeProgressInPixels < 7){
                timeProgressInPixels = 7;
            }
        } else {
            timeProgressInPixels = 7;
        };
        
        return(
            <div className="progressBar"  >
                <span className="time" style={{
                    left: `${this.getStyle().timeLeftOffset}px`,
                    bottom: `${this.getStyle().bottomOffsetText}px` }}
                >
                    {this.formatTime(currentVideoTime)}</span>
                <svg height="21" width={progressBarContainer} onTouchTap={this.props.handleTouch} className="bar" style={{left: `${this.getStyle().leftOffset}px`, bottom: `${this.getStyle().bottomOffset}px`}} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
                    <line stroke="#ffffff" y1="10.5" y2="10.5" x1="0" x2={maxProgressWidth} strokeWidth="2" />
                    <line stroke="#00dafd" y1="10" y2="10" x1="0" x2={timeProgressInPixels} strokeWidth="5" />
                    <circle cx={timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
                </svg>
                <span className="time right" style={{bottom: `${this.getStyle().bottomOffsetText}px` }}> {this.formatTime(duration)} </span>
            </div>
        );

    };
};

export default ProgressBar;