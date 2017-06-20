import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Close from 'material-ui/svg-icons/navigation/close';
import {red500, blue500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';

var styles = {};

const deviceHeight = window.innerHeight;

const deviceWidth = window.innerWidth;

const minWidth = Math.min(deviceHeight, deviceWidth);

const maxWidth = Math.max(deviceHeight, deviceWidth);

if (minWidth < 800) {
    styles = {
        overlayStyle: {
            position: 'fixed',
            height: maxWidth,
            width: maxWidth,
            minWidth: '100%',
            minHeight: '100%',
            zIndex: 2147483647,
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
            zIndex: 2147483647,
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
            zIndex: 2147483647,
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

class Overlay extends Component {

    render() {
        return (
            <div
                className='fs-overlay portrait'
                style={styles.overlayStyle}
                id="overlayDiv"
                ref="overlayDiv">
                <div className='overlay-header' style={styles.overlayHeaderStyle}>
                    <IconButton
                        iconStyle={styles.mediumIcon}
                        style={styles.medium}
                        onTouchTap={this.props.handleClose}>
                        <ArrowBack hoverColor={blue500}/>
                    </IconButton>
                </div>
                {this.props.children}
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={styles.fullscreenButton}
                    onTouchTap={this.props.handleClose}>

                    <Close/>

                </FloatingActionButton>
            </div>
        );
    };
};

Overlay.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.object
};

export default Overlay;
