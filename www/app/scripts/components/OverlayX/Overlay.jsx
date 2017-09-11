import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Orientation } from '../../constants/reduxConstants';
import OverlayMotion from '../VideoPlayer/OverlayMotion';
import { connect } from 'react-redux';
import { maximizeOverlayX, closeOverlayX, minimizeOverlayX } from '../../actions/overlayX';

class Overlay extends React.Component {

    componentDidUpdate() {
        this.checkHeight();
    }

    checkHeight = () => {
        if (typeof this.overlayMotion !== 'undefined'
            && this.overlayMotion !== null
            && typeof this.overlayMotion.videoOverlay !== 'undefined') {
            this.height = this.overlayMotion.videoOverlay.clientHeight;
        }
    }
    height = 0;
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
            this.props.dispatch(maximizeOverlayX());
        }
    };

    onMinimize = () => {
        document.activeElement.blur();
        console.log("ON MINIMIZE")
        if (this.props.orientation === Orientation.PORTRAIT) {
            if (!this.props.overlayX.maximized) {
                this.props.dispatch(closeOverlayX());
            } else {
                this.props.dispatch(minimizeOverlayX());
            }
        } else {
            this.props.dispatch(closeOverlayX());
        }
    };

    onScroll = (e) => {
        e.stopPropagation();
    }

    render() {
        this.checkHeight();

        const playerStyles = {
            position: 'relative',
            height: '100%',
            width: '100%',
            zIndex: 1500,
            top: 0,
            left: 0,
        };

        return (
            <div style={playerStyles} className={'IMRPlayer'} onScroll={this.onScroll} onTouchTap={this.onTouchTap} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                <OverlayMotion ref={ref => (this.overlayMotion = ref)} orientation={this.props.orientation} isOpen={this.props.isOpen} isMaximized={this.props.isMaximized}>
                    {this.props.children}
                </OverlayMotion>
            </div>

        );
    }
}

Overlay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isMaximized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    orientation: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    orientation: state.settings.screenOrientation,
    overlayX: state.overlayX,
});

export default connect(mapStateToProps)(Overlay);
