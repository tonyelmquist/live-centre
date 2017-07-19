import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import ProductCard from '../../components/homepage/ProductCard';
import ProductCardMobile from '../../components/homepage/ProductCardMobile';
import { changeCardIndex, hideVideoCard } from '../../actions/videoCard';
import { videoSelected } from '../../actions/video';
import { showOverlay } from '../../actions/overlay';
import { resetCurrentTimeInOverlayX } from '../../actions/overlayX';
import { openOverlayX, maximizeOverlayX, setVideoInfo } from '../../actions/overlayX';
import videoPrefix from '../../constants/mediaPrefix';


class ProductCardContainer extends Component {
    _handlePlay = (video) => {
        //this.props.dispatch(setVideoInfo({url: `{videoPrefix}${assetId}`}));
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
        this.props.dispatch(resetCurrentTimeInOverlayX());
    }
    _changeCardIndex = (index) => {
        this.props.dispatch(changeCardIndex(index));
    }
    _handleClose = () => {
        this.props.dispatch(hideVideoCard());
    }
    render() {
        if (this.props.isVisible) {
            return (
              <div className='video-info-overlay'>
                <MediaQuery maxWidth={1000}>
                  <ProductCardMobile
                    video={this.props.video}
                    closeCard={this._handleClose}
                    handlePlay={this._handlePlay}
                    active={this.props.index}
                    changeTab={this._changeCardIndex}
                  />
                </MediaQuery>
                <MediaQuery minWidth={1001}>
                  <ProductCard
                    video={this.props.video}
                    closeCard={this._handleClose}
                    handlePlay={this._handlePlay}
                    active={this.props.index}
                    changeTab={this._changeCardIndex}
                  />
                </MediaQuery>
              </div>
            );
        }
        return (
          <span />
        );
    }
}


ProductCardContainer.propTypes = {
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    video: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
    index: state.videoCard.index,
    isVisible: state.videoCard.isVisible,
    video: state.videoCard.video,
});

export default connect(mapStateToProps)(ProductCardContainer);
