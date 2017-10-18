import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router';
import i18next from 'i18next';
import LoginForm from '../../components/Common/LoginForm';
import { newNotification } from '../../../shared/actions/notifications';
import { setLoginFormError } from '../../../shared/actions/authentication';
import Authentication from '../../../shared/utils/Authentication';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }

    loginAttempt = (username, password) => {
        let errorMessage = 'Something went wrong.';
        Authentication.signInAttempt(username, password, (success, e) => {
            if (success) {
                this.props.dispatch(newNotification(i18next.t('auth_success'), 3.5, 'success'));
                this.props.dispatch(setLoginFormError(false));
                this.props.history.push({ pathname: '/', state: { tabIndex: 1 } });
            } else {
                if (e.errorCode === 'auth/invalid-email') {
                    errorMessage = i18next.t('auth_invalid_email');
                }
                if (e.errorCode === 'auth/wrong-password') {
                    errorMessage = i18next.t('auth_wrong_password');
                }
                if (e.errorCode === 'auth/user-not-found') {
                    errorMessage = i18next.t('auth_user_not_found');
                }
                console.log(errorMessage);
                this.props.dispatch(newNotification(errorMessage, 3.5, 'error'));
                this.props.dispatch(setLoginFormError(e));
            }
        });
    }

    render() {
        console.log('LOGINPAGE RERENDERR?');
        return (
            <div className="login">
                <LoginForm
                    onSubmit={this.loginAttempt}
                    error={this.props.loginFormError}
                />
            </div>
        );
    }
}

LoginPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loginFormError: state.authentication.loginFormError,
});


export default withRouter(connect(mapStateToProps)(LoginPage));
