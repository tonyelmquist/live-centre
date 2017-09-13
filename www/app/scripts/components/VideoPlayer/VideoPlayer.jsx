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
        return (
            <video className="video-player" autoPlay={this.props.autoPlay} muted={this.props.muted} poster={this.props.poster} ref={(ref) => this.video = ref}  style={{ ...this.props.extraStyle, width: '100%', height: '100%' }}>
                <source src={this.props.source} />
            </video>
        );
    } 
};

export default VideoPlayer;
