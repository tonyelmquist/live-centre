import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DefaultPlayer as Video} from 'react-html5video';
import 'react-html5video/dist/styles.css';
import DataOverlay from './DataOverlay';
import DraggableSpot from './DraggableSpot';
import FloatingActionButton from 'material-ui/FloatingActionButton';


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
        <Video autoPlay playsInline controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
          <source src={this.props.videoUrl}/>
        </Video>
        <DataOverlay/>
      </div>
    );
  }
}

Player.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    videoUrl: state.playback.url};
};

export default connect(mapStateToProps)(Player);
