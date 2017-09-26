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
        let seconds = Math.floor(s % 60);
        let minutes = Math.floor(s / 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${minutes}:${seconds}`;
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
            totalOffset = 165;
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
            leftOffset: 115,
            timeLeftOffset: 75,
            bottomOffsetText: 12,
            bottomOffset: 5,
        };
    }

    render() {
        const maxProgressWidth = this.getMaxProgressWidth();

        const progressBarContainer = maxProgressWidth;

        const { isPlaying, changeCurrentTime, duration, currentVideoTime, bufferTime } = this.props.videoPlayer;
        
        let timeProgressInPixels;


        //Check that duration exists and prevent cuting off the circle 
        if(duration){
            timeProgressInPixels = this.getProgressBarPos();
            if(timeProgressInPixels > maxProgressWidth - 8){
                timeProgressInPixels = maxProgressWidth - 8;
            } else if(timeProgressInPixels < 8){
                timeProgressInPixels = 8;
            }
        } else {
            timeProgressInPixels = 8;
        };
        let bufferPixel = 0;

        if (duration) {
            //Setup buffer. Add 16 pixels so it is showing outside the circle. 
            // if it is more than max width, set it as max width. 
            const percentageBuffer = bufferTime / duration;
            bufferPixel = percentageBuffer * maxProgressWidth;
            bufferPixel += 8;
            if (bufferPixel > maxProgressWidth) {
                bufferPixel = maxProgressWidth;
            }
        }

        
        return(
            <div className="progressBar"  >
                <span className="time" style={{
                    left: `${this.getStyle().timeLeftOffset}px`,
                    bottom: `${this.getStyle().bottomOffsetText}px` }}
                >
                    {this.formatTime(currentVideoTime)}</span>
                <svg height="21" width={progressBarContainer} onTouchTap={this.props.handleTouch} className="bar" style={{left: `${this.getStyle().leftOffset}px`, bottom: `${this.getStyle().bottomOffset}px`}} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
                    <line shapeRendering="crispEdges" stroke="rgba(250,250,250, 0.5)" y1="10.5" y2="10.5" x1="0" x2={maxProgressWidth} strokeWidth="2" />
                    <line shapeRendering="crispEdges" stroke="rgba(250,250,250, 0.9)" y1="10.5" y2="10.5" x1={timeProgressInPixels + 8} x2={bufferPixel} strokeWidth="2" />
                    <line shapeRendering="crispEdges" stroke="#00dafd" y1="10" y2="10" x1="0" x2={timeProgressInPixels} strokeWidth="5" />
                    <circle cx={timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
                </svg>
                <span className="time right" style={{bottom: `${this.getStyle().bottomOffsetText}px` }}> {this.formatTime(duration)} </span>
            </div>
        );

    };
};

export default ProgressBar;
