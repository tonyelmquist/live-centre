import React from 'react';
import { Motion, spring, TransitionMotion } from 'react-motion';

class VideoSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                x: 300,
                y: 0,
                o: 200,
            },
        };
    }
    componentDidMount() {
        this.setEnterStyle();
    }

    setEnterStyle = () => {
        this.setState({ style: { x: 0, o: 1, y:100 } });
    }

    getStyle = (x, o, y) => {
        //console.log(x, o, y);
        return {
            transform: `translateY(${x}px) skew(-10deg)`,
            height: y,
            opacity: o,
        };
    };

    render() {
        return (
            <Motion style={{ x: spring(this.state.style.x), o: spring(this.state.style.o), y: spring(this.state.style.y) }}>
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
