import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Category from '../components/common/Category';

class CategoryContainer extends Component {
    render() {
        return (
            <Category
                videos={this.props.videos.get(this.props.match.params.categoryKey)}
                category={this.props.match.params.categoryKey}
            />
        );
    };
};

CategoryContainer.propTypes = {
    videos : React.PropTypes.array.isRequired,
    match: React.PropTypes.object
};


const mapStateToProps = (state) => {
    return {videos: state.videos.items};
};

export default connect(mapStateToProps)(CategoryContainer);
