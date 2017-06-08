import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, Row} from 'react-flexbox-grid';
import HeroCarousel from './Carousel';
import Player from './Player';
import {changeScore} from '../actions/score';
import {changeCardIndex, showVideoCard, hideVideoCard, changeCardCategory} from '../actions/videoCard';
import CategoryRow from '../components/CategoryRow';
import Overlay from '../containers/OverlayContainer';

class HomeGrid extends Component {

    _changeCardIndex = (index) => {
        this
            .props
            .dispatch(changeCardIndex(index));
    }
    _changeCardCategory = (category) => {
        this
            .props
            .dispatch(changeCardCategory(category));
    }
    _showVideoCard = () => {
        this
            .props
            .dispatch(showVideoCard());
    }
    _hideVideoCard = () => {
        this
            .props
            .dispatch(hideVideoCard());
    }

    createVideoList = (videos) => {

        const videoList = [];
            for(const key in videos){
                videoList.push((
                    <CategoryRow
                        key={key}
                        handleCardIndex={this._changeCardIndex}
                        handleCardCategory={this._changeCardCategory}
                        showVideoCard={this._showVideoCard}
                        hideVideoCard={this._hideVideoCard}
                        categoryState={this.props.videoCard.category}
                        cardIsVisible={this.props.videoCard.isVisible}
                        category={key}
                        videoCard={this.props.videoCard}
                        videos={videos[key]}></CategoryRow>
                ));
            }
        return videoList;
    }

    render() {
        return (
            <div>
                {!this.props.overlayVisible && <HeroCarousel/>}
                {/* {this.props.selected && <Player videoUrl={this.props.videoUrl}/>} */}
                {this.props.overlayVisible && <Overlay />}
                {this.createVideoList(this.props.videos)}
            </div>
        );
    }
}

HomeGrid.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoUrl: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    videoCard: PropTypes.object,
    categories: PropTypes.array,
    videos: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    videoUrl: state.playback.url,
    selected: state.playback.isSelected,
    videoCard: state.videoCard,
    categories: state.videos.categories,
    videos: state.videos.items,
    overlayVisible: state.overlay.isVisible
});


export default connect(mapStateToProps)(HomeGrid);
