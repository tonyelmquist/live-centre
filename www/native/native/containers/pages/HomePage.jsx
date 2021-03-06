import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCarousel from '../Carousel';
import { changeCardCategory, changeVideoInfo } from '../../../../../native/shared/actions/videoCard';
import { videoSelected } from '../../../../../native/shared/actions/videoPlayer';
import { openVideoOverlay, maximizeVideoOverlay } from '../../../../../native/shared/actions/videoOverlay';
import VideoSwiper from '../../components/VideoSwiper';
import { setSplashScreenShowing } from '../../../../../native/shared/actions/splashScreen';

class HomePage extends Component {

    componentWillUnmount() {
        console.log('HOMEPAGE WILL UNMOUNT');
    }

    _changeCardCategory = (category) => {
        this.props
            .dispatch(changeCardCategory(category));
    }

    _onTileClick = (video) => {
        this.props.dispatch(openVideoOverlay());
        this.props.dispatch(maximizeVideoOverlay());
        this.props.dispatch(videoSelected(video));
    }

    _changeVideoInfo = (video) => {
        this.props.dispatch(changeVideoInfo(video));
    }

    createVideoList = (tags, videos) => {
        const videoList = [];

        //Check if the tags are fetched before generating the list. 
        if(tags.fetched){
            Object.keys(tags.items).map(key => {
                const videos = tags.items[key].getVideos();
                videoList.push(<VideoSwiper
                    key={`videoswiper-${key}`}
                    handleCardCategory={this._changeCardCategory}
                    handleVideoInfo={this._changeVideoInfo}
                    onTileClick={this._onTileClick}
                    cardIsVisible={this.props.videoCard.isVisible}
                    videoCard={this.props.videoCard}
                    videos={videos}
                    tag={tags.items[key]}
                />);
            });
            return videoList;
        }

        return <div />;
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.props.dispatch(setSplashScreenShowing(true));
        }, 2000);
    }

    render() {
        let transitionStarting = false;
        if (this.props.history.location.pathname !== '/') {
            transitionStarting = true;
        }

        return (

          <div>
            {this.props.overlayVisible ? <div /> : <HeroCarousel transitionStarting={transitionStarting} /> }
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
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags,
    videoUrl: state.playback.url,
    selected: state.playback.isSelected,
    videoCard: state.videoCard,
});


export default connect(mapStateToProps)(HomePage);
