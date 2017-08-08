import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class LoginModal extends Component {
    render() {
        return (
            <div className={`modal ${this.props.isOpen ? 'isOpen' : ''}`}>
                <div className="inner-modal">
                    <FontAwesome name="close" onClick={this.props.onClose} />
                    <form onSubmit={this.onSubmit}>
                        <h2>Login</h2>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <input type="submit" className="btn" />
                    </form>
                </div>
            </div>
        );
    }
}

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginModal;
