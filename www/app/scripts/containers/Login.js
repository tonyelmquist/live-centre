import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginSuccess} from '../actions/login';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import UserForm from '../components/UserForm';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

const customContentStyle = {
    maxWidth: '350px',
};

class Login extends React.Component {

  handleLogin = () => {
      this.props.dispatch(loginSuccess());
  }

  render() {
    const actions = [
      <FlatButton
        label="Register"
        primary={true}
      />,
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={this.handleLogin}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Please Login"
          actions={actions}
          modal={true}
          open={!this.props.loginState}
          contentStyle={customContentStyle}
        >
          <UserForm />
        </Dialog>
      </div>
    );
  }
}


Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    style:PropTypes.object,
    loginState:PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        loginState: state.isUserLoggedIn
    };
};


export default connect(mapStateToProps)(Login);
