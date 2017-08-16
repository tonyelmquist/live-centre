import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoxNotification from '../components/Notifications/BoxNotification';

class NotificationManager extends Component {

    renderNotifications = () => {
        return this.props.notifications.map((value, i) =>
            (<BoxNotification
                key={`notification-${value.id}`}
                type={value.type}
                text={value.message}
                onFinish={() => this.props.removeNotification(value.id)}
                positionY={10 + (i * 100)}
                startTime={value.start}
                endTime={value.start + (value.seconds * 1000)}
                // onClick={() => { console.log(value.id, 'pop clicked'); }}
            />));
    }

    render() {
        return (
            <div className="notifications-manager">
                {this.renderNotifications()}
            </div>
        );
    }
}

NotificationManager.defaultProps = {
    notifications: [],
};

NotificationManager.propTypes = {
    notifications: PropTypes.array,
    removeNotification: PropTypes.func,
};

export default NotificationManager;
