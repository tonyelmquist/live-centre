import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from 'i18next';

import FontAwesome from 'react-fontawesome';
import { logoutSuccess } from '../actions/authentication';
import { showLoginModal } from '../actions/modals';
import Authentication from '../utils/Authentication';
import { switchUserMenu, switchShade } from '../actions/navigation';

class UserMenu extends Component {

    handleLogout = () => {
        this.props.dispatch(logoutSuccess());
        const auth = new Authentication();
        auth.logoutAttempt();
        this.props.changeRoute('/');
    }

    handleLogin = () => {
        this.props.dispatch(switchUserMenu(false));
        this.props.dispatch(showLoginModal(true));
    }

    handleSettingsTouchTap = () => {
        this.props.changeRoute('/settings');
    }

    handleWishlistTouchTap = () => {
        this.props.changeRoute('/watchlist');
    }

    handleOpenProfile = () => {
        this.props.changeRoute('/profile');
    }

    handleIconTouchTap = () => {
        this.props.dispatch(switchUserMenu(true));
        this.props.dispatch(switchShade(true));
    }

    renderAuthenticatedUser = () => (
            <nav>
                <ul>
                    <li onTouchTap={this.handleWishlistTouchTap} ><FontAwesome name="eye" /> {i18next.t('watchlist')}</li>
                    <li onTouchTap={this.handleSettingsTouchTap} ><FontAwesome name="cog" /> {i18next.t('settings')}</li>
                </ul>

                <ul className="user-menu-footer">
                    <li onTouchTap={this.handleLogout} ><FontAwesome name="sign-out" /> {i18next.t('app_signout')}</li>
                </ul>
            </nav>
        );

    renderUnauthenticatedUser = () => (
            <nav>
                <ul>
                    <li onTouchTap={this.handleWishlistTouchTap} ><FontAwesome name="eye" /> {i18next.t('watchlist')}</li>
                </ul>

                <ul className="user-menu-footer">
                    <li onTouchTap={this.handleLogin} ><FontAwesome name="sign-in" /> {i18next.t('app_login')}</li>
                </ul>
            </nav>
        );

    render() {
        return (
            <div className={`user-menu ${this.props.userMenuState ? 'is-open' : 'is-closed'}`}>
                { this.props.authentication.isLoggedIn ?
                <div className={'user-menu-profile'} onTouchTap={this.handleOpenProfile}>
                    <div className="user-menu-profile-image">
                        <img src={this.props.authentication.user.photoURL} alt={this.props.authentication.user.email} />
                    </div>
                    <div className="user-menu-profile-info">
                        <span className="user-menu-profile-name">{this.props.authentication.user.displayName}</span><br />
                        <span className="user-menu-profile-link"> {i18next.t('view_profile')} </span>
                    </div>
                </div>
                :
                <div />
                }

                { this.props.authentication.isLoggedIn ? this.renderAuthenticatedUser() : this.renderUnauthenticatedUser() }
            </div>
        );
    }
}

UserMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    userMenuState: PropTypes.bool.isRequired,
    // settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
    settings: state.settings,
    userMenuState: state.userMenu,
});


export default connect(mapStateToProps)(UserMenu);
