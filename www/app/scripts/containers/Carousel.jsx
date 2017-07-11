import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import FontIcon from 'material-ui/FontIcon';
// import { grey800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import { videoSelected } from '../actions/video';
import { showOverlay } from '../actions/overlay';
import videoPrefix from '../constants/mediaPrefix';

// const FEATURED_CATEGORY = 'Uncategorized';

const styles = {
    carouselContainer: {
        marginTop: 0,
        backgroundColor: 'black',
        marginBottom: 7,
        position: 'relative',
    },
    carousel: {
        width: '67%',
        position: 'relative',
    },
    rightButton: {},
    legend: {
        width: '23%',
        right: '5%',
        top: '20%',
        left: 'inherit',
        marginLeft: 0,
        zIndex: 3,
    },

    largeIcon: {
        width: 40,
        height: 40,
    },
    debugTitle: {
        color: 'white',
    },
};

class HeroCarousel extends Component {
    static defaultProps = {
        videos: {},
        selected: false,
    };

    // constructor(props, defaultProps) {
    //     super(props, defaultProps);
    // }

    _handlePlay = (assetid) => {
        this.props.dispatch(showOverlay());
        this.props.dispatch(videoSelected(`${videoPrefix}${assetid}`));
    };

    syncLeft(currentSlide) {
        this.refs.leftSlider.slickGoTo(currentSlide);
    }

    syncRight(currentSlide) {
        this.refs.rightSlider.slickGoTo(currentSlide);
    }

    render() {
        const self = this;

        const settingsLeft = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            lazyLoad: true,
        //     beforeChange(currentSlide, nextSlide) {
        // //   self.syncLeft(nextSlide);
        //     },
        //     afterChange(currentSlide, nextSlide) {
        // //    self.syncLeft(nextSlide);
        //     },
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                    },
                },
            ],
        };
        const settingsRight = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
            beforeChange(currentSlide, nextSlide) {
                self.syncLeft(nextSlide);
            },
        };

    // Are videos fetched, and is the category loaded?
        if (
      this.props.videos.videosFetched > 0 &&
      this.props.tags.items['Promotional Videos']
    ) {
            const videoKeys = this.props.tags.items['Promotional Videos'].videos;

            const imageList = videoKeys.map((videoKey) => {
                const video = this.props.videos.items[videoKey];
                const videoUrl = `${videoPrefix}${video.id}`;
                return (
                  <div key={`carousel-${videoKey}`} style={styles.carousel}>
                    <div className="heroCarouselImage" key={videoKey}>
                      <div className="carousel-underlay" />
                      <div className="carouselImageButton">
                        <IconButton
                          iconStyle={styles.largeIcon}
                          onTouchTap={() => {
                              this._handlePlay(video.id);
                          }}
                        >
                          <PlayCircleFilled color="white" />
                        </IconButton>
                      </div>
                      <div className="carouselImageTitleAndDescription">
                        <h4 className="carouselImageTitle">
                          {video.title}
                        </h4>
                        <p className="imageDescription">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    <div className="heroCarouselVideo">
                      <Video
                        autoPlay
                        playsInline
                        muted
                        controls={[]}
                        poster={video.thumbnail}
                      >
                        <source src={videoUrl} />
                      </Video>
                    </div>
                  </div>
                );
            });

            const infoTiles = videoKeys.map((videoKey) => {
                const video = this.props.videos.items[videoKey];
                return (
                  <div key={video.id} className="infoTile">
                    <h4 className="infoTileCTA">Watch now</h4>
                    <IconButton
                      iconStyle={styles.largeIcon}
                      style={styles.large}
                      onTouchTap={() => {
                          this._handlePlay(video.id);
                      }}
                    >
                      <PlayCircleFilled color="white" />
                    </IconButton>
                    <div className="carouselTitleAndDescription">
                      <h4 className="carouselTitle">
                        {video.title}
                      </h4>
                      <p className="description">
                He says hes found the main computer to power the tractor beam
                thats holding the ship here. Hell try to make the precise
                location appear on the monitor.
              </p>
                    </div>
                  </div>
                );
            });
            return (
              <div className="heroCarousel">
                <div className="carouselLeft">
                  <Slider
                    ref="leftSlider"
                    className="carouselLeftSlider"
                    {...settingsLeft}
                  >
                    {imageList}
                  </Slider>
                </div>
                <div className="carouselRight">
                  <Slider
                    ref="rightSlider"
                    className="carouselRightSlider"
                    {...settingsRight}
                  >
                    {infoTiles}
                  </Slider>
                </div>
              </div>
            );
        }
        return <div />;
    }
}

HeroCarousel.propTypes = {
    videos: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    // selected: PropTypes.bool,
    tags: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos,
    selected: state.playback.isSelected,
    tags: state.tags,
});
export default connect(mapStateToProps)(HeroCarousel);
