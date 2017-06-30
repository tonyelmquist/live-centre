import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Player as Video,
  ControlBar,
  PlayToggle,
  ReplayControl,
  CurrentTimeDisplay,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react';
import 'react-html5video/dist/styles.css';
import DataOverlay from './DataOverlay';
import DraggableSpot from './DraggableSpot';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import '../../../node_modules/video-react/dist/video-react.css';
import IconButton from 'material-ui/IconButton';

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
    slomoButton: {
        width: 18,
        height: 18,
        padding: 0,
        fontSize: '48px',
        color: 'white',
        transition: 'none',
        marginLeft: '-24px',
    },
};

class Player extends Component {
    render() {
        return (
          <div style={styles.playerStyle} className="IMRPlayer">
            <Video autoPlay playsInline>
              <ControlBar autoHide={false} disableDefaultControls>
                <PlayToggle />
                <ReplayControl seconds={30} order={1.1} />
                <PlaybackRateMenuButton />
                <IconButton
                  iconStyle={styles.slomoButton}
                  iconClassName="material-icons"
                >
            </IconButton>
                <CurrentTimeDisplay />
                <VolumeMenuButton vertical />
              </ControlBar>
              <source src={this.props.videoUrl} />
            </Video>
            <DataOverlay />
          </div>
        );
    }
}

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    videoUrl: state.playback.url,
});

export default connect(mapStateToProps)(Player);
