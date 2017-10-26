import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated, PanResponder } from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import VideoControls from './VideoControls';
// import { immersiveState, statusBarState } from '../actions';

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: false
        };
        this.animated = new Animated.Value(0);
    }
    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: () => {
                this.changeControlVisibility();
                return false;
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldPause) {
            // console.log(nextProps);
            this.setState({ paused: true });
        }
    }

    onLoadStart = () => {
        this.changeControlVisibility();
        this.setState({ loading: true });
    };

    onLoad = (data) => {
        // console.log(data);
        this.setState({ duration: data.duration, loading: false });
    };
    onBuffer = () => {
        // console.log('Buffering...');
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true, currentTime: 0 });
        this.player.seek(0);
    };

    onSliderValueChange = (value) => {
        const currentTime = value * parseFloat(this.state.duration);
        if (this.state.paused) this.setState({ currentTime });
        this.player.seek(currentTime);
    };

    onPlayPress = () => {
        this.state.paused && this.player.seek(this.state.currentTime);
        this.setState(state => ({
            paused: !state.paused
        }));
    };
    onVideoPress = () => {
        this.changeControlVisibility();
    };

    changeControlVisibility = () => {
        clearTimeout(this.hideTimeout);
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 200
        }).start();

        this.hideTimeout = setTimeout(() => {
            Animated.timing(this.animated, {
                toValue: 0,
                duration: 400
            }).start();
        }, 3000);
    };

    renderActivityIndicator() {
        if (this.state.loading) {
            return (
                <View style={styles.loaderView}>
                    <ActivityIndicator animating={this.state.loading} size="large" />
                </View>
            );
        }
        return null;
    }

    render() {
        const interpolatedControls = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [48, 0]
        });
        const controlHideStyle = {
            transform: [
                {
                    translateY: interpolatedControls
                }
            ]
        };

        return (
            <View style={styles.container} {...this.panResponder.panHandlers}>
                <Video
                    paused={this.state.paused}
                    source={{ uri: this.props.uri }}
                    style={styles.video}
                    resizeMode="contain"
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    progressUpdateInterval={1000}
                    onProgress={this.onProgress}
                    // Audio continues to play when app entering background:
                    // playInBackground={false}
                    // [iOS] Video continues to play when control or notification center are shown:
                    // playWhenInactive={false}
                    onBuffer={this.onBuffer}
                    onEnd={this.onEnd}
                    ref={(ref) => {
                        this.player = ref;
                    }}
                />

                <Animated.View style={[styles.controls, controlHideStyle]}>
                    <VideoControls
                        paused={this.state.paused}
                        currentTime={this.state.currentTime}
                        duration={this.state.duration}
                        onValueChange={this.onSliderValueChange}
                        handlePlay={this.onPlayPress}
                    />
                </Animated.View>
                {this.renderActivityIndicator()}
            </View>
        );
    }
}

VideoPlayer.propTypes = {
    uri: PropTypes.string.isRequired,
    handleFullScreen: PropTypes.func.isRequired,
    shouldPause: PropTypes.bool
};
VideoPlayer.defaultProps = {
    shouldPause: false
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    },
    video: {
        flex: 1
    },
    loaderView: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center'
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 48,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
// export default VideoPlayer;
