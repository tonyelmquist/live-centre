import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class LoginModal extends Component {

    onSubmit = () => {
        this.props.onSubmit(this.usernameInput.value, this.passwordInput.value);
        this.passwordInput.value = '';
    }

    componentDidUpdate = () => {
        console.log('update', this.usernameInput);
        setTimeout(() => {
            this.usernameInput.focus();
        }, 200);
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

                    <h2>Login</h2>
                    <input type="email" placeholder="Email" ref={ref => (this.usernameInput = ref)} onKeyDown={this.onUsernameFieldKeyDown}/>
                    <input type="password" placeholder="Password" ref={ref => (this.passwordInput = ref)} onKeyDown={this.onPasswordFieldKeyDown}/>
                    <input type="submit" className="btn" onClick={this.onSubmit} />
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
