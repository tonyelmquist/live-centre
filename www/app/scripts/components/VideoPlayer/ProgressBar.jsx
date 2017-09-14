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
            console.log("TRUE");
            totalOffset = 0;
        } else {
            totalOffset = 155;
        }
        console.log(window.innerWidth - totalOffset);
        return window.innerWidth - totalOffset;
    }

    // getStyle = () => {
    //     if (this.props.orientation === Orientation.PORTRAIT){
    //         return {
    //             leftOffset: 50,
    //             timeOffset: 10,
    //         }
    //     }
    //     return 105;
    // }

    render() {
        const maxProgressWidth = this.getMaxProgressWidth();

        const { isPlaying, changeCurrentTime, duration, currentVideoTime } = this.props.videoPlayer;
        let timeProgressInPixels
        if(duration){
            timeProgressInPixels = this.getProgressBarPos();
        } else {
            timeProgressInPixels = 0;
        }
        
        return(
            <div className="progressBar" >
                <span className="time">{this.formatTime(currentVideoTime)}</span>
                <svg height="20" width={maxProgressWidth} className="bar" style={{left: `${this.getLeftOffset()}px`}} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
                    <line stroke="#ffffff" y1="10.5" y2="10.5" x1="1" x2={maxProgressWidth} strokeWidth="2" />
                    <line stroke="#00dafd" y1="10" y2="10" x1="1" x2={timeProgressInPixels} strokeWidth="5" />
                    <circle cx={timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
                </svg>
                <span className="time right">{this.formatTime(duration)}</span>
            </div>
        );

    };
};

export default ProgressBar;


        // return(
        //     <div className="progressBar" >
        //         <span className="time">{this.formatTime(this.getTimePlayed())}</span>
        //         <svg height="20" width={this.maxProgressWidth} className="bar" style={{left: `${this.state.leftOffset}px`}} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
        //             <line stroke="#ffffff" y1="10.5" y2="10.5" x1="1" x2={this.maxProgressWidth} strokeWidth="2" />
        //             <line stroke="#00dafd" y1="10" y2="10" x1="1" x2={timeProgressInPixels} strokeWidth="5" />
        //             <circle cx={timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
        //         </svg>
        //         <span className="time right">{this.formatTime(this.getMaxDuration())}</span>
        //     </div>
        // );