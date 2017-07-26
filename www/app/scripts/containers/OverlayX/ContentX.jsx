import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import Chat from '../../components/Chat';
import ContentXInfo from './ContentXInfo';

class ContentX extends Component {

    render() {
        const _y = this.props.isOpen ? (this.props.isMaximized ? -100 : 0) : 0;
        const _o = this.props.isOpen ? (this.props.isMaximized ? 1 : 0) : 0;

        return (
            <Motion style={{
                y: spring(_y, { stiffness: 60, damping: 15 }),
                o: spring(_o, { stiffness: 60, damping: 15 }),
            }}
            >
                {({ y, o }) =>

                    (<div className={'ox-content'} style={{ transform: `translate3d(0, ${y}%, 0)`, opacity: o }}>
                        {/*<ContentXInfo 
                            video={this.props.video}
                        />*/}
                        <Chat messages={this.props.chat} onMessageSend={this.props.onMessageSend} />
                    </div>)
                }
            </Motion>
        );
    }
}

ContentX.propTypes = {
    chat: PropTypes.array.isRequired,
    onMessageSend: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired,
};

export default ContentX;
