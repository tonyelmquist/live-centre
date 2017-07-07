import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Player as Video,
  ControlBar,
  PlayToggle,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from 'video-react';
import IconButton from 'material-ui/IconButton';
import DataOverlay from './DataOverlay';
import { showReplay, hideReplay } from '../actions/replay';
import { showHighlights } from '../actions/highlights';
import '../../../node_modules/video-react/dist/video-react.css';

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
    iconButtons: {
        marginLeft: '12px',
        marginRight: '12px',
    },
};

class Player extends React.Component {
    showReplay = (videoUrl) => {
        const { player } = this.videoPlayer.getState();
        const currentTime = player.currentTime;
        this.props.dispatch(showReplay(videoUrl, currentTime - 10));
        window.setTimeout(() => this.props.dispatch(hideReplay()), 12000);
    };

    showHighlights = (videoUrl, highlights) => {
        this.props.dispatch(showHighlights(videoUrl, highlights));
    };

    render() {
        return (
          <div style={styles.playerStyle} className="IMRPlayer">
            <Video playsInline autoPlay ref={ref => (this.videoPlayer = ref)}>
              <ControlBar autoHide={false}>
                <PlayToggle />
                <CurrentTimeDisplay />
                <VolumeMenuButton vertical />
                <IconButton
                  style={styles.iconButtons}
                  iconClassName="material-icons replay"
                  onTouchTap={() => this.showReplay(this.props.videoUrl, 0)}
                >
              replay
            </IconButton>
                <IconButton
                  style={styles.iconButtons}
                  iconClassName="material-icons slomo"
                >
              slow_motion_video
            </IconButton>
                <IconButton
                  style={styles.iconButtons}
                  iconClassName="material-icons highlights"
                  onTouchTap={() =>
                this.showHighlights(this.props.videoUrl, [
                  { timestamp: 0, description: 'A HIGHLIGHT', thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png' },
                    {
                        timestamp: 10,
                        description: 'ANOTHER HIGHLIGHT',
                        title: 'ANOTHER HIGHLIGHT',
                        thumbnail: 'https://static.mediabank.me/THEFUTUREG/201706/222908001/222908001_poster.png',
                    },
                ])}
                >
              movie_filter
            </IconButton>
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
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    videoUrl: state.playback.url,
});

export default connect(mapStateToProps)(Player);
