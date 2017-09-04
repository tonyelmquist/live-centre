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
            currentSplash: 0,
            scrollTop: 0,
        };
    }

    // Simulates messages.
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
            setTimeout(() => { this.pushSplash(newMessages[key].message); }, 8000 * key);
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
        // console.log(scroller.scrollHeight, scroller.clientHeight);
        if ((window.innerHeight + padding) <= scroller.clientHeight) {
            //Set timeout because we need to wait until the height of the new item is adjusted.
            setTimeout(() => {
                console.log('scroll from ', scroller.scrollTop, 'to', scroller.scrollHeight - scroller.offsetHeight);
                this.setState({ scrollTop: scroller.scrollHeight - scroller.offsetHeight }); 
            }, 300);
        } else {
            return false;
        }
    }


    render() {
        const { messages, currentSplash } = this.state;

        return (
            <Motion style={{ scrollTop: spring(this.state.scrollTop) }}>
                {motion => <SplashScroll ref={ref => (this.splashScroll = ref)} scrollTop={motion.scrollTop} messages={messages} currentSplash={currentSplash} />}
            </Motion>
        );
    }
}

class SplashScroll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHistory: false,
            preventAutoScroll: false,
        };
    }

    onTouchStart = (e) => {
        e.stopPropagation();
        console.log("touch start")
        if (!this.state.preventAutoScroll) {
            this.setState({ preventAutoScroll: true });
            this.showHistory();
        }
    }
    onTouchEnd = (e) => {
        e.stopPropagation();
        console.log("touchEnd, preventAutoscroll = false");
        if (this.state.preventAutoScroll) {
            setTimeout(() => {
                this.setState({ preventAutoScroll: false });
            }, 5000);
        }
    }

    onScroll = (e) => {
        e.stopPropagation();
    }

    showHistory = () => {
        console.log("showHistory");
        this.setState({ showHistory: true });
        const time = 8000;

        setTimeout(() => {
            if (!this.state.preventAutoScroll) {
                console.log("hide history");
                this.setState({ showHistory: false });
                // Scroll to top.
            }
        }, time);
    }

    //Executed on render 
    scrollToBottom = () => {
        
        if (this.scroller.scrollTop != this.props.scrollTop && !this.state.preventAutoScroll) {
            console.log("Scroll to bottom");
            this.scroller.scrollTop = this.props.scrollTop;
        }
    }

    render() {
        const { messages, currentSplash } = this.props;
        const style = {
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: '20px',
            width: '40%',
            maxHeight: '100%',
            // height: '100%',
            overflow: 'scroll',
        };

        if (this.scroller != undefined) {
            this.scrollToBottom();
        }

        return (
            <div
                style={style}
                ref={ref => (this.scroller = ref)}
                onTouchTap={this.onTouchTap}
                onScroll={this.onScroll}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                {messages.map((message, key) => (
                       <VideoSplash
                            showHistory={this.state.showHistory}
                            preventAutoScroll={this.state.preventAutoScroll}
                            message={message.message}
                            currentSplash={currentSplash}
                            id={key}
                       />
                    ))}
            </div>
        );
    }
}

// //ref={ref => (this.scroller = ref)} onScroll={this.handleScroll.bind(this)}
export default VideoSplashContainer;
