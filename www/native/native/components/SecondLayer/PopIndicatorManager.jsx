import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopIndicator from './PopIndicator';
import PopMessage from './PopMessage';

class PopIndicatorManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMessage: '',
            showMessage: false,
        };

        this.percent = 100;
    }

    onPopClick = (message) => {
        this.setState({ currentMessage: message });
        this.setState({ showMessage: true });
        window.setTimeout(() => { this.setState({ showMessage: false }); }, this.messageInterval);
    }

    messageInterval = 6000;

    renderPops() {
        return this.props.notifications.map((value, i) =>
            (<PopIndicator
                key={`notification-${value.id}`}
                onFinish={() => this.props.removeNotification(value.id)}
                positionY={50 - (i * 10)}
                startTime={value.start}
                endTime={value.start + (value.minutes * 60000)}
                onClick={this.onPopClick}
                message={value.message}
            />
           ));
    }


    render() {
        return (
            <div className="pop-indicator-manager">
                {this.renderPops()}
                <PopMessage message={this.state.currentMessage} show={this.state.showMessage} />
            </div>
        );
    }
}

PopIndicatorManager.defaultProps = {
    notifications: [],
};

PopIndicatorManager.propTypes = {
    notifications: PropTypes.array,
    removeNotification: PropTypes.func,
};

export default PopIndicatorManager;
