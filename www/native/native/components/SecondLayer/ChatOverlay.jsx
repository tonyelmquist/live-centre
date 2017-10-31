import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatOverlay extends Component {
    static filterMessages(messages) {
        if (typeof messages === 'undefined') {
            return '';
        }
        return messages.map(value => (
          <li key={`message-${value.id}`}>
            <span className="chat-avatar">D</span>
            <span className="chat-user">{value.user}</span>
            <span className="chat-message">{value.message}</span>
          </li>
            ));
    }

    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
    }


    onSubmitClick() {
        this.props.onMessageSend(this.state.message);
        this.setState({ message: '' });
    }


    render() {
        return (
          <div className={`chat-overlay ${this.props.open ? 'open' : 'open'}`}>
            <ul className="chat-messages">
              {ChatOverlay.filterMessages(this.props.messages)}
            </ul>
          </div>
        );
    }
}

ChatOverlay.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    open: PropTypes.bool.isRequired,
    onMessageSend: PropTypes.func.isRequired,
};

export default ChatOverlay;
