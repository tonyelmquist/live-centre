import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import ProductCard from '../../components/homepage/ProductCard';
import ProductCardMobile from '../../components/homepage/ProductCardMobile';
import { changeCardIndex, hideVideoCard } from '../../actions/videoCard';
import { videoSelected } from '../../actions/video';
import { openOverlayX, maximizeOverlayX, resetCurrentTimeInOverlayX } from '../../actions/overlayX';


class ProductCardContainer extends Component {
    _handlePlay = (video) => {
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
        console.log("cardcontainer",this.props.series);
        if (this.props.isVisible) {
            return (
              <div className='video-info-overlay'>
                <MediaQuery maxWidth={1000}>
                  <ProductCardMobile
                    video={this.props.video}
                    videos={this.props.videos}
                    series={this.props.series}
                    seasons={this.props.seasons}
                    closeCard={this._handleClose}
                    handlePlay={this._handlePlay}
                    active={this.props.index}
                    changeTab={this._changeCardIndex}
                  />
                </MediaQuery>
                <MediaQuery minWidth={1001}>
                  <ProductCard
                    video={this.props.video}
                    videos={this.props.videos}
                    series={this.props.series}
                    seasons={this.props.seasons}
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
    videos: PropTypes.objectOf(PropTypes.any).isRequired,
    series: PropTypes.objectOf(PropTypes.any).isRequired,
    seasons: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
    index: state.videoCard.index,
    isVisible: state.videoCard.isVisible,
    video: state.videoCard.video,
    videos: state.videos,
    series: state.series,
    seasons: state.seasons,
});

export default connect(mapStateToProps)(ProductCardContainer);
