import React from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Close from 'material-ui/svg-icons/navigation/close';
import {blue500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';

let styles = {};

const deviceHeight = window.innerHeight;

const deviceWidth = window.innerWidth;

const minWidth = Math.min(deviceHeight, deviceWidth);

const maxWidth = Math.max(deviceHeight, deviceWidth);

if (minWidth < 800) {
    styles = {
        overlayStyle: {
            position: 'fixed',
            height: 'auto',
            width: deviceWidth,
            minWidth: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
            backgroundColor: 'black'
        },
        mediumIcon: {
            width: 28,
            height: 28
        },
        fullscreenButton: {
            position: 'absolute',
            zIndex: 1500,
            top: 5,
            right: 5
        },
        medium: {
            width: 40,
            height: 40,
            padding: 8
        },
        overlayHeaderStyle: {
            display: 'none'
        }
    };
} else {
    styles = {
        overlayStyle: {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0
        },
        fullscreenButton: {
            display: 'none'
        },
        mediumIcon: {
            width: 28,
            height: 28
        },
        medium: {
            width: 40,
            height: 40,
            padding: 8
        }
    };
}

class Overlay extends React.Component {

    render() {
        let offscreenY = 320;
        let minimizedY = 190;
        if (typeof this.overlayRef !== 'undefined') {
            offscreenY = Math.round((window.innerHeight / this.overlayRef.clientHeight) * 110);
            minimizedY = Math.round((window.innerHeight / this.overlayRef.clientHeight) * 66);
        }
        let _y = 0;
        let _scale = 1;

        if (this.props.isOpen) {
            if (this.props.isMaximized) {
                _scale = 1;
                _y = 0;
            } else {
                _y = minimizedY;
                _scale = 0.5;
            }
        } else {
            _y = offscreenY;
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
            }}>
                {({y, scale}) => <div
                    className={`fs-overlay isOpen`}
                    ref={ref => (this.overlayRef = ref)}
                    style={{
                    ...styles.overlayStyle,
                    'transform': `translate3d(0, ${y}%, 0) scale3d(${scale}, ${scale}, 1)`
                }}
                    id="overlayDiv">
                    {/*<div className="overlay-header" style={styles.overlayHeaderStyle}>
                        <IconButton
                            iconStyle={styles.mediumIcon}
                            style={styles.medium}
                            onTouchTap={this.props.handleClose}>
                            <ArrowBack hoverColor={blue500}/>
                        </IconButton>
                    </div>*/}
                    {this.props.children}
                    {/*<FloatingActionButton
                        mini
                        secondary
                        style={styles.fullscreenButton}
                        onTouchTap={this.props.handleClose}
                        >
                        <Close />
                        </FloatingActionButton>*/}
                </div>
}
            </Motion>
        );
    }
}

Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default Overlay;