import React from 'react';
import { connect } from 'react-redux';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    // this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    //   console.log('onPlayerReady', this);
    // });
    this.player = videojs(this.videoNode, this.props);
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ (node) => this.videoNode = node } className="video-js vjs-default-skin" src={this.props.videoUrl}></video>
      </div>
    );
  }
}

export default VideoPlayer;
