import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.Component {
    componentDidMount(){
        this.setUpStartTime();
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.startTime !== this.props.startTime) {
            this.setUpStartTime();
        }
    }
    setUpStartTime = () => {
        if(this.props.startTime){
            this.video.currentTime = this.props.startTime;
        }
    }

    render() {
        //If this is not the main video player we dont need to handle timetracking, most likely.. 
       
        if (this.props.videoPlayer){
            const { isPlaying: shouldPlay, changeCurrentTimeTo, currentVideoTime } = this.props.videoPlayer;

            // Handle video controls based on actions.
            if (typeof this.video !== 'undefined'){
                if (changeCurrentTimeTo && changeCurrentTimeTo !== currentVideoTime) {
                    this.video.currentTime = changeCurrentTimeTo;
                }
                if (this.video.paused && shouldPlay){
                    this.video.play();
                } else if (!this.video.paused && !shouldPlay){
                    this.video.pause();
                }
            }
        }

        return (
            <video className="video-player" 
            autoPlay={this.props.autoPlay} 
            muted={this.props.muted} 
            poster={this.props.poster} 
            ref={(ref) => this.video = ref}  
            playsinline
            style={{ ...this.props.extraStyle, width: '100%', height: '100%' }}>
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
