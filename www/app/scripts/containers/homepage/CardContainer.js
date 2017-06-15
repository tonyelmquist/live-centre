import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../components/homepage/ProductCard';
import {changeCardIndex, hideVideoCard} from '../../actions/videoCard';
import {connect} from 'react-redux';

class ProductCardContainer extends Component {
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
                videoUrl = {this.props.url}
                changeTab = {this._changeCardIndex}
                closeCard = {this._handleClose}
            />
        );
    }
}


ProductCardContainer.propTypes = {
    active : PropTypes.number,
    changeTab: PropTypes.func,
    index: PropTypes.number,
    url: PropTypes.string,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
    index: state.videoCard.index,
    isVisible:state.videoCard.isVisible,
    url: state.videoCard.url
});

export default connect(mapStateToProps)(ProductCardContainer);
