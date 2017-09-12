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
    height = 200;
    

    onScroll = (e) => {
        e.stopPropagation();
    }

    render() {
        this.checkHeight();

        return (
                <OverlayMotion ref={ref => (this.overlayMotion = ref)}
                    orientation={this.props.orientation}
                    isOpen={this.props.isOpen}
                    isMaximized={this.props.isMaximized}
                    closeOverlayX={() => this.props.dispatch(closeOverlayX())}
                    minimizeOverlayX={() => this.props.dispatch(minimizeOverlayX())}
                    maximizeOverlayX={() => this.props.dispatch(maximizeOverlayX())}
                >
                    {this.props.children}
                </OverlayMotion>

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
