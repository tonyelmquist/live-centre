import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import ReactHLS from 'react-hls';

class Player extends React.Component {

    render () {
      return (
        <ReactPlayer
          playing={false}
          controls={true}
          width ='100%'
          height = '56%'

          url={this.props.videoUrl}
        />
      );
    }
}

const mapStateToProps = (state) => {
    return {
        videoUrl: state.playback.url
    };
};

export default connect(mapStateToProps)(Player);
