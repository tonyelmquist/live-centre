import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, Row} from 'react-flexbox-grid';
import Player from './Player';


import {changeScore} from '../actions/score';
import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';
import CategoryRow from '../components/CategoryRow';

class HomeGrid extends Component {
    _changeCardIndex = (index) => {
        this.props.dispatch(changeCardIndex(index));
    }
    _changeCardCategory = (category) => {
        this.props.dispatch(changeCardCategory(category));
    }
    _showVideoCard = () => {this.props.dispatch(showVideoCard());}
    _hideVideoCard = () => {this.props.dispatch(hideVideoCard());}

    createVideoList = () => {

        const categories = [...new Set(this.props.videos.map((item) => item.category))].filter(Boolean);
        //const categories = ["Uncategorized", "Program Master"];
        return categories.map((category) => (
            <CategoryRow key={category}
                handleCardIndex = {this._changeCardIndex}
                handleCardCategory = {this._changeCardCategory}
                showVideoCard = {this._showVideoCard}
                hideVideoCard = {this._hideVideoCard}
                categoryState = {this.props.videoCard.category}
                cardIsVisible = {this.props.videoCard.isVisible}
                category={category}
                videoCard={this.props.videoCard}
                videos={this
                .props
                .videos
                .filter((video) => {
                    return video.category === category;
                })}></CategoryRow>
        ));
    }
    render() {
        return (
            <div>
                {this.props.selected && <Player videoUrl={this.props.videoUrl}/>}
                {this.createVideoList()}
            </div>
        );
    }
}

HomeGrid.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoUrl: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    videos: PropTypes.array,
    videoCard: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        videoUrl: state.playback.url,
        selected: state.playback.isSelected,
        videos: state.videos.items,
        videoCard: state.videoCard
    };
};

export default connect(mapStateToProps)(HomeGrid);
