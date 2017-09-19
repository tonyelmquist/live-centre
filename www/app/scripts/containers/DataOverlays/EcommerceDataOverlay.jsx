import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PopIndicatorManager from '../../components/SecondLayer/PopIndicatorManager';
import { removePopNotification } from '../../actions/notifications';

class EcommerceDataOverlay extends Component {

    removeNotification = (id) => {
        this.props.dispatch(removePopNotification(id));
    }

    render() {
        return (
            <div>
                <PopIndicatorManager
                    removeNotification={id => this.removeNotification(id)}
                    notifications={this.props.popNotifications}
                />
            </div>
        );
    }
}

EcommerceDataOverlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    popNotifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    popNotifications: state.notifications.popNotifications,
});

export default connect(mapStateToProps)(EcommerceDataOverlay);