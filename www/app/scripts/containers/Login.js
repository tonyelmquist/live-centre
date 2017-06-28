import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSuccess, showRegistration, hideRegistration } from '../actions/login';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

const customContentStyle = {
    maxWidth: '400px',
};

class Login extends Component {

    handleLogin = () => {
        this.props.dispatch(loginSuccess());
    }

    handleRegister = () => {
        this.props.dispatch(showRegistration());
    }

    handleCancel = () => {
        this.props.dispatch(hideRegistration());
    }

    render() {
        const { isLogin } = this.props;
        const actions = [
          <FlatButton
              label={(isLogin) ? 'Registration' : 'Cancel'}
              secondary
              onTouchTap={(isLogin) ? this.handleRegister : this.handleCancel}
            />,
            <FlatButton
            label={(isLogin) ? 'Login' : 'Submit'}
            primary
            onTouchTap={(isLogin) ? this.handleLogin : this.handleCancel}
          />,
        ];

        return (
          <div>
            <Dialog
              title={(isLogin) ? 'Login' : 'Registration'}
              actions={actions}
              modal
              open={!this.props.loginState}
              contentStyle={customContentStyle}
            >
              { (isLogin) ? <LoginForm /> : <RegistrationForm />}
            </Dialog>
          </div>
        );
    }
}


Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    loginState: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    loginState: state.isUserLoggedIn,
    isLogin: !state.isRegistrationVisible,
});


export default connect(mapStateToProps)(Login);
