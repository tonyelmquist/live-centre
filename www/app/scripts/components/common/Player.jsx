import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';

const styles = {
    playerStyle: {
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 2147483647,
        top: 0,
        left: 0,
    },
    fullscreenButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
};

const Player = props =>
  (<div style={styles.playerStyle}>
    <ReactPlayer
      playing={false}
      controls
      width="100%"
      height="100%"
      url={props.videoUrl}
    />
  </div>);

Player.defaultProps = {
    isFullscreen: false,
};

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired,
};

const FullscreenPlayer = Fullscreenable()(Player);

export default FullscreenPlayer;
