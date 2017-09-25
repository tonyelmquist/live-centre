import React from 'react';
import { Orientation } from '../../constants/reduxConstants';

class ProgressBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            player: {
                timeupdate: false,
                trackPos: null,
            },
            timeProgressInPixels: 8,
            bufferPixels: 0,
            //leftOffset: 105,
        };
    }

    currentDate = new Date();

    shouldComponentUpdate = () => {
        if (new Date() - this.currentDate > 1000) {
            this.currentDate = new Date();
            console.log('Progress bar update');
            return true;
        }
        return false;
    }

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
        let pos = e.changedTouches[0].clientX;
        pos -= this.getLeftOffset();
        const maxProgressWidth = this.getMaxProgressWidth();
        const percentageJump = pos / maxProgressWidth;
        this.setState({ trackPos: percentageJump * maxProgressWidth });
    };

    onTouchStart = (e) => {
        document.addEventListener('touchmove', this.trackMovement, true);
    };

    touchEnd = (e) => {
        const touchPos = e.changedTouches[0].clientX;
        document.removeEventListener('touchmove', this.trackMovement, true);
        this.skipTo(this.trackTimeFromPos(touchPos));

        setTimeout(() => this.setState({ trackPos: null }), 500); // Wait 200 ms until we reset the trackpos.
    };


    getProgressBarPos = () => {
        if (!this.state.trackPos) {
            return this.getPercentageDuration() * this.getMaxProgressWidth();
        } else if (this.state.trackPos !== null) {
            if (this.state.trackPos > this.getMaxProgressWidth()) {
                return this.getMaxProgressWidth();
            } else if (this.state.trackPos < 0) {
                return 0;
            }
            return this.state.trackPos;
        }
        return 0;
    }

    getPercentageDuration = () => this.props.videoPlayer.currentVideoTime / this.props.videoPlayer.duration

    formatTime = (s) => {
        let seconds = Math.floor(s % 60);
        let minutes = Math.floor(s / 60);

        if (minutes < 10) {
            minutes = `0${  minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${  seconds}`;
        }
        return `${minutes}:${seconds}`;
    };
    getLeftOffset = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
            return 0;
        }
        return 105;
    }
    getMaxProgressWidth = () => {
        let totalOffset;
        if (this.props.orientation === Orientation.PORTRAIT) {
            totalOffset = 0;
        } else {
            totalOffset = 155;
        }
        return window.innerWidth - totalOffset;
    }

    getStyle = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
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

    componentWillUpdate = () => {
        const maxProgressWidth = this.getMaxProgressWidth();
        const { duration, bufferTime, currentVideoTime } = this.props.videoPlayer;

        let timeProgressInPixelsNew = 0;
        console.log('duration', duration, currentVideoTime, maxProgressWidth, currentVideoTime / duration);
        // Check that duration exists and prevent cuting off the circle
        if (duration) {
            timeProgressInPixelsNew = (currentVideoTime / duration) * maxProgressWidth;
        } else {
            timeProgressInPixelsNew = 8;
        }
        console.log('timeProgressInPixelsNew', timeProgressInPixelsNew, this.state.timeProgressInPixels);

        if (timeProgressInPixelsNew - this.state.timeProgressInPixels > 3) {
            this.setState({
                timeProgressInPixels : timeProgressInPixelsNew,
            });
        }


        // Buffer Pixels
        let bufferPixel = 0;

        if (duration) {
            // Setup buffer. Add 16 pixels so it is showing outside the circle.
            // if it is more than max width, set it as max width.
            const percentageBuffer = bufferTime / duration;
            bufferPixel = percentageBuffer * maxProgressWidth;
            bufferPixel += 8;
            if (bufferPixel > maxProgressWidth) {
                bufferPixel = maxProgressWidth;
            }
        }
        if (bufferPixel - this.state.bufferPixel > 10) {
            this.setState({
                bufferPixel,
            });
        }
    }

    render() {
        return (
            <div className="progressBar" >
                <span
                    className="time"
                    style={{
                        left: `${this.getStyle().timeLeftOffset}px`,
                        bottom: `${this.getStyle().bottomOffsetText}px` }}
                >
                    {this.formatTime(this.props.videoPlayer.currentVideoTime)}</span>
                <svg height="21" width={this.getMaxProgressWidth()} onTouchTap={this.props.handleTouch} className="bar" style={{ left: `${this.getStyle().leftOffset}px`, bottom: `${this.getStyle().bottomOffset}px` }} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
                    <line shapeRendering="crispEdges" stroke="rgba(250,250,250, 0.5)" y1="10.5" y2="10.5" x1="0" x2={this.getMaxProgressWidth()} strokeWidth="2" />
                    <line shapeRendering="crispEdges" stroke="rgba(250,250,250, 0.9)" y1="10.5" y2="10.5" x1={this.state.timeProgressInPixels + 8} x2={this.state.bufferPixel} strokeWidth="2" />
                    <line shapeRendering="crispEdges" stroke="#00dafd" y1="10" y2="10" x1="0" x2={this.state.timeProgressInPixels} strokeWidth="5" />
                    <circle cx={this.state.timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
                </svg>
                <span className="time right" style={{ bottom: `${this.getStyle().bottomOffsetText}px` }}> {this.formatTime(this.props.videoPlayer.duration)} </span>
            </div>
        );
    }
}

export default ProgressBar;
