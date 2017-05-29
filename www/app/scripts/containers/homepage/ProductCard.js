import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../components/homepage/ProductCard';
import changeCardIndex from '../../actions/videoCard';
import {connect} from 'react-redux';

class ProductCardContainer extends Component {
    _changeCardIndex = (index) => {
        this.props.dispatch(changeCardIndex(index));
    }

    render() {
        return (
            <ProductCard
                active={this.props.index}
                changeTab = {_changeCardIndex}
            />
        );
    }
}


ProductCardContainer.propTypes = {
    active : PropTypes.number.isRequired,
    changeTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    index: state.videoCard.index
});

export default connect(mapStateToProps)(ProductCardContainer);
