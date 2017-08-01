import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from 'i18next';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { logoutSuccess } from '../actions/authentication';

class UserMenu extends Component {
    static muiName = 'IconMenu';
    handleLogout = () => {
        this.props.dispatch(logoutSuccess());
    }

    handleSettingsTouchTap = () => {
        this.props.changeRoute({ path: '/Settings' });
    }

    handleWishlistTouchTap = () => {
        this.props.changeRoute({ path: '/Wishlist' });
    }

    handleOpenProfile = () => {
        this.props.changeRoute({ path: '/Profile' });
    }

    render() {
        return (
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
    }
}

UserMenu.propTypes = {
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


export default connect(mapStateToProps)(UserMenu);
