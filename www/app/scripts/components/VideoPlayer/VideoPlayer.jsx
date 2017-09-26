import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.Component {
    componentDidMount(){
        this.setUpStartTime();
    }
    componentDidUpdate(prevProps, prevState){
        const { shouldPlay, changeCurrentTimeTo } = this.props;

        if (prevProps.startTime !== this.props.startTime) {
            this.setUpStartTime();
        }
        if (typeof this.video !== 'undefined'){
            if (this.video.paused && shouldPlay){
                this.video.play();
            } else if (!this.video.paused && !shouldPlay){
                this.video.pause();
            }
            if (changeCurrentTimeTo && prevProps.changeCurrentTimeTo !== changeCurrentTimeTo) {
                this.video.currentTime = changeCurrentTimeTo;
            }
        }
    }

    shouldComponentUpdate = (nextProps) => {
        if (this.props.source !== nextProps.source 
           || this.props.shouldPlay !== nextProps.shouldPlay
           || this.props.changeCurrentTimeTo !== nextProps.changeCurrentTimeTo
           || this.props.extraStyle !== nextProps.extraStyle) {
            return true 
        }
        return false
    }
    setUpStartTime = () => {
        if(this.props.startTime){
            this.video.currentTime = this.props.startTime;
        }
    }

    render() {
        return (
            <video className="video-player" 
                autoPlay={this.props.autoPlay} 
                muted={this.props.muted} 
                poster={this.props.poster} 
                ref={(ref) => this.video = ref}  
                playsInline
                style={{ ...this.props.extraStyle }}>
                <source src={this.props.source} />
            </video>
        );
    } 
};

VideoPlayer.defaultProps = {
    autoPlay: false,
    muted: false,

};

VideoPlayer.propTypes = {
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
};

export default VideoPlayer;
