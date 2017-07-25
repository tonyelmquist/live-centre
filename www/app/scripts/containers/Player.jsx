import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import {
  Player as Video,
  ControlBar,
  PlayToggle,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from 'video-react';
import { setCurrentTimeInOverlayX, maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../actions/overlayX';
import { Orientation } from '../constants/reduxConstants';
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

/**
 * Overlay Video Player.
 * 
 * @class Player
 * @extends {React.Component}
 */
class Player extends React.Component {
    /**
     * Player
     * 
     * @memberof Player
     */
    showReplay = (videoUrl) => {
        const { player } = this.largeVideoPlayer.getState();
        const currentTime = player.currentTime;
        this.props.dispatch(showReplay(videoUrl, currentTime - 10));
        window.setTimeout(() => this.props.dispatch(hideReplay()), 12000);
    };

    showHighlights = (videoUrl, highlights) => {
        this.props.dispatch(showHighlights(videoUrl, highlights));
    };

    limit = 50;

    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    }

    onTouchEnd = (e) => {
        this.endTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };
        
        if (this.startTouchPosition.y - this.endTouchPosition.y < -this.limit) {
            this.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.onMaximize();
        }
    }

    onMaximize = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
            this.props.dispatch(maximizeOverlayX());
        }
    }

    onMinimize = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.overlayX.maximized) {
                this.props.dispatch(closeOverlayX());
                this.largeVideoPlayer.pause();
            } else {
                this.props.dispatch(minimizeOverlayX());
            }
        }
    }

    render() {
        if(typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            if (this.videoLoaded !== this.props.video.videoUrl) {
                const currTime = this.props.videoPosition;
                this.largeVideoPlayer.load();
                this.largeVideoPlayer.video.video.addEventListener('loadedmetadata', function() {
                    this.currentTime = currTime;
                    this.play();
                }, false)
                this.videoLoaded = this.props.video.videoUrl;
            }
        }
        return (
          <div style={styles.playerStyle} className={`IMRPlayer`} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <Video playsInline autoPlay ref={ref => (this.largeVideoPlayer = ref)}>
              <ControlBar autoHide={true} >
                <VolumeMenuButton horizontal />
                <PlayToggle />
                {/* <CurrentTimeDisplay /> */}
              </ControlBar>
              <source src={this.props.video.videoUrl + '#t=' + this.props.videoPosition} />
            </Video>
                {/*<IconButton
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
              </IconButton>*/}
            { this.props.orientation == Orientation.LANDSCAPE ? <DataOverlay /> : '' }
          </div>
        );
    }
}

Player.defaultProps = {
    videoPosition: 0,
}

Player.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    videoPosition: PropTypes.number,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    videoPosition: state.playback.currentTime,
    overlayX: state.overlayX,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(Player);
