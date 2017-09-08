import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.Component {
    render () {
        return (
            <div className="videoPlayer">
                <video controls poster={this.props.poster} ref={(ref) => this.video = ref} className="video-react-video" style={{ width: '100%', height: '100%' }}>
                    <source src={this.props.source} type="video/mp4" />
                </video>
            </div>
        );
    } 
};

export default VideoPlayer;
