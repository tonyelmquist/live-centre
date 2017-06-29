import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-flexbox-grid';
import HeroCarousel from './Carousel';
import Player from './Player';
import { changeScore } from '../actions/score';
import { changeCardIndex, showVideoCard, changeCardCategory, changeVideoInfo } from '../actions/videoCard';
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


    createVideoList = (tags, videos) => {

        const videoList = [];

        for(const key in tags){

            //Extract the videos from the categories and make an array of the videos to pass the categoryRow. 
            const videoInCategory = [];
            tags[key].videos.map((videoKey)=>{
                //console.log("video in tag",key,videos[videoKey]);
                videoInCategory.push(videos[videoKey]);    
            });

            videoList.push(
                <CategoryRow
                    key={`categoryrow-${key}`}
                    handleCardCategory={this._changeCardCategory}
                    handleVideoInfo = {this._changeVideoInfo}
                    showVideoCard={this._showVideoCard}
                    cardIsVisible={this.props.videoCard.isVisible}
                    videoCard={this.props.videoCard}
                    videos={videoInCategory}
                    tag={tags[key]}
                />
            );
       }
       return videoList;
    }

    render() {
        return (

            <div>
                {this.props.overlayVisible ? <Overlay/> : <HeroCarousel/>}

                <div className={this.props.overlayVisible ? 'hidden': ''}>
                    {this.createVideoList(this.props.tags, this.props.videos)}
                </div>
            </div>
        );
    }
}

HomeGrid.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    videoCard: PropTypes.object,
    videos: PropTypes.object.isRequired,
    overlayVisible: PropTypes.bool,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
    videoUrl: state.playback.url,
    selected: state.playback.isSelected,
    videoCard: state.videoCard,
    overlayVisible: state.overlay.isVisible,
});


export default connect(mapStateToProps)(HomeGrid);
