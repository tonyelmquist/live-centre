import React from 'react';
import PropTypes from 'prop-types';
import VideoSplash from './VideoSplash';

import { Motion, spring, TransitionMotion } from 'react-motion';

class VideoSplashContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [
                { message: 'Free kick Real Madrid' },
            ],
            currentSplash: 3,
            scrollTop: 0,
        };
    }
    componentDidMount() {
        // setTimeout(() => { this.pushSplash("hest"); }, 6000);
        this.pushAllMessages();
    }

    pushAllMessages = () => {
        const newMessages = [
            { message: 'Goal kick for Juventus Turin at Principality Stadium.' },
            { message: 'Goal kick for Juventus Turin at Principality Stadium.' },
            { message: 'Felix Brych signals a free kick to Real Madrid.' },
            { message: 'Goal kick for Juventus Turin at Principality Stadium.' },
            { message: 'Felix Brych signals a free kick to Real Madrid.' },
            { message: 'Throw-in for Real Madrid in their own half' },
            { message: 'Felix Brych signals a free kick to Juventus Turin in their own half.' },
            { message: 'Juventus Turin awarded a free kick in their own half.' },
            { message: 'Felix Brych signals a free kick to Juventus Turin in their own half.' },
            { message: "Felix Brych signals a throw-in for Juventus Turin, close to Juventus Turin's area." },
        ];
        for (const key in newMessages) {
            setTimeout(() => { this.pushSplash(newMessages[key].message); }, 4000 * key);
        }
    }

    pushSplash = (message) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, { key: 4, message }],
            currentSplash: prevState.messages.length,
        }));

        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const scroller = this.splashScroll.scroller;
        const padding = 20 * 2;
        console.log(scroller.scrollHeight, scroller.clientHeight);
        if((window.innerHeight + padding) <= scroller.clientHeight){
            console.log("SCROLL NOW", window.innerHeight + padding,  scroller.scrollHeight);
            const scrollDown = scroller.scrollTop + 120;
            this.setState({scrollTop: scrollDown});
        } else {
            return false
        }
    }

    render() {
        const { messages, currentSplash } = this.state;

        return (
            <Motion style={{ scrollTop: spring(this.state.scrollTop) }}>
                {motion => {
                    return <SplashScroll ref={ref => (this.splashScroll = ref)} scrollTop={motion.scrollTop} messages={messages} currentSplash={currentSplash} />;
                }}
            </Motion>
        );
    }
}

class SplashScroll extends React.Component {
    render(){
        const { messages, currentSplash } = this.props;
        const style = {
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: '20px',
            width: '40%',
            maxHeight: '100%',
            //height: '100%',
            overflow: 'scroll',
        };
        if(this.scroller != undefined && this.scroller.scrollTop != this.props.scrollTop){
           console.log("Scroll to",this.props.scrollTop);
           this.scroller.scrollTop = this.props.scrollTop;
        }
        return (
            <div style={style} ref={ref => (this.scroller = ref)}>
                {messages.map((message, key) => {
                    return (
                        <VideoSplash message={message.message} currentSplash={currentSplash} />
                    );
                })}
            </div>
        );
    }
}

// //ref={ref => (this.scroller = ref)} onScroll={this.handleScroll.bind(this)}
export default VideoSplashContainer;
