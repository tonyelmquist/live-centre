import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import DataOverlay from './DataOverlay';
import Fullscreenable from 'react-fullscreenable';


const styles = {
  playerStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: 2147483647
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
      url={this.props.videoUrl}/>
      <DataOverlay />
      <button onClick={this.props.toggleFullscreen}>Fullscreen</button>
      </div>);
  }
}

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    isFullscreen: PropTypes.bool,
    toggleFullscreen: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    videoUrl: state.playback.url
  }
};

const FullscreenPlayer = Fullscreenable()(Player);


export default connect(mapStateToProps)(FullscreenPlayer);
