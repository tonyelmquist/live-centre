import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import i18next from 'i18next';

class LoginModal extends Component {

    onSubmit = () => {
        this.props.onSubmit(this.usernameInput.value, this.passwordInput.value);
        this.passwordInput.value = '';
    }

    shouldComponentUpdate(nextProps, nextState){

        console.log("should component update", nextProps, nextState);
        if(this.props.isOpen !== nextProps.isOpen){
            console.log("yes");
            return true
        }
        return false 
    }

    componentDidUpdate = () => {
        if(this.props.isOpen == true){
            setTimeout(() => {
                this.usernameInput.focus();
            }, 200);
        }
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

    render() {
        return (
            <div className={`modal ${this.props.isOpen ? 'isOpen' : ''}`}>
                <div className="inner-modal">
                    <FontAwesome name="close" onClick={this.props.onClose} />

                    <h2>{i18next.t('app_login')}</h2>
                    <input type="email" placeholder={i18next.t('placeholder_email')} ref={ref => (this.usernameInput = ref)} onKeyDown={this.onUsernameFieldKeyDown}/>
                    <input type="password" placeholder={i18next.t('placeholder_password')} ref={ref => (this.passwordInput = ref)} onKeyDown={this.onPasswordFieldKeyDown}/>
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
};

export default LoginModal;
