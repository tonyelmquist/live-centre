import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import FirebaseDB from '../../../../native/shared/utils/FirebaseDB';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            isScrolling: false,
            userImages: {},
        };
    }

    filterMessages(messages) {
        if (typeof messages === 'undefined') {
            return '';
        }
        const result = [];
        for (const key of Object.keys(messages)) {
            result.push((
                <li key={`message-${key}`}>
                    <span className="chat-avatar"><img src={messages[key].senderImage} alt="test" /></span>
                    <span className="chat-user">{messages[key].senderName}</span>
                    <span className="chat-message">{messages[key].text}</span>
                </li>
            ));
        }
        return result;
    }



    onSubmitClick = () => {
        if (!(this.state.message.length <= 0)) {
            this.props.onMessageSend(this.state.message);
            this.setState({ message: '' });
            this.inputBox.value = '';
            this.inputBox.blur();
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
        const chatTitleStyles = {
            transition: '.7s all',
            transform: `translateY(-${this.props.showChatTitle ? '0' : '100'}%)`,
        };

        const messagesStyle = {
            transition: '.7s all',
            marginTop: `${this.props.showChatTitle ? '40px' : '0'}`,
        };
        console.log(this.state.message);

        return (
          <div className="chat">
            <div className="chat-title" style={chatTitleStyles} ref={ref => (this.chatTitleRef = ref)}>
                {this.props.video.title}
            </div>
            <ul className="chat-messages" ref="chat" onWheel={this.onScroll} onTouchMove={this.onScroll} style={messagesStyle}>
                <li style={{ opacity: '.8' }}>{i18next.t('video_chatrom_welcome')}</li>
              {this.filterMessages(this.props.messages)}
            </ul>
            <input
                type="text"
                ref={ref => (this.inputBox = ref)}
                onKeyUp={this.onKeyDown}
                placeholder={`${this.props.isLoggedIn ? i18next.t('video_chatrom_input_placeholder') : i18next.t('video_chatrom_please_login')}`}
                disabled={!this.props.isLoggedIn}
            />
            <button type="submit" onTouchTap={this.onSubmitClick} disabled={!this.props.isLoggedIn || this.state.message.length <= 0} >
                <FontAwesome name="paper-plane" />
            </button>
          </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMessageSend: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default Chat;
