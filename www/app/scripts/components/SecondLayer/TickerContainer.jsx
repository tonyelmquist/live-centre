import React from 'react';
import PropTypes from 'prop-types';
import Tick from './Tick';

import { Motion, spring, TransitionMotion } from 'react-motion';

class TickerContainer extends React.Component {
    constructor(props) {
        super(props);

        //Two states, either you are actively scrolling, or you are not, and then the scroller will scroll smoth to bottom. 
        this.state = {
            messages: [
                { message: 'Free kick Real Madrid' },
            ],
            currentSplash: 0, //The newest splash message is always current splash. 
            splashInFocus: 0, //The splash that is in focus (The bottom splash, or whatever we have scrolled to).
            scrollTo: 0, // Auto scroll to. Use this when the user is not scrolling and we want to reset to bottom.
            isScrolling: false, // If we are auto scrolling, then we dont need to check which splash is in focus. 
            preventAutoScroll: false, // Should we prevent auto scroll? The user is actively scrolling.
            showHistory: false, //Should we show the history, passed down to props to change the opacity of the items. 
            forceHideHistory: false, //Dont even any items and remove preventPropogation, because another overlay is open now on the video.
            heightOfItems: 50, //Height of each item
            itemMargin: 10, //Margin on each item
            heightOfContainer: 65, // % height in percentage of container
            containerOffset: 30, //Offset of container
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.messages.length !== this.props.messages.length) {
            return true;
        } 

        if (this.state !== nextState) {
            return true;
        }
        
        
        return false;
        
    }

    setLatestSplash = (prevProps) => {
        if (prevProps.messages && prevProps.messages.length !== this.props.messages.length) {
            if (this.props.messages && this.props.messages.length > 0) {
                this.setState(prevState => ({
                    currentSplash: this.props.messages.length - 1,
                }));
            }
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        this.setLatestSplash(prevProps);
        //If lineup status has changed, see if we should force hide.
        if (prevProps.isLineupShowing !== this.props.isLineupShowing && this.props.isLineupShowing) {
            this.forcehideHistoryNow();
        } else if(prevProps.isLineupShowing !== this.props.isLineupShowing && !this.props.isLineupShowing) {
            this.disableForceHide();
        }

        // IF preventautoscroll, wait til until it is Not preventautoscroll
            // then if new item, scroll down, 
            // if we have hidden the items, scroll down (reset).
        if (!this.state.preventAutoScroll && !this.props.isLineupShowing) {
            if (this.state.currentSplash !== this.state.splashInFocus) {
                //console.log('scroll To Bottom', this.state.currentSplash);
                this.scrollToBottom();
            }
        } 
    }

    // Smooth animating scrollbar with help from the internet. 
    easeOutCubic = (currentIteration, startValue, changeInValue, totalIterations) => changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;

    moveScroller = (from, to, currentIteration) => {
        const changeInValue = to - from;
        let totalIterations;
        changeInValue < this.state.heightOfItems ? totalIterations = changeInValue * 3 : totalIterations = 600; // total iteration + frames per milisec = time spent. 
        const FPM = 10; //How smooth/ hard the animation will be. 
        
        const newPos = this.easeOutCubic(currentIteration, from, changeInValue, totalIterations);
       // console.log(newPos);
        if (currentIteration >= totalIterations) {
            this.scroller.scrollTop = newPos;
            this.setState({isScrolling: false});
            return newPos;
        }
        this.scroller.scrollTop = newPos;

        setTimeout(() => {
            this.moveScroller(from, to, currentIteration + FPM);
        }, FPM);
    }

    animateScrollBarFromTo = (from, to) => {
        const startIteration = 1;
        this.moveScroller(from, to, startIteration);
    }

    // Scroll to bottom of page
    scrollToBottom = () => {
        const scroller = this.scroller;
        const topOffset = this.state.containerOffset;
        //Set the new item (currentsplash) as the focus. 
        if (this.state.splashInFocus !== this.state.currentSplash) {
            this.setState({ splashInFocus: this.state.currentSplash, isScrolling: true });
        }
        //Check if we need to scroll (if the containers height exceed the height of the window)
        //Wait 500 milisec so we know the new item has been put into the scrollbar to prevent jumping.
        const currentHeight = scroller.clientHeight;
        const maxHeight = (window.innerHeight * (this.state.heightOfContainer / 100) );
        if (Math.floor(maxHeight) <= Math.floor(currentHeight)) {
            setTimeout(() => {
                //Scroll from where the scroller is now to the full height (bottom) of the page. 
                const scrollFrom = this.scroller.scrollTop;
                const scrollTo = this.scroller.scrollHeight - this.scroller.offsetHeight;
                // this.changeScroller(scrollFrom, scrollTo);
                this.animateScrollBarFromTo(scrollFrom, scrollTo);
            }, 500);
        }
    }

    //Stop propagation to not pause the video. 
    onTouchStart = (e) => {
        if (!this.state.forceHideHistory) {
            e.stopPropagation();
            this.showHistory();
            clearTimeout(this._hideScrollerTimeout); 
        }
    }
    // User has released touch, wait X sec and scroll down + fade out items.
    onTouchEnd = (e) => {
        if (!this.state.forceHideHistory) {
            e.stopPropagation();
            
            this._hideScrollerTimeout = setTimeout(() => {
                this.setState({ preventAutoScroll: false });
                this.setState({ showHistory: false });
            }, 3000);  
        }
    }

    onTouchTap = (e) => {
        if(!this.state.forceHideHistory){
            e.stopPropagation();
        } 
        //clearTimeout(this._hideScrollerTimeout); 
    }

    onScroll = (e) => {
        if (!this.state.forceHideHistory) {
            e.stopPropagation();
            this.checkScrollPos();
        }
    }

    checkScrollPos = (e) => {
        if (!this.state.isScrolling){ //If we are autoscrolling, we dont need to check
            const bottom = this.scroller.scrollHeight - this.scroller.offsetHeight;
            const itemFullHeight = this.state.heightOfItems + this.state.itemMargin
            if (((bottom - this.scroller.scrollTop) / itemFullHeight) > 1){ //Each item is 110px high. 
                //Divide this by the amount scrolled and we know how many items to shif the focis. 
                this.setState({splashInFocus: this.state.currentSplash + (this.scroller.scrollTop - bottom) / itemFullHeight});
            }
        }
    }

    //Show splash history 
    showHistory = () => {
        if (!this.state.preventAutoScroll) { this.setState({ preventAutoScroll: true }); }
        this.setState({ showHistory: true });
    }

    forcehideHistoryNow = () => {
        if (!this.state.forceHideHistory){
            this.setState({ forceHideHistory: true });
        }
    }

    disableForceHide = () => {
        if (this.state.forceHideHistory){
            this.setState({ forceHideHistory: false });
        }
    }

    getStyle = () => {
        return {
            position: 'absolute',
            right: 0,
            bottom: this.state.containerOffset,
            padding: '0 20px',
            maxHeight: `${this.state.heightOfContainer}%`,
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '40%',
            opacity: this.state.forceHideHistory ? 0 : 1,
        };
    }

    render() {
        // const { messages, currentSplash } = this.state;
        const currentSplash = this.state.currentSplash;
        const messages = this.props.messages;

        if (messages.length > 0){
            return (
                <div
                    style={this.getStyle()}
                    ref={ref => (this.scroller = ref)}
                    onTouchTap={this.onTouchTap}
                    onScroll={this.onScroll}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                >
                    {messages.map((message, key) => (
                        <Tick
                                showHistory={this.state.showHistory}
                                preventAutoScroll={this.state.preventAutoScroll}
                                message={message}
                                currentSplash={this.state.splashInFocus}
                                id={key}
                                forceHideHistory={this.state.forceHideHistory}
                                matchInfo={this.props.matchInfo}
                        />
                        ))}
                </div>
            );
        }
        return <div className="ticker-container-empty"/>
        
    }
}

export default TickerContainer;
