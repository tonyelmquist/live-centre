import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeVideoOverlay, minimizeVideoOverlay } from '../actions/videoOverlay';
import { Orientation } from '../constants/reduxConstants';
import DataOverlay from './DataOverlay';
import { setControlBarVisibility, updateCurrentTime, setDuration, playVideo, pauseVideo, setBufferTime, setVideoDimensions } from '../actions/videoPlayer';
import '../../../node_modules/video-react/dist/video-react.css';
import isDblTouchTap from '../utils/isDblTouchTap';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import VideoControls from '../components/VideoPlayer/VideoControls';
import PrePlayOverlay from '../components/VideoOverlay/PrePlayOverlay';

/**
 * Overlay Video Player.
 *
 * @class Player
 * @extends {React.Component}
 */
class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPreOverlayShowing: true,
        };
    }

    componentWillUpdate = (nextProps) => {
        if (this.props.video.id !== nextProps.video.id) {
            this.pauseVideo();
            clearInterval(this.timeInterval);
        }

        if (this.getVideoPlayer()) {
            if (this.videoLoaded !== nextProps.video.videoUrl) {
                this.setState({ isPreOverlayShowing: true });
                this.getVideoPlayer().load();
                this.watchVideoTime();

                this.videoLoaded = nextProps.video.videoUrl;

                this.getVideoPlayer().onloadeddata = () => {
                    console.log('SET', this.getVideoPlayer().getClientRects(), this.getVideoPlayer().videoWidth, this.getVideoPlayer().videoHeight);
                    this.props.dispatch(setVideoDimensions({
                        width: window.innerWidth,
                        height: (window.innerWidth / this.getVideoPlayer().videoWidth) * this.getVideoPlayer().videoHeight,
                    }));
                };
            }
        }
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.appPaused !== prevProps.appPaused) {
            this.handleAppPause();
        }
        if (!this.props.videoOverlay.open && this.props.videoPlayer.isPlaying) {
            this.pauseVideo();
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.timeInterval);
    }

    onPrePlayTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }

        this.setState({ isPreOverlayShowing: false });
        if (typeof this.largeVideoPlayer !== 'undefined' && this.largeVideoPlayer !== null) {
            this.playVideo();
            this.videoLoaded = this.props.video.videoUrl;
            this.showControlBar();
            this.controlBarTimeout = setTimeout(() => {
                if (this.props.videoPlayer.isPlaying) {
                    console.log('Hide control bar');
                    this.hideControlBar();
                }
            }, 3000);
        }
    };

    onCloseTouch = (e) => {
        // e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(closeVideoOverlay());
    };

    onMinimizeTouch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.activeElement.blur();
        this.props.dispatch(minimizeVideoOverlay());

        this.props.dispatch(setControlBarVisibility(false));
    };

    onTouchTap = (e) => {
        // document.activeElement.blur();
        // e.preventDefault();
        if (isDblTouchTap(e)) {
            return;
        }
        this.showControlBar();
        clearTimeout(this.controlBarTimeout);

        this.controlBarTimeout = setTimeout(() => {
            if (this.props.videoPlayer.isPlaying) {
                this.hideControlBar();
            }
        }, 3000);
    }

    getVideoPlayer = () => {
        if (typeof this.largeVideoPlayer !== 'undefined') {
            return this.largeVideoPlayer.video;
        }
        return null;
    }

    getCurrentBuffer = () => {
        const videoPlayer = this.getVideoPlayer();
            if (videoPlayer.buffered !== this.props.videoPlayer.bufferTime) {
                for (let i = 0; i < videoPlayer.buffered.length; i++) {
                    const currentTime = this.props.videoPlayer.currentVideoTime;
                    // A new buffer is generated each time we skip in time,
                    // Check which buffer time is part of the current time/should be shown.
                    if (videoPlayer.buffered.start(i) <= currentTime && currentTime <= videoPlayer.buffered.end(i)) {
                        const timeBuffered = videoPlayer.buffered.end(i);

                        if (this.props.videoPlayer.bufferTime !== timeBuffered) {
                            // console.log(this.props.videoPlayer.bufferTime, timeBuffered);
                            this.props.dispatch(setBufferTime(timeBuffered));
                        }
                    }
                }
        }
    }

    getAndSetDuration = () => {
        // Get and set duration if it is available and has changed.
        if (this.getVideoPlayer() && this.getVideoPlayer().duration && this.getVideoPlayer().duration !== this.props.videoPlayer.duration) {
            this.props.dispatch(setDuration(this.getVideoPlayer().duration));
        }
    }


    watchVideoTime = () => {
        // If videoplayer is rendered.
        if (this.getVideoPlayer()) {
            this.timeInterval = setInterval(() => {
                const newTime = this.getVideoPlayer().currentTime;
                console.log(this.props.videoPlayer.currentVideoTime, newTime);
                if (this.props.videoPlayer.currentVideoTime !== newTime) {
                    this.props.dispatch(updateCurrentTime(newTime));
                }
                this.getCurrentBuffer();
            }, 1000);
        }
    }

    handleAppPause = () => {
        if (this.props.appPaused && this.props.videoPlayer.isPlaying) {
            this.pauseVideo();
        } else if (!this.props.appPaused && !this.props.videoPlayer.isPlaying) {
            this.playVideo();
        }
    }

    controlBarTimeout = null;

    playVideo = () => {
        this.props.dispatch(playVideo());
    }

    pauseVideo = () => {
        this.props.dispatch(pauseVideo());
    }

    hideControlBar = () => {
        this.props.dispatch(setControlBarVisibility(false));
    }
    showControlBar = () => {
        this.props.dispatch(setControlBarVisibility(true));
    }

    render() {
        console.log("ORIENTATION", this.props.orientation);
        let videoPlayerStyle = {};
        if (this.props.orientation === Orientation.PORTRAIT) {
            videoPlayerStyle = { width: '100%', height: '100%' };
        } else {
            videoPlayerStyle = { height: '100vh' };
        }

        this.getAndSetDuration();
        return (
          <div onTouchTap={this.onTouchTap} >

            {/* Base Video */}
            <VideoPlayer
                poster={this.props.video.thumbnail}
                source={`${this.props.video.videoUrl}#t=${this.props.videoPosition}`}
                ref={(ref) => { this.largeVideoPlayer = ref; }}
                extraStyle={videoPlayerStyle}
                changeCurrentTimeTo={this.props.videoPlayer.changeCurrentTimeTo}
                shouldPlay={this.props.videoPlayer.isPlaying}
            />

            {/* Video Controls */}
            {this.getVideoPlayer() && !this.state.isPreOverlayShowing ?
                <VideoControls hideControlTimeout={this.controlBarTimeout} /> : <div /> }

            {/* Data Overlay (product thumb/overlay to be moved to data e-commerce overlay) */}
            {this.props.orientation === Orientation.LANDSCAPE &&
            typeof this.largeVideoPlayer !== 'undefined' &&
            !this.state.isPreOverlayShowing &&
            this.props.video.matchId !== null
            ? <DataOverlay />
            : ''}

            {/* Pre Overlay */}
            <PrePlayOverlay
                video={this.getVideoPlayer()}
                maximized={this.props.videoOverlay.maximized}
                orientation={this.props.orientation}
                isPreOverlayShowing={this.state.isPreOverlayShowing}
                onPrePlayTouch={this.onPrePlayTouch}
                onCloseTouch={this.onCloseTouch}
                onMinimizeTouch={this.onMinimizeTouch}
            />

        </div>
        );
    }
}

Player.defaultProps = {
    videoPosition: 0,
};

Player.propTypes = {
    dispatch: PropTypes.func.isRequired,
    appPaused: PropTypes.bool.isRequired,
    videoPosition: PropTypes.number,
    orientation: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    videoPlayer: PropTypes.object.isRequired,
    videoOverlay: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    appPaused: state.appPaused,
    video: state.playback.video,
    videoPlayer: state.videoPlayer,
    videoPosition: state.playback.currentTime,
    videoOverlay: state.videoOverlay,
    orientation: state.settings.screenOrientation,
    dataOverlayClock: state.dataOverlay.clock,
});

export default connect(mapStateToProps)(Player);
