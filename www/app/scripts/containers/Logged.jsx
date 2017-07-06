import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import i18next from 'i18next';
import PersonIcon from 'material-ui/svg-icons/social/person';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { logoutSuccess } from '../actions/login';

class Logged extends Component {
    static muiName = 'IconMenu';
    handleLogout = () => {
        this.props.dispatch(logoutSuccess());
    }

    handleSettingsTouchTap = () => {
        console.log('click');
        this.props.changeRoute('/Settings');
    }

    render() {
        return (
          <IconMenu
            iconButtonElement={
              <IconButton><PersonIcon /></IconButton>
          }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText={i18next.t('route_settings')} onTouchTap={this.handleSettingsTouchTap} />
            <MenuItem primaryText={i18next.t('route_about')} />
            <MenuItem primaryText={i18next.t('app_signout')} onTouchTap={this.handleLogout} />
          </IconMenu>
        );
    }
}

Logged.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // iconStyle: PropTypes.object.isRequired,
    // loginState: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    // settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loginState: state.isUserLoggedIn,
    settings: state.settings,
});


export default connect(mapStateToProps)(Logged);
