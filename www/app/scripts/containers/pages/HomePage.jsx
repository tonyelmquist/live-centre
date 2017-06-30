import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCarousel from '../Carousel';
import { showVideoCard, changeCardCategory, changeVideoInfo } from '../../actions/videoCard';
import CategoryRow from '../../components/CategoryRow';
import Overlay from '../OverlayContainer';

class HomePage extends Component {

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

        // Extract the videos from the categories
        for (const key in tags) {
            const videoInCategory = tags[key].videos.map((videoKey) => {
                return videos[videoKey];
            });

            videoList.push(
              <CategoryRow
                key={`categoryrow-${key}`}
                handleCardCategory={this._changeCardCategory}
                handleVideoInfo={this._changeVideoInfo}
                showVideoCard={this._showVideoCard}
                cardIsVisible={this.props.videoCard.isVisible}
                videoCard={this.props.videoCard}
                videos={videoInCategory}
                tag={tags[key]}
              />);
        }
        return videoList;
    }

    render() {
        return (

          <div>
            {this.props.overlayVisible ? <div /> : <HeroCarousel /> }
            <div className={this.props.overlayVisible ? 'hidden' : ''}>
              {this.createVideoList(this.props.tags, this.props.videos)}
            </div>
          </div>
        );
    }
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    videoCard: PropTypes.object.isRequired,
    videos: PropTypes.object.isRequired,
    overlayVisible: PropTypes.bool.isRequired,
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


export default connect(mapStateToProps)(HomePage);
