import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopIndicator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
        };
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
        this.setState({ currentTime: new Date().getTime() });
    }

    renderPath = () => {
        let percent = (this.state.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime);

        if (this.props.reverseCount) {
            percent = 1 - percent;
        }

        const [startX, startY] = this.getCoordinatesForPercent(0);
        const [endX, endY] = this.getCoordinatesForPercent(percent);

        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'L 0 0',
        ].join(' ');

        return (<path d={pathData} fill="#f39c12" filter="url(#dropshadow)" />);
    }


    render() {
        return (
            <svg
                 className="pop-indicator click-indicator"
            xmlns="http://www.w3.org/2000/svg"
                 onClick={this.props.onClick}
                 viewBox="-1 -1 2 2"
                 style={{ transform: 'rotate(-0.25turn)', position: 'absolute', bottom: '50%', right: '40px', width: '25px' }}
            >
            <defs xmlns="http://www.w3.org/2000/svg">
                <filter id="dropshadow" height="130%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
                {this.renderPath()}
                <text x="-0.3" y="0.4" fontFamily="Space Mono" fontSize="1" fill="white" style={{ transform: 'rotate(.25turn)' }}>
                    i
                </text>
            </svg>
        );
    }
}

PopIndicator.defaultProps = {
    reverseCount: true,
};

PopIndicator.propTypes = {
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    reverseCount: PropTypes.bool,
};

export default PopIndicator;
