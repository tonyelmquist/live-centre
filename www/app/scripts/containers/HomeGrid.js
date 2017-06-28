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
        if (videos.length > 0) {
            return tags.map(tag =>
                (<CategoryRow
                  key={`categoryrow-${tag.id}`}
                  handleCardCategory={this._changeCardCategory}
                  handleVideoInfo={this._changeVideoInfo}
                  showVideoCard={this._showVideoCard}
                  cardIsVisible={this.props.videoCard.isVisible}
                  videoCard={this.props.videoCard}
                  videos={videos}
                  tag={tag}
                />),

            );
        }
    }

    render() {
        return (
          <div>
            {this.props.overlayVisible ? <Overlay /> : <HeroCarousel />}

            <div className={this.props.overlayVisible ? 'hidden' : ''}>
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
    categories: PropTypes.array,
    videos: PropTypes.array.isRequired,
    overlayVisible: PropTypes.bool,
    tags: PropTypes.array.isRequired,
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
