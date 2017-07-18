import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import Chat from '../../components/Chat';

class ContentX extends Component {
    
    render() {
        return (
            <Motion style={{
                y: spring(this.props.isOpen ? (this.props.isMaximized ? -100 : 0) : 0, {stiffness: 60, damping: 15}),
                o: spring(this.props.isOpen ? (this.props.isMaximized ? 1 : 0) : 0, {stiffness: 60, damping: 15}),
                }}>
                {({y, o}) => 
                    <div className={`ox-content`} style={{transform: `translate3d(0, ${y}%, 0)`, opacity: o}}>
                        <Chat messages={this.props.chat} onMessageSend={this.props.onMessageSend}/>
                    </div>
                }
            </Motion>
        );
    }
}

ContentX.propTypes = {
    chat: PropTypes.array.isRequired,
    onMessageSend: PropTypes.func.isRequired,
};

export default ContentX;