import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class LoginModal extends Component {

    onSubmit = () => {
        this.props.onSubmit(this.usernameInput.value, this.passwordInput.value);
    }

    render() {
        return (
            <div className={`modal ${this.props.isOpen ? 'isOpen' : ''}`}>
                <div className="inner-modal">
                    <FontAwesome name="close" onClick={this.props.onClose} />

                    <h2>Login</h2>
                    <input type="text" placeholder="Username" ref={ref => (this.usernameInput = ref)} />
                    <input type="password" placeholder="Password" ref={ref => (this.passwordInput = ref)} />
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
