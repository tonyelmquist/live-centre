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
import Settings from 'material-ui/svg-icons/action/settings';
import { maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../actions/overlayX';
import { Orientation } from '../constants/reduxConstants';
import DataOverlay from './DataOverlay';
import { showReplay, hideReplay, showHighlights, setControlBarVisibility, isVideoSettingsOpen, showProductOverlay, showProductThumb, hideProductThumb } from '../actions/videoPlayer';
import '../../../node_modules/video-react/dist/video-react.css';
import ProductThumb from '../components/OverlayX/ProductThumb';
import ProductOverlay from '../components/OverlayX/ProductOverlay';
import isDblTouchTap from '../utils/isDblTouchTap';

const tickProximityInterval = 5000;

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
        forcedLandscapeMode: false,
        productID: 0,
        showProductOverlay: false,
        showProductThumb: false,
    };

    onPrePlayTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }

        this.setState({ isPreOverlayShowing: false });
        if (typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            this.largeVideoPlayer.video.video.play();
            this.videoLoaded = this.props.video.videoUrl;

            this.props.dispatch(setControlBarVisibility(true));
            setTimeout(() => {
                if (!this.largeVideoPlayer.video.video.paused) {
                    this.props.dispatch(setControlBarVisibility(false));
                }
            }, 3000);
        }
    };

    onCloseTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(closeOverlayX());
    };

    onMinimizeTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(minimizeOverlayX());
    };

    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    };

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
    };

    onMaximize = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
            this.props.dispatch(maximizeOverlayX());
        }
    };

    onMinimize = () => {
        document.activeElement.blur();
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.overlayX.maximized) {
                this.props.dispatch(closeOverlayX());
            } else {
                this.props.dispatch(minimizeOverlayX());
            }
        } else {
            this.props.dispatch(closeOverlayX());
        }
    };

    componentDidUpdate = () => {
        if (!this.props.overlayX.open) {
            this.largeVideoPlayer.pause();
        }
    }

    showReplay = (videoUrl) => {
        const { player } = this.largeVideoPlayer.getState();
        const currentTime = player.currentTime;
        this.props.dispatch(showReplay(videoUrl, currentTime - 10));
        window.setTimeout(() => this.props.dispatch(hideReplay()), 12000);
    };

    onShowProductOverlay = () => {
        this.props.dispatch(showProductOverlay());
    };

    tickInProximity = (currentTime) => {
        const currentTimeInMS = currentTime * 1000;
        const thisTimeline = this.props.video._timeline;
        if (thisTimeline.events !== undefined) {
            const currentEvent = thisTimeline.events.find(
            event => ((event.timestamp - tickProximityInterval < currentTimeInMS) && (currentTimeInMS < event.timestamp + tickProximityInterval)),
            );

            if (currentEvent !== undefined) {
                if (!this.props.showProductThumb) { this.props.dispatch(showProductThumb(currentEvent.productID)); }
            } else if (this.props.showProductThumb) { this.props.dispatch(hideProductThumb(0)); }
        }
    }

    showHighlights = (videoUrl, highlights) => {
        this.props.dispatch(showHighlights(videoUrl, highlights));
    };

    printPrePlayOverlay = () => {
        if (typeof this.largeVideoPlayer !== 'undefined' &&
            this.largeVideoPlayer.video.video.paused &&
            this.largeVideoPlayer.video.video.currentTime === 0 &&
            this.state.isPreOverlayShowing &&
            this.props.overlayX.maximized) {
            return (<div className="pre-play-overlay" onTouchTap={this.onPrePlayTouch}>
                        {this.props.orientation === Orientation.PORTRAIT ? <div className="gradient-overlay" /> : ''}
                        <div className="play-button" >
                            <FontAwesome
                                name="play-circle"
                                size="2x"
                            />
                        </div>
                        <FontAwesome
                            className="close-button"
                            name="close"
                            size="2x"
                            onTouchTap={this.onCloseTouch}
                        />
                        <FontAwesome
                            className="minimize-button"
                            name="chevron-down"
                            size="2x"
                            onTouchTap={this.onMinimizeTouch}
                        />
                    </div>);
        }

        return <div />;
    };

    limit = 50;

    componentDidMount = () => {
        this.largeVideoPlayer.subscribeToStateChange(this.handleStateChange.bind(this));
    };

    handleStateChange = (state, prevState) => {
        this.setState({
            player: state,
            currentTime: state.currentTime,
        });
        this.tickInProximity(state.currentTime);
    };

    componentWillUpdate = (nextProps) => {
        if (
            typeof this.largeVideoPlayer !== 'undefined' &&
            this.largeVideoPlayer !== null
        ) {
            if (this.videoLoaded !== nextProps.video.videoUrl) {
                this.setState({ isPreOverlayShowing: true });
                this.largeVideoPlayer.video.video.load();

                this.videoLoaded = nextProps.video.videoUrl;
                console.log('new video loaded', this.videoLoaded);
            }
        }
    };


    onOpenSettings = () => {
        console.log('Open Settings');
        this.props.dispatch(isVideoSettingsOpen(true));
    };

    controlBarTimeoutTest1 = null;

    onTouchTap = (e) => {
        document.activeElement.blur();
        e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }

        if (this.props.overlayX.maximized) {
            if (this.largeVideoPlayer.video.video.paused) {
                this.largeVideoPlayer.video.video.play();
            } else {
                this.largeVideoPlayer.video.video.pause();
            }

            this.props.dispatch(setControlBarVisibility(true));
            clearTimeout(this.controlBarTimeoutTest1);
            this.controlBarTimeoutTest1 = setTimeout(() => {
                if (!this.largeVideoPlayer.video.video.paused) {
                    this.props.dispatch(setControlBarVisibility(false));
                }
            }, 3000);
        } else {
            this.props.dispatch(maximizeOverlayX());
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
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        };

        const settingsIconStyles = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            color: 'white',
            zIndex: '2000',
            width: '32px',
            height: '32px',
            opacity: `${this.props.overlayX.maximized ? '1' : '0'}`,
        };

        const playerStyles = {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
        };

        return (
          <div style={playerStyles} className={'IMRPlayer'} onTouchTap={this.onTouchTap} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            <Video playsInline poster={this.props.video.thumbnail} ref={ref => (this.largeVideoPlayer = ref)} >
              <ControlBar autoHide>
                <PlayToggle />
                <FontAwesome name="chevron-down" style={minimizeIconStyles} onTouchTap={this.onMinimize} />
                { this.props.orientation === Orientation.LANDSCAPE ? <Settings style={settingsIconStyles} onTouchTap={this.onOpenSettings} /> : <div />}
                {/* <FontAwesome name="expand" /> */}
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
              </IconButton> */}
        <ProductThumb productID={this.props.productID} showProductThumb={this.props.showProductThumb} onTouchTap={() => this.onShowProductOverlay()} />
        <ProductOverlay overlayMaximized={this.props.overlayX.maximized} productID={this.props.productID} showProductOverlay={this.props.showProductOverlay} />
        {this.props.orientation === Orientation.LANDSCAPE &&
        typeof this.largeVideoPlayer !== 'undefined' &&
        !this.state.isPreOverlayShowing
          ? <DataOverlay />
          : ''}
      </div>
        );
    }
}

Player.defaultProps = {
    videoPosition: 0,
    showProductOverlay: false,
    showProductThumb: false,
    productID: 0,
};

Player.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoPosition: PropTypes.number,
    orientation: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    overlayX: PropTypes.object.isRequired,
    productID: PropTypes.number.isRequired,
    showProductThumb: PropTypes.bool.isRequired,
    showProductOverlay: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    video: state.playback.video,
    videoPosition: state.playback.currentTime,
    overlayX: state.overlayX,
    orientation: state.settings.screenOrientation,
    productID: state.productThumb.productID,
    showProductThumb: state.productThumb.showProductThumb,
    showProductOverlay: state.productOverlay.showProductOverlay,
});

export default connect(mapStateToProps)(Player);
