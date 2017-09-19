import React from 'react';
import { Motion, spring, TransitionMotion } from 'react-motion';

class Tick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                x: 0,
                y: 0,
                o: 0.2,
            },
        };
    }
    componentDidMount() {
        this.setEnterStyle();
        const timeBeforeFadeout = 4000;
        setTimeout(() => { this.fadeOutNewItem(); }, timeBeforeFadeout);
    }

    // When a new item enters fade and slide it in.
    setEnterStyle = () => {
        this.setState({ style: { x: 0, o: 1, y: 50 } });
    }
    // Then fade it out again.
    fadeOutNewItem = () => {
        this.setState(prevState => ({ style: { ...prevState.style, o: 0, x: 100 } }));
        // this.setState({ style.o: 0 });
    }


    getStyle = (x, o, y) =>
         ({
             transform: `translateX(${x}%) skew(-10deg)`,
             height: y, // Use height so the old items dont jump.
             opacity: o,
         });

    getOpacity = () => {
        const fadeExpo = 0.3;
        if(this.props.forceHideHistory){
            return 0;
        }
        // If we are showing the items:
        if (this.props.showHistory) {
            // The focused splash should be fully visible
            if (this.props.currentSplash === this.props.id) {
                return 1;
            }
            // The rest should fade depending on the distance from the items.
            return 1 - ((this.props.currentSplash - this.props.id) * fadeExpo);
        }
        // IF not showing items and this is the splash in focus.
        if (this.props.currentSplash === this.props.id) {
            //return this.state.style.o; // Use the state opacity (fade in on insert).
            return 1;
        }
        return 0; // Hide all other.
    }

    getX = () => {
        if(this.props.forceHideHistory){
            return 100;
        }
        if(this.props.showHistory){
            return 0
        } else {
            if(this.props.currentSplash == this.props.id){
                return this.state.style.x;
            }
            return 100;
        }
    }

    render() {
        return (
            <Motion style={{ x: spring(this.getX()), o: spring(this.getOpacity()), y: spring(this.state.style.y) }}>
                {motion => (
                    <div className="video-splash" style={this.getStyle(motion.x, motion.o, motion.y)} id={motion.x}>
                        <div className="splash-inner">
                            {this.props.message}
                        </div>
                    </div>
                )}
            </Motion>
        );
    }
}

export default Tick;
