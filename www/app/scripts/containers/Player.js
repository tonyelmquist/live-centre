import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import DataOverlay from './DataOverlay';
import Chat from './Chat';

const styles = {
  playerStyle: {
    position: 'relative'
  }
};

class Player extends Component {

  render() {
    return (
    <div style={styles.playerStyle}>      
      <ReactPlayer
      playing={false}
      controls={true}
      width='100%'
      height='100%'
      style={styles.playerStyle}
      url={this.props.videoUrl}/>
      <DataOverlay />
      <Chat />
      </div>);
  }
}

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {videoUrl: state.playback.url};
};

export default connect(mapStateToProps)(Player);
