import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Orientation } from '../../constants/reduxConstants';

class Overlay extends React.Component {
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
            this.props.maximizeVideoOverlay();
        }
    };

    onMinimize = () => {
        document.activeElement.blur();
        this.props.hideControlBar();
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.isMaximized) {
                this.props.closeVideoOverlay();
            } else {
                this.props.minimizeVideoOverlay();
            }
        } else {
            this.props.closeVideoOverlay();
        }
    };

    getHeight = () => {
        if(this.videoOverlay!== 'undefined'){
            return this.videoOverlay.clientHeight;
        } 
            return 200;
        
    }

    heightCheck = 0;
    offscreenY = 320;
    minimizedY = 190;
    limit = 50;


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

        if (typeof this.videoOverlay !== 'undefined' && this.videoOverlay.clientHeight !== 0) {
            this.heightCheck = this.videoOverlay.clientHeight;
            this.offscreenY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 110);
            this.minimizedY = Math.round((window.innerHeight / this.videoOverlay.clientHeight) * 66);
        }

        //Styles that will be changed by motion
        let motionStyle = {                
            y: 0,
            scale: 1,
            opacity: 0,
        };
        if (this.props.isOpen) {
            if (this.props.isMaximized) {
                motionStyle = { y: 0, scale: 1, opacity: 1 };
            } else {
                motionStyle = { y: this.minimizedY, scale: 0.5, opacity: 1 };
            }
        } else {
            motionStyle = { y: this.offscreenY, opacity: 0, scale: 1 };
        }

        //Other styles
        let overlayStyle = {
            position: 'relative',
            height: 'auto',
            width: '100%',
        };
        const deviceHeight = window.innerHeight;
        const deviceWidth = window.innerWidth;
        const minWidth = Math.min(deviceHeight, deviceWidth);
        if (minWidth < 800) {
            if (this.props.orientation === Orientation.LANDSCAPE) {
                overlayStyle = {
                    position: 'fixed',
                    height: '100%',
                    width: deviceWidth,
                    minWidth: '100%',
                };
            } else {
                overlayStyle = {
                    position: 'fixed',
                    height: 'auto',
                    width: deviceWidth,
                    minWidth: '100%',
                };
            }
        }


        return (
            <Motion
              style={{
                  y: spring(motionStyle.y, config),
                  scale: spring(motionStyle.scale, config),
                  opacity: spring(motionStyle.opacity, config),
              }}
            >
                {({ y, scale, opacity }) => (
                    <div
                        className={'fs-overlay isOpen'}
                        ref={ref => (this.videoOverlay = ref)}
                        style={{
                            ...overlayStyle,
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
