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

    componentDidMount = () => this.startClock();
    componentWillUnmount = () => this.endClock();

    startClock = () => this.setState({interval: setInterval(this.incrementClock, 1000)});
    endClock = () => clearInterval(this.state.interval);

    incrementClock = () => {
        let currentMinutes = parseInt(this.state.clock.split(':')[0]);
        let currentSeconds = parseInt(this.state.clock.split(':')[1]);

        currentSeconds += 1;

        if (currentSeconds === 60) {
            currentSeconds = 0;
            currentMinutes += 1;
        }

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

        this.setState({ clock: `${currentMinutesString}:${currentSecondsString}` });
    }

    render() {
        return (
          <div className="clock">{this.state.clock}</div>
        );
    }
}

// ScoreClock.propTypes = {

// };

export default ScoreClock;
