import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCard from '../../components/homepage/ProductCard';
import ProductCardMobile from '../../components/homepage/ProductCardMobile';
import { changeCardIndex, hideVideoCard } from '../../actions/videoCard';
import { videoSelected, invalidateSelected } from '../../actions/video';
import { showOverlay, hideOverlay } from '../../actions/overlay';
import { videoPrefix } from '../../constants/mediaPrefix';

import MediaQuery from 'react-responsive';

class ProductCardContainer extends Component {
    _handlePlay = (videoUrl) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${videoUrl}`));
    }
    _changeCardIndex = (index) => {
        this.props.dispatch(changeCardIndex(index));
    }
    _handleClose = () => {
        this.props.dispatch(hideVideoCard());
    }
    render() {
        if(this.props.isVisible){
            return (
              <div>
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
    changeTab: PropTypes.func,
    index: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    index: state.videoCard.index,
    isVisible: state.videoCard.isVisible,
    video: state.videoCard.video,
});

export default connect(mapStateToProps)(ProductCardContainer);
