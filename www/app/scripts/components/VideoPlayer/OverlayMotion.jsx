import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Orientation } from '../../constants/reduxConstants';

class Overlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            overlayStyle: {
                position: 'relative',
                height: 'auto',
                width: '100%',
            },
            motionStyle: {
                y: 0,
                scale: 1,
                opacity: 0,
            },
        };
    }

    componentDidMount() {
        this.updateWidth();
        this.updateHeight();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.orientation !== prevProps.orientation) {
            this.updateWidth();
        }

        if (this.props.isOpen !== prevProps.isOpen || this.props.isMaximized !== prevProps.isMaximized){
            this.updateHeight();
        }
    }

    updateHeight = () => {
        if (typeof this.videoOverlay !== 'undefined') {
            this.heightCheck = this.videoOverlay.clientHeight;
            this.offscreenY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 110);
            this.minimizedY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 66);
        }

        if (this.props.isOpen) {
            console.log("Isopen");
            if (this.props.isMaximized) {
                this.setState({ motionStyle: { ...this.state.motionStyle, scale: 1, y: 0, opacity: 1 } });
            } else {
                this.setState({ motionStyle: { ...this.state.motionStyle, y: this.minimizedY, scale: 0.5, opacity: 1 } });
            }
        } else {
            this.setState({ motionStyle: { ...this.state.motionStyle, y: this.offscreenY, opacity: 0, scale: 1 } });
        }
    }

    updateWidth = () => {
        const deviceHeight = window.innerHeight;
        const deviceWidth = window.innerWidth;
        const minWidth = Math.min(deviceHeight, deviceWidth);

        if (minWidth < 800) {
            if (this.props.orientation === Orientation.LANDSCAPE) {
                this.setState({ overlayStyle: { ...this.state.overlayStyle,
                    position: 'fixed',
                    height: '100%',
                    width: deviceWidth,
                    minWidth: '100%',
                } });
            } else {
                this.setState({ overlayStyle: { ...this.state.overlayStyle,
                    position: 'fixed',
                    height: 'auto',
                    width: deviceWidth,
                    minWidth: '100%',
                } });
            }
        }
    }

    heightCheck = 0;
    offscreenY = 320;
    minimizedY = 190;


    render() {

        const config = {
            stiffness: 60,
            damping: 15,
        };

        return (
            <Motion
              style={{
                  y: spring(this.state.motionStyle.y, config),
                  scale: spring(this.state.motionStyle.scale, config),
                  opacity: spring(this.state.motionStyle.opacity, config),
              }}
            >
                {({ y, scale, opacity }) => (<div
                    className={'fs-overlay isOpen'}
                    ref={ref => (this.videoOverlay = ref)}
                    style={{
                        ...this.state.overlayStyle,
                        opacity,
                        transform: `translate3d(0, ${y}%, 0) scale3d(${scale}, ${scale}, 1)`,
                    }}
                    id="overlayDiv"
                >
                    {this.props.children}
                </div>)
}
            </Motion>
        );
    }
}

Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    orientation: PropTypes.string.isRequired,
};

export default Overlay;
