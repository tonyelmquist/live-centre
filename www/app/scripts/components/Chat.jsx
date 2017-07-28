import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class Chat extends Component {
    static filterMessages(messages) {
        if (typeof messages === 'undefined') {
            return '';
        }
        return messages.map(value => (
          <li key={`message-${value.id}`}>
            <span className="chat-avatar">{value.user.substr(5, 1)}</span>
            <span className="chat-user">{value.user}</span>
            <span className="chat-message">{value.message}</span>
          </li>
            ));
    }

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            isScrolling: false,
        };
    }


    onSubmitClick = () => {
        if (!(this.state.message.length <= 0)) {
            this.props.onMessageSend(this.state.message);
            this.setState({ message: '' })
            this.inputBox.value = '';
        }
    }

    componentDidUpdate = () => {
        // Scroll to bottom after every update
        if (this.refs.chat.scrollTop !== this.refs.chat.scrollHeight && !this.state.isScrolling) {
            this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
        }
    }

    onKeyDown = (e) => {
        this.setState({ message: e.target.value });
        if (e.key === 'Enter') {
            this.onSubmitClick();
        }
    }

    onScroll = (e) => {
        if (this.refs.chat.scrollTop !== this.refs.chat.scrollHeight) {
            this.setState({ isScrolling: true });
        } else {
            this.setState({ isScrolling: false });
        }
    }


    render() {

        return (
          <div className={`chat`}>
            <ul className="chat-messages" ref="chat" onWheel={this.onScroll} onTouchMove={this.onScroll}>
              {Chat.filterMessages(this.props.messages)}
            </ul>
            <input type="text" ref={ref => (this.inputBox = ref)} onKeyUp={this.onKeyDown} placeholder="Write your message here..."/>
            <button type="submit" onClick={this.onSubmitClick}> 
                <FontAwesome name="paper-plane" />
            </button>
          </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMessageSend: PropTypes.func.isRequired,
};

export default Chat;
