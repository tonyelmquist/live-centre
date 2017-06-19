import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, Row} from 'react-flexbox-grid';
import HeroCarousel from './Carousel';
import Player from './Player';
import {changeScore} from '../actions/score';
import {changeCardIndex, showVideoCard, changeCardCategory, changeVideoInfo} from '../actions/videoCard';
import CategoryRow from '../components/CategoryRow';
import Overlay from '../containers/OverlayContainer';

class HomeGrid extends Component {

    _changeCardCategory = (category) => {
        this.props
            .dispatch(changeCardCategory(category));
    }
    _showVideoCard = () => {
        this.props
            .dispatch(showVideoCard());
    }
    _changeVideoInfo = (video) => {
        this.props.dispatch(changeVideoInfo(video));
    }

    createVideoList = (videos) => {

        const videoList = [];
            for(const key in videos){
                videoList.push((
                    <CategoryRow
                        key={`categoryRow-${key}`}
                        handleCardCategory={this._changeCardCategory}
                        handleVideoInfo = {this._changeVideoInfo}
                        showVideoCard={this._showVideoCard}
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
                {this.props.overlayVisible ? <Overlay /> : <HeroCarousel/>}
                <div className={this.props.overlayVisible ? 'hidden': ''}>
                    {this.createVideoList(this.props.videos)}
                </div>
            </div>
        );
    }
}

HomeGrid.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    videoCard: PropTypes.object,
    categories: PropTypes.array,
    videos: PropTypes.object.isRequired,
    overlayVisible: PropTypes.bool
};

const mapStateToProps = (state) => ({
    selected: state.playback.isSelected,
    videoCard: state.videoCard,
    categories: state.videos.categories,
    videos: state.videos.items,
    overlayVisible: state.overlay.isVisible
});


export default connect(mapStateToProps)(HomeGrid);
