import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import i18next from 'i18next';

class LoginForm extends Component {
    
    onSubmit = () => {
        this.props.onSubmit(this.usernameInput.value, this.passwordInput.value);
        this.passwordInput.value = '';
        this.passwordInput.blur();
        this.usernameInput.blur();
    }

    onUsernameFieldKeyDown = (e) => {
        const keyCode = e.keyCode || e.which;

        if (keyCode === 13) {
            setTimeout(() => {
                this.passwordInput.focus();
            }, 10);
        }
    }

    onPasswordFieldKeyDown = (e) => {
        const keyCode = e.keyCode || e.which;

        if (keyCode === 13) {
            this.onSubmit();
        }
    }

    errorStyles = {
        border: '2px solid red',
    }

    render() {
        console.log('RERENDER?');
        return (
            <div className="login-form">

                <h2>{i18next.t('app_login')}</h2>
                <input type="email" placeholder={i18next.t('placeholder_email')} ref={ref => (this.usernameInput = ref)} onKeyDown={this.onUsernameFieldKeyDown} style={this.props.error ? this.errorStyles : {}} />
                <input type="password" placeholder={i18next.t('placeholder_password')} ref={ref => (this.passwordInput = ref)} onKeyDown={this.onPasswordFieldKeyDown} style={this.props.error ? this.errorStyles : {}} />
                <input type="submit" value={i18next.t('submit_login')} className="btn" onTouchTap={this.onSubmit} />

            </div>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default LoginForm;
