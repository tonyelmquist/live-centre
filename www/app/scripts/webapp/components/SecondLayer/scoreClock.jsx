import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class ScoreClock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clock: '00:00',
            interval: null,
        };
    }

    // componentDidMount = () => this.startClock();
    componentWillUnmount = () => this.endClock();

    startClock = () => this.setState({interval: setInterval(this.incrementClock, 1000)});
    endClock = () => clearInterval(this.state.interval);

    convertFromMs = (ms) => {

        let seconds = Math.ceil(ms / 1000);


        let currentSeconds = seconds % 60;
        let currentMinutes = Math.floor(seconds / 60);

        let currentSecondsString = '';

        if (currentSeconds < 10) {
            currentSecondsString = `0${currentSeconds}`;
        } else {
            currentSecondsString = `${currentSeconds}`;
        }

        let currentMinutesString = '';

        if (currentMinutes < 10) {
            currentMinutesString = `0${currentMinutes}`;
        } else {
            currentMinutesString = `${currentMinutes}`;
        }

        return `${currentMinutesString}:${currentSecondsString}`;
    }

    render() {
        return (
          <div className="clock">{this.convertFromMs(this.props.time)}</div>
        );
    }
}

// ScoreClock.propTypes = {

// };

export default ScoreClock;
