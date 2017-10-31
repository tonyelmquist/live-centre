/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// import Platform from '../utils/platform';

export default class ProgressBar extends Component {
    static defaultProps = {
        progress: 0,
        onValueChange: () => {}
        // onComplete: () => {}
        // onNewPercent: () => {}
    };
    static propTypes = {
        progress: PropTypes.number,
        onValueChange: PropTypes.func
        // onNewPercent: PropTypes.func
        // onComplete: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { width: 0 };
    }

    onLayout = (e) => {
        this.setState({ width: e.nativeEvent.layout.width });
    };

    onLinePressed = (e) => {
        // const newPercent = e.nativeEvent.locationX / this.state.width * 100;
        // this.notifyPercentChange(newPercent, false);
        const nativeEvent = e ? e.nativeEvent : null;
        const location = nativeEvent ? nativeEvent.locationX : 0;
        const newValue = this.state.width ? location / this.state.width : 0;
        this.props.onValueChange(newValue);
    };
    // notifyPercentChange = (newPercent, paused) => {
    //     // console.log('New Percentage Value', newPercent);
    //     const { onNewPercent } = this.props;
    //     if (onNewPercent instanceof Function) {
    //         onNewPercent(newPercent, paused);
    //     }
    // };
    render() {
        const { progress } = this.props;
        // const percent = progress * 100;
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onLinePressed}>
                    <View style={styles.slider}>
                        <View
                            style={[
                                styles.line,
                                { width: progress * this.state.width, backgroundColor: '#39A0ED' }
                            ]}
                        />
                        {/* <View
                            style={[styles.line, { flex: 100 - percent, backgroundColor: 'white' }]}
                        /> */}
                    </View>
                </TouchableWithoutFeedback>
                {/* Slider Version */}
                {/* <Slider
                    style={styles.slider}
                    value={this.props.progress}
                    onValueChange={this.props.onValueChange}
                    onSlidingComplete={this.props.onComplete}
                    // thumbStyle={styles.thumb}
                    // trackStyle={styles.track}
                    // minimumTrackTintColor="#1fb28a"
                    maximumTrackTintColor="#FFF"
                    thumbTintColor="#39A0ED"
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        height: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5
    },
    slider: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    line: {},
    track: {
        height: 2,
        borderRadius: 1
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.35
    }
});
