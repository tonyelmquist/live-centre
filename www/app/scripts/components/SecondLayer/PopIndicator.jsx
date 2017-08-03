import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopIndicator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            showing: false,
            finished: false,
            clicked: false,
        };

        this.percent = 100;
    }

    componentDidMount = () => {
        const intervalId = setInterval(this.timer, 250);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId });
    }

    componentWillUnmount = () => {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);

        return [x, y];
    }

    timer = () => {
        // setState method is used to update the state

        this.percent = (this.state.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime);

        if (this.percent >= 1 && !this.state.finished) {
            clearInterval(this.state.intervalId);
            this.setState({ finished: true });
            setTimeout(() => {
                this.props.onFinish();
            }, 600);
        } else {
            this.setState({ currentTime: new Date().getTime(), showing: true });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    renderPath = () => {
        if (this.state.finished) {
            return;
        }

        if (this.props.reverseCount) {
            this.percent = 1 - this.percent;
        }

        const [startX, startY] = this.getCoordinatesForPercent(0);
        const [endX, endY] = this.getCoordinatesForPercent(this.percent);

        const largeArcFlag = this.percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'L 0 0',
        ].join(' ');

        return (<path d={pathData} fill="#f39c12" />);
    }

    onClick = () => {
        this.setState({ clicked: true });
        this.props.onClick();
    }

    render() {
        const containerStyle = {
            transform: 'rotate(-0.25turn)',
            transition: '.5s all',
            position: 'absolute',
            bottom: `${this.props.positionY}%`,
            right: `${this.state.showing ? '40px' : '-80px'}`,
            opacity: `${this.state.finished ? '0' : '1'}`,
            width: '25px',
        };

        return (
            <div className="pop-indicator-container" style={containerStyle} onClick={this.onClick}>
                { this.state.clicked ? <div /> : <div className="click-indicator-pop" /> }
                <svg
                    className="pop-indicator"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-1 -1 2 2"
                >
                    {this.renderPath()}
                    <text x="-0.18" y="0.4" fontFamily="Georgia" fontWeight="bold" fontSize="1" fill="white" style={{ transform: 'rotate(.25turn)' }}>
                        i
                    </text>
                </svg>
            </div>
        );
    }
}

PopIndicator.defaultProps = {
    reverseCount: true,
    positionY: 50,
};

PopIndicator.propTypes = {
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    reverseCount: PropTypes.bool,
    positionY: PropTypes.number,
    onFinish: PropTypes.func.isRequired,
};

export default PopIndicator;
