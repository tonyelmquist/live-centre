import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
          iconStyle = {this.props.iconStyle}
          iconButtonElement={
            <IconButton><MoreVertIcon/></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >

          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText={i18next.t('route_about')} />
          <MenuItem primaryText={i18next.t('app_signout')} onTouchTap={this.handleLogout}/>
        </IconMenu>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn,
        lang: state.lang
    };
};



export default connect(mapStateToProps)(Logged);
