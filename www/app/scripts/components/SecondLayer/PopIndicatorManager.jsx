import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopIndicator from './PopIndicator';

class PopIndicatorManager extends Component {

    renderPops() {
        return this.props.notifications.map((value, i) =>
            (<PopIndicator
                key={`notification-${value.id}`}
                onFinish={() => this.props.removeNotification(value.id)}
                positionY={50 - (i * 10)}
                startTime={value.start}
                endTime={value.start + (value.minutes * 60000)}
                onClick={() => { console.log(value.id, 'pop clicked'); }}
            />));
    }

    render() {
        return (
            <div className="pop-indicator-manager">
                {this.renderPops()}
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
