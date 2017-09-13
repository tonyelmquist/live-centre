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
        //this.updateHeight();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.orientation !== prevProps.orientation || this.props.isMaximized !== prevProps.isMaximized || this.props.isOpen !== prevProps.isOpen) {
            this.updateWidth();
        }
    }


    getStyle = () => {
        this.offscreenY = 320;
        this.minimizedY = 190;
        if (typeof this.videoOverlay !== 'undefined' && this.videoOverlay.clientHeight !== 0) {
            this.heightCheck = this.videoOverlay.clientHeight;
            this.offscreenY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 110);
            this.minimizedY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 66);
        }

        if (this.props.isOpen) {
            if (this.props.isMaximized) {
                return { y: 0, scale: 1, opacity: 1 };
            } else {
                return { y: this.minimizedY, scale: 0.5, opacity: 1 };
            }
        } else {
            return { y: this.offscreenY, opacity: 0, scale: 1 };
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

    getHeight = () => {
        if(this.videoOverlay!== 'undefined'){
            return this.videoOverlay.clientHeight;
        } else {
            return 200;
        }
    }

    onTouchStart = (e) => {
        this.startTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        e.preventDefault();
    };

    onTouchEnd = (e) => {
        this.endTouchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        if (this.startTouchPosition.y - this.endTouchPosition.y < -this.limit) {
            this.onMinimize();
        }
        if (this.startTouchPosition.y - this.endTouchPosition.y > this.limit) {
            this.onMaximize();
        }
    };

    onMaximize = () => {
        if (this.props.orientation === Orientation.PORTRAIT) {
            this.props.maximizeOverlayX();
        }
    };

    onMinimize = () => {
        document.activeElement.blur();
        this.props.hideControlBar();
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
                  y: spring(this.getStyle().y, config),
                  scale: spring(this.getStyle().scale, config),
                  opacity: spring(this.getStyle.opacity, config),
              }}
            >
                {({ y, scale, opacity }) => (<div
                    className={`fs-overlay isOpen`}
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
