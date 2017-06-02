import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';

import PersonIcon from 'material-ui/svg-icons/social/person';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {logoutSuccess} from '../actions/login';
import {changeLang} from '../actions/lang';

class Logged extends Component {
  static muiName = 'IconMenu';
  handleLogout = () => {
      this.props.dispatch(logoutSuccess());
  }

  render() {
    return (
        <IconMenu
          iconButtonElement={
            <IconButton><PersonIcon/></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText={i18next.t('route_about')} />
          <MenuItem primaryText={i18next.t('app_signout')} onTouchTap={this.handleLogout}/>
        </IconMenu>
    );
  }
}

Logged.propTypes = {
    dispatch: PropTypes.func.isRequired,
    iconStyle:PropTypes.object,
    lang: PropTypes.string.isRequired,
    loginState:PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn,
        lang: state.lang
    };
};



export default connect(mapStateToProps)(Logged);
