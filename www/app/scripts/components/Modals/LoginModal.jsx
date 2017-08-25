import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import i18next from 'i18next';

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }

    onSubmit = () => {
        this.props.onSubmit(this.usernameInput.value, this.passwordInput.value);
        this.passwordInput.value = '';
        this.passwordInput.blur();
        this.usernameInput.blur();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isOpen !== nextProps.isOpen) {
            return true;
        }
        if (this.props.error !== nextProps.error) {
            return true;
        }
        return false;
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

    blurModal = () => {
        console.log('blurring modal');
        this.setState({
            focused: false,
        });
        this.forceUpdate();
    }

    focusModal = () => {
        console.log('focusing modal');
        this.setState({
            focused: true,
        });
        this.forceUpdate();
    }

    errorStyles = {
        border: '2px solid red',
    }

    render() {
        console.log('rendered modal', this.state.focused);
        return (
            <div className={`modal ${this.props.isOpen ? 'isOpen' : ''}`}>
                <div className="inner-modal" style={{ marginTop: this.state.focused ? 0 : 'auto' }}>
                    <FontAwesome
                        className="close-button"
                        name="close"
                        size="2x"
                        onClick={this.props.onClose}
                    />

                    <h2>{i18next.t('app_login')}</h2>
                    <input type="email" placeholder={i18next.t('placeholder_email')} ref={ref => (this.usernameInput = ref)} onBlur={this.blurModal} onFocus={this.focusModal} onKeyDown={this.onUsernameFieldKeyDown} style={this.props.error ? this.errorStyles : {}} />
                    <input type="password" placeholder={i18next.t('placeholder_password')} ref={ref => (this.passwordInput = ref)} onBlur={this.blurModal} onFocus={this.focusModal} onKeyDown={this.onPasswordFieldKeyDown} style={this.props.error ? this.errorStyles : {}} />
                    <input type="submit" value={i18next.t('submit_login')} className="btn" onClick={this.onSubmit} />

                </div>
            </div>
        );
    }
}

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default LoginModal;
