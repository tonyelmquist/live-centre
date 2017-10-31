/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Platform } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { immersiveState, statusBarState } from '../../shared/actions';

class VideoContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        orientation: PropTypes.string.isRequired,
        isImmersive: PropTypes.bool.isRequired,
        dimensions: PropTypes.object.isRequired,
        appState: PropTypes.string.isRequired
    };
    // uri = 'http://www.html5videoplayer.net/videos/toystory.mp4';
    componentWillMount = () => {
        this.handleFullScreen(this.props.orientation);
    };

    componentWillReceiveProps = (nextProps) => {
        this.handleFullScreen(nextProps.orientation);
        return true;
    };
    handleImmersive = (isImmersive) => {
        this.props.dispatch(immersiveState(isImmersive));
    };

    handleStatusBar = (isHidden) => {
        this.props.dispatch(statusBarState(isHidden));
    };

    handleFullScreen = (orientation) => {
        const isHidden = orientation === 'LANDSCAPE';
        this.handleStatusBar(isHidden);
        Platform.OS === 'android' && this.handleImmersive(isHidden);
    };

    render() {
        const { isImmersive } = this.props;
        const { width, height } = this.props.dimensions;

        // const playerWidth = width;
        const playerHeight = isImmersive ? height : width * 0.5625;
        // console.log(this.props.uri);
        return (
            <View style={[styles.container, { width: '100%', height: playerHeight }]}>
                <VideoPlayer
                    handleFullScreen={this.handleFullScreen}
                    uri={this.props.uri}
                    shouldPause={this.props.appState !== 'active'}
                />
            </View>
        );
    }
}
VideoContainer.propTypes = {
    uri: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    isImmersive: state.device.isImmersive,
    orientation: state.device.orientation,
    dimensions: state.device.dimensions,
    appState: state.device.appState
});

export default connect(mapStateToProps)(VideoContainer);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
