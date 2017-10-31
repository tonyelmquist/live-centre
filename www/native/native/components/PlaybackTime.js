/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// const secondsToTime = time => `${~~(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
const secondsToTime = time => `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;

export default class PlaybackTime extends Component {
    static propTypes = {
        currentTime: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    };

    render() {
        return (
            <View style={styles.container}>
                <Text data-test="currentTime" style={styles.duration}>
                    {secondsToTime(Math.floor(this.props.currentTime))}
                </Text>
                <Text style={styles.duration}>/</Text>
                <Text data-test="duration" style={styles.duration}>
                    {secondsToTime(Math.floor(this.props.duration))}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 5
    },
    duration: {
        color: '#FFF'
    }
});
