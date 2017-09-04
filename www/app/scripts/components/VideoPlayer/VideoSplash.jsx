import React from 'react';
import { Motion, spring, TransitionMotion } from 'react-motion';

class VideoSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                x: 300,
                y: 0,
                o: 0.2,
            },
        };
    }
    componentDidMount() {
        this.setEnterStyle();
        setTimeout(() => { this.fadeOutNewItem() ;}, 4000);
    }

    setEnterStyle = () => {
        this.setState({ style: { x: 0, o: 1, y: 100 } });
    }

    fadeOutNewItem = () => {
        this.setState((prevState) => ({ style: { ...prevState.style, o: 0 } }));
        // this.setState({ style.o: 0 });
    }


    getStyle = (x, o, y) =>
        // console.log(x, o, y);
         ({
             transform: `translateY(${x}px) skew(-10deg)`,
             height: y,
             opacity: o,
         });

    getOpacity = () => {
        const fadeExpo = 0.3;
        if (this.props.showHistory){
            if(this.props.currentSplash === this.props.id){
                return 1
            } 
                return 1 - ((this.props.currentSplash - this.props.id) * fadeExpo)
            
        } else {
            if(this.props.currentSplash === this.props.id){
                return this.state.style.o;
            } else {
                return 0
            }
        }
    }

    render() {
        return (
            <Motion style={{ x: spring(this.state.style.x), o: spring(this.getOpacity()), y: spring(this.state.style.y) }}>
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

export default VideoSplash;
