import React from 'react';

class ProgressBar extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            player: {
                timeupdate: false,
                trackPos: null,
            },
            leftOffset: 95,
        }
    };

    maxProgressWidth = window.innerWidth - 135; //total offset

    componentDidUpdate(prevProps) {
        if (this.props.videoPlayer) {
            //Will only set up one eventlistener. 
            if (this.state.player.timeupdate === false) {
                this.watchTime(); 
            }
        }
        if(this.props.orientation !== prevProps.orientation){
            //If orientation changes, set the progress width again. 
            this.maxProgressWidth = window.innerWidth - 135; //total offset
        }
    }

    watchTime = () => {
        this.setState({ player: { timeupdate: 0 } });
        this.props.videoPlayer.addEventListener('timeupdate', () => {
            this.setState({ player: { 
                timeupdate: this.props.videoPlayer.currentTime } });
        });
    }

    getPercentageDuration = () => {
        if (this.props.videoPlayer && this.state.player.timeupdate) {
            const video = this.props.videoPlayer;
            const timeInPercent = this.state.player.timeupdate / video.duration;
            return timeInPercent;
        } else {
            return false;
        }
    }

    getProgressBarPos = () => {
        if (!this.state.trackPos){
            return this.getPercentageDuration() * this.maxProgressWidth;
        } else {
            return this.state.trackPos;
        }
        
    }

    getTimePlayed = () => {
        if (this.props.videoPlayer && this.state.player.timeupdate) {
            return this.state.player.timeupdate;
        } else {
            return false;
        }
    }

    getMaxDuration = () => {
        if (this.props.videoPlayer && this.state.player.timeupdate) {
            return this.props.videoPlayer.duration;
        } else {
            return false;
        }
    }

    skipTo = (time) => {
        if (this.props.videoPlayer && this.state.player.timeupdate) {
            this.props.videoPlayer.currentTime = time;
        } else {
            return false;
        }
    }

    trackTimeFromPos = (pos) => {
        const touchPos = pos - this.state.leftOffset; // The left offset for the progress bar. 
        // pixels -> percentage
        const percentageJump = touchPos / this.maxProgressWidth;
        // percentage -> time
        const jumpTo = this.getMaxDuration() * percentageJump;
        return jumpTo;
    };

    trackMovement = (e) => {
        let pos =  e.changedTouches[0].clientX;
        pos -= this.state.leftOffset;
        const percentageJump = pos / this.maxProgressWidth;
        this.setState({ trackPos: percentageJump * this.maxProgressWidth });
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

    formatTime = (s) => {
        const minutes = s / 60;
        const seconds = s % 60;
        return `${Math.floor(minutes)}:${Math.floor(seconds)}`;
    };

    render() {
         // - padding on each side.
        
        let timeProgressInPixels = this.getProgressBarPos();

        return(
            <div className="progressBar" >
                <span className="time">{this.formatTime(this.getTimePlayed())}</span>
                <svg height="20" width={this.maxProgressWidth} className="bar" style={{left: `${this.state.leftOffset}px`}} onTouchStart={this.onTouchStart} onTouchEnd={this.touchEnd} >
                    <line stroke="#ffffff" y1="10.5" y2="10.5" x1="1" x2={this.maxProgressWidth} strokeWidth="2" />
                    <line stroke="#00dafd" y1="10" y2="10" x1="1" x2={timeProgressInPixels} strokeWidth="5" />
                    <circle cx={timeProgressInPixels} cy="10" r="8" fill="#00dafd" />
                </svg>
                <span className="time right">{this.formatTime(this.getMaxDuration())}</span>
            </div>
        );
    };
};

export default ProgressBar;