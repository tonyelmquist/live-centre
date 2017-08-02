import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  Player as Video,
  ControlBar,
  PlayToggle,
} from 'video-react';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import { maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../actions/overlayX';
import { Orientation } from '../constants/reduxConstants';
import DataOverlay from './DataOverlay';
import { showReplay, hideReplay, showHighlights } from '../actions/videoPlayer';
import '../../../node_modules/video-react/dist/video-react.css';

const styles = {
    playerStyle: {
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 1500,
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

    state = {
        isPreOverlayShowing: true,
    }

    onPrePlayTouch = (e) => {
        e.stopPropagation();

        console.log('largeVideoPlayer?', this.largeVideoPlayer);

        this.setState({ isPreOverlayShowing: false });
        if (typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            console.log('try to play?');
            this.largeVideoPlayer.video.video.play();

            this.videoLoaded = this.props.video.videoUrl;
        }
    }

    onCloseTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.dispatch(closeOverlayX());
    }
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
    showReplay = (videoUrl) => {
        const { player } = this.largeVideoPlayer.getState();
        const currentTime = player.currentTime;
        this.props.dispatch(showReplay(videoUrl, currentTime - 10));
        window.setTimeout(() => this.props.dispatch(hideReplay()), 12000);
    };

    showHighlights = (videoUrl, highlights) => {
        this.props.dispatch(showHighlights(videoUrl, highlights));
    };

    printPrePlayOverlay = () => {
        if (typeof this.largeVideoPlayer !== 'undefined') {
            if (this.largeVideoPlayer.video.video.paused &&
                this.largeVideoPlayer.video.video.currentTime === 0 &&
                this.state.isPreOverlayShowing &&
                this.props.overlayX.maximized) {
                return (<div className="pre-play-overlay" onClick={this.onPrePlayTouch}>
                            <div className="gradient-overlay" />
                            <div className="play-button" >
                                <i className="fa fa-play-circle" />
                            </div>
                            <FontAwesome
                                className="close-button"
                                name="close"
                                size="2x"
                                onTouchTap={this.onCloseTouch}
                            />
                        </div>);
            }
        } else {
            return (<div className="pre-play-overlay" onClick={this.onPrePlayTouch}>
                            <div className="gradient-overlay" />
                            <div className="play-button" >
                                <i className="fa fa-play-circle" />
                            </div>
                            <FontAwesome
                                className="close-button"
                                name="close"
                                size="2x"
                                onTouchTap={this.onCloseTouch}
                            />
                        </div>);
        }

        return (<div />);
    }

    limit = 50;

    componentWillUpdate = (nextProps) => {
        if (typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            console.log('componentWillUpdate', this.videoLoaded, nextProps.video.videoUrl);
            if (typeof this.videoLoaded === 'undefined') {
                return;
            }
            if (this.videoLoaded !== nextProps.video.videoUrl) {
                console.info('Component Will Update Loaded');
                this.setState({ isPreOverlayShowing: true });
                this.largeVideoPlayer.video.video.load();

                this.videoLoaded = nextProps.video.videoUrl;
            }
        }
    }

    render() {
        const minimizeIconStyles = {
            position: 'fixed',
            top: '20px',
            left: '20px',
            color: 'white',
            zIndex: '2000',
            width: '42px',
            height: '42px',
            opacity: `${this.props.overlayX.maximized ? '1' : '0'}`,
        };


        return (
          <div style={styles.playerStyle} className={'IMRPlayer'} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <Video playsInline poster={this.props.video.thumbnail} ref={ref => (this.largeVideoPlayer = ref)}>
              <ControlBar autoHide >
                <PlayToggle />
                {/* <CurrentTimeDisplay /> */}
                <KeyboardArrowDown style={minimizeIconStyles} onTouchTap={this.onMinimize} />
                {/* <FontAwesome name="expand" />*/}
              </ControlBar>
              <source src={`${this.props.video.videoUrl}#t=${this.props.videoPosition}`} />
            </Video>
            {this.printPrePlayOverlay()}
                {/* <IconButton
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
            { this.props.orientation === Orientation.LANDSCAPE && typeof this.largeVideoPlayer !== 'undefined' && !this.largeVideoPlayer.video.video.paused ? <DataOverlay /> : '' }
          </div>
        );
    }
}

Player.defaultProps = {
    videoPosition: 0,
};

Player.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoPosition: PropTypes.number,
    orientation: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    overlayX: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    videoPosition: state.playback.currentTime,
    overlayX: state.overlayX,
    orientation: state.settings.screenOrientation,
});

export default connect(mapStateToProps)(Player);
