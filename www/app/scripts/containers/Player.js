import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

class Player extends Component {

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

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        videoUrl: state.playback.url
    };
};

export default connect(mapStateToProps)(Player);
