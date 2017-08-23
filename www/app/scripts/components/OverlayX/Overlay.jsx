import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Orientation } from '../../constants/reduxConstants';

class Overlay extends React.Component {

    componentDidUpdate() {
        if (typeof this.overlayRef !== 'undefined') {
            if (this.heightCheck !== this.overlayRef.clientHeight) {
                this.forceUpdate();
            }
        }
    }

    heightCheck = 0;
    offscreenY = 320;
    minimizedY = 190;

    render() {
        const deviceHeight = window.innerHeight;
        const deviceWidth = window.innerWidth;

        const minWidth = Math.min(deviceHeight, deviceWidth);

        let overlayStyle = {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
        };

        if (minWidth < 800) {
            if (this.props.orientation === Orientation.LANDSCAPE) {
                overlayStyle = {
                    position: 'fixed',
                    height: '100%',
                    width: deviceWidth,
                    minWidth: '100%',
                    zIndex: 1500,
                    top: 0,
                    left: 0,
                    backgroundColor: 'black',
                };
            } else {
                overlayStyle = {
                    position: 'fixed',
                    height: 'auto',
                    width: deviceWidth,
                    minWidth: '100%',
                    zIndex: 1500,
                    top: 0,
                    left: 0,
                    backgroundColor: 'black',
                };
            }
        }

        if (typeof this.overlayRef !== 'undefined') {
            this.heightCheck = this.overlayRef.clientHeight;
            this.offscreenY = Math.round((window.innerHeight / this.overlayRef.clientHeight) * 110);
            this.minimizedY = Math.round((window.innerHeight / this.overlayRef.clientHeight) * 66);
        }
        let _y = 0;
        let _scale = 1;
        let _opacity = 1;

        if (this.props.isOpen) {
            _opacity = 1;
            if (this.props.isMaximized) {
                _scale = 1;
                _y = 0;
            } else {
                _y = this.minimizedY;
                _scale = 0.5;
            }
        } else {
            _y = this.offscreenY;
            _opacity = 0;
            _scale = 1;
        }

        return (
            <Motion
            style={{
                y: spring(_y, {
                    stiffness: 60,
                    damping: 15,
                }),
                scale: spring(_scale, {
                    stiffness: 60,
                    damping: 15,
                }),
                opacity: spring(_opacity, {
                    stiffness: 60,
                    damping: 15,
                }),
            }}
            >
                {({ y, scale, opacity }) => (<div
                    className={'fs-overlay isOpen'}
                    ref={ref => (this.overlayRef = ref)}
                    style={{
                        ...overlayStyle,
                        opacity,
                        transform: `translate3d(0, ${y}%, 0) scale3d(${scale}, ${scale}, 1)`,
                    }}
                    id="overlayDiv"
                >
                    {/* <div className="overlay-header" style={styles.overlayHeaderStyle}>
                        <IconButton
                            iconStyle={styles.mediumIcon}
                            style={styles.medium}
                            onTouchTap={this.props.handleClose}>
                            <ArrowBack hoverColor={blue500}/>
                        </IconButton>
                    </div>*/}
                    {this.props.children}
                    {/* <FloatingActionButton
                        mini
                        secondary
                        style={styles.fullscreenButton}
                        onTouchTap={this.props.handleClose}
                        >
                        <Close />
                        </FloatingActionButton>*/}
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
