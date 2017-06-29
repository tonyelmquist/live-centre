import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCard from '../../components/homepage/ProductCard';
// import ProductCardMobile from '../../components/homepage/ProductCardMobile';
import { changeCardIndex, hideVideoCard } from '../../actions/videoCard';
import { videoSelected, invalidateSelected } from '../../actions/video';
import { showOverlay, hideOverlay } from '../../actions/overlay';
import { videoPrefix } from '../../constants/mediaPrefix';


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
        return (
          <ProductCard
            active={this.props.index}
            video={this.props.video}
            changeTab={this._changeCardIndex}
            closeCard={this._handleClose}
            handlePlay={this._handlePlay}
          />
        );
        // return (
        //     <ProductCardMobile
        //         video = {this.props.video}
        //         closeCard = {this._handleClose}
        //         handlePlay = {this._handlePlay}
        //     />
        // );
    }
}


ProductCardContainer.propTypes = {
    active: PropTypes.number,
    changeTab: PropTypes.func,
    index: PropTypes.number,
    video: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
    index: state.videoCard.index,
    isVisible: state.videoCard.isVisible,
    video: state.videoCard.video,
});

export default connect(mapStateToProps)(ProductCardContainer);
