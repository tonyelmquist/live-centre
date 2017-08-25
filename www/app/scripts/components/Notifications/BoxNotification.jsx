import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class BoxNotification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            showing: false,
            finished: false,
            clicked: false,
        };

        this.state = {
            intervalId: 0,
        };
    }

    componentDidMount = () => {
        const intervalId = setInterval(this.timer, 100);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    componentWillUnmount = () => {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    timer = () => {
        // setState method is used to update the stat
        this.percent = (this.state.currentTime - this.props.startTime) / (this.props.endTime - this.props.startTime);
        if (this.percent >= 1 && !this.state.finished) {
            clearInterval(this.state.intervalId);
            this.setState({ finished: true, showing: false });
            setTimeout(() => {
                this.props.onFinish();
            }, 600);
        } else {
            this.setState({ currentTime: new Date().getTime(), showing: true });
        }
    }

    onClick = () => {
        clearInterval(this.state.intervalId);
        this.props.onFinish();
    }

    renderIcon = () => {
        if (this.props.type === 'success') {
            return (<FontAwesome name="check" size="2x" />);
        }
        if (this.props.type === 'error') {
            return (<FontAwesome name="close" size="2x" />);
        }
        return '';
    }


    render() {
        return (
            <div className={`box-notification ${this.props.type} ${this.state.showing ? 'isShowing' : ''}`} style={{ top: `${this.props.positionY}px` }} onClick={this.onClick}>
                {this.renderIcon()}
                <span>
                    {this.props.text}
                </span>
            </div>
        );
    }
};

BoxNotification.defaultProps = {
    type: 'success',
};

BoxNotification.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    positionY: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
};

export default BoxNotification;
