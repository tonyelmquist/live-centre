import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Overlay from '../components/common/Overlay';
import Playback from '../components/common/Playback';
import { hideOverlay } from '../actions/overlay';
// import { videoSelected, invalidateSelected, fullScreenMode, exitFullScreenMode } from '../actions/video';

class OverlayContainer extends Component {

    _handleClose = () => {
        this.props.dispatch(hideOverlay());
    }

    render() {
        return (
          <Overlay handleClose={this._handleClose}>
            <Playback videoUrl={this.props.videoUrl} />
          </Overlay>
        );
    }
}

OverlayContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    videoUrl: state.playback.url,
});

export default connect(mapStateToProps)(OverlayContainer);
