import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Category from '../components/common/Category';
import {videoSelected} from '../actions/video';
// import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';

class CategoryContainer extends Component {
    _handleSelect = (assetid) => {
        this.props.dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));
    };

    render() {
        return (
            <Category
                videos={this.props.videos.get(this.props.match.params.categoryKey)}
                category={this.props.match.params.categoryKey}
                onSelect={this._handleSelect}
            />
        );
    };
};

CategoryContainer.propTypes = {
    videos : React.PropTypes.array.isRequired,
    match: React.PropTypes.object
};


const mapStateToProps = (state) => ({
    videos: state.videos.items
});

export default connect(mapStateToProps)(CategoryContainer);
