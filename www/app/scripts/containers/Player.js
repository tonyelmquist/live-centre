import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player';
import DataOverlay from './DataOverlay';
import DraggableSpot from './DraggableSpot';
import Fullscreenable from 'react-fullscreenable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import FullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';

const styles = {
  playerStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: 2147483647,
    top: 0,
    left: 0
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 5,
    right: 5
  }
};

class Player extends Component {

  render() {
    return (
      <div style={styles.playerStyle}>
        <ReactPlayer
          playing={true}
          controls={false}
          width='100%'
          height='100%'
          url={this.props.videoUrl}/>
        <DataOverlay/>
        <DraggableSpot/>
        <FloatingActionButton
          mini={true}
          secondary={true}
          style={styles.fullscreenButton}
          onClick={this.props.toggleFullscreen}>{ this.props.isFullscreen ? <FullscreenExit /> : <Fullscreen /> }
        </FloatingActionButton>
      </div>
    );
  }
}

Player.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  isFullscreen: PropTypes.bool,
  toggleFullscreen: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isFullscreen: state.fullScreen,
    videoUrl: state.playback.url};
};

const FullscreenPlayer = Fullscreenable()(Player);

export default connect(mapStateToProps)(FullscreenPlayer);
