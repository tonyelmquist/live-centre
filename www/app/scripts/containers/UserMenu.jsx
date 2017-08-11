import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from 'i18next';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { logoutSuccess } from '../actions/authentication';
import { showLoginModal } from '../actions/modals';
import Authentication from '../utils/Authentication';

class UserMenu extends Component {
    static muiName = 'IconMenu';
    handleLogout = () => {
        this.props.dispatch(logoutSuccess());
        const auth = new Authentication();
        auth.logoutAttempt();
        this.props.changeRoute('/Home');
    }

    handleLogin = () => {
        this.props.dispatch(showLoginModal(true));
    }

    handleSettingsTouchTap = () => {
        this.props.changeRoute('/Settings');
    }

    handleWishlistTouchTap = () => {
        this.props.changeRoute('/Watchlist');
    }

    handleOpenProfile = () => {
        this.props.changeRoute('/Profile');
    }

    renderAuthenticatedUser = () => (
          <IconMenu
            iconButtonElement={
              <i className="fa fa-user logged-menu-icon" />
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >

            <MenuItem primaryText={i18next.t('profile_page')} onTouchTap={this.handleOpenProfile} />
            <MenuItem primaryText={i18next.t('route_wishlist')} onTouchTap={this.handleWishlistTouchTap}/>
            <MenuItem primaryText={i18next.t('route_settings')} onTouchTap={this.handleSettingsTouchTap} />
            <MenuItem primaryText={i18next.t('app_signout')} onTouchTap={this.handleLogout} />
          </IconMenu>
        );

    renderUnauthenticatedUser = () => (
          <IconMenu
            iconButtonElement={
              <i className="fa fa-user logged-menu-icon" />
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >

            <MenuItem primaryText='Login' onTouchTap={this.handleLogin} />
          </IconMenu>
        );

    render() {
        return this.props.authentication.isLoggedIn ? this.renderAuthenticatedUser() : this.renderUnauthenticatedUser();
    }
}

UserMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    // settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    settings: state.settings,
});


export default connect(mapStateToProps)(UserMenu);
