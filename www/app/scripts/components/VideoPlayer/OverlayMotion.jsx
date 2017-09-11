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

    limit = 50;

    onTouchStart = (e) => {
        console.log("on touch start");
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    };

    onTouchEnd = (e) => {
        console.log("on touch end");
        this.endTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        console.log(this.endTouchPosition.y, this.startTouchPosition.y);

        if (this.startTouchPosition.y - this.endTouchPosition.y < -this.limit) {
            this.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.onMaximize();
        }
    };

    onMaximize = () => {
        console.log("ON MAXIMIZE");
        if (this.props.orientation === Orientation.PORTRAIT) {
            this.props.maximizeOverlayX();
        }
    };

    onMinimize = () => {
        document.activeElement.blur();
        console.log("ON MINIMIZE")
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.isMaximized) {
                this.props.closeOverlayX();
            } else {
                this.props.minimizeOverlayX();
            }
        } else {
            this.props.closeOverlayX();
        }
    };

    heightCheck = 0;
    offscreenY = 320;
    minimizedY = 190;


    render() {

        const config = {
            stiffness: 60,
            damping: 15,
        };

        const playerStyles = {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
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
                    <div style={playerStyles} className={'IMRPlayer'} onScroll={this.onScroll} onTouchTap={this.onTouchTap} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                        {this.props.children}
                    </div>
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
