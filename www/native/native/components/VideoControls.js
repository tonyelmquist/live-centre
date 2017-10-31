/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProgressBar from './ProgressBar';
// import ProgressController from './ProgressController';
import PlaybackTime from './PlaybackTime';

export default class VideoControls extends Component {
    static propTypes = {
        handlePlay: PropTypes.func.isRequired,
        paused: PropTypes.bool.isRequired,
        onValueChange: PropTypes.func.isRequired,
        duration: PropTypes.number.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    timeToSliderValue = (currentTime, duration) =>
        // if (percent) return parseFloat(currentTime) / parseFloat(duration) * 100;
        parseFloat(currentTime) / parseFloat(duration)
    ;

    render() {
        const { currentTime, handlePlay, paused, duration, onValueChange } = this.props;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlePlay}>
                    <Icon name={!paused ? 'pause' : 'play'} size={24} color="#FFF" />
                </TouchableWithoutFeedback>
                <ProgressBar
                    progress={this.timeToSliderValue(currentTime, duration)}
                    onValueChange={onValueChange}
                />
                <PlaybackTime currentTime={currentTime} duration={duration} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screen: {
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 2
    }
});
