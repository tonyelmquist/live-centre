import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    onSubmitClick() {
        this.props.onMessageSend(this.state.message);
        this.setState({message: ''});
    }

    filterMessages(messages) {
        if (typeof messages === 'undefined') {
            return '';
        }
        return messages.map(function(value, i) {
            return (
                <li key={i}>
                    <span className='chat-user'>{value.user}</span>
                    <span className='chat-message'>{value.message}</span>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={`chat-overlay ${this.props.open ? "open" : ""}`}>
                <ul className='chat-messages'>
                    {this.filterMessages(this.props.messages)}
                </ul>
                <input type='text' value={this.state.message} onChange={(message) => this.setState({message: message.target.value})}/>
                <button type='submit' onClick={this.onSubmitClick}> Send </button>
            </div>
        );
    }
}

ChatOverlay.PropTypes = {
    messages: PropTypes.array,
    open: PropTypes.bool,
    onMessageSend: PropTypes.func,
};

export default ChatOverlay;