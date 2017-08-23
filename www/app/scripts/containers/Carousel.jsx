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
import { videoSelected } from '../actions/videoPlayer';
import { openOverlayX, maximizeOverlayX } from '../actions/overlayX';
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

    constructor(props) {
        super(props);
        this.state = {
            autoPlay: true,
            renderVideo: false,
        };
    }

    // After the component have rendered for the first time, add the autoplay tag.
    // This will prevent react router transition from waiting.
    componentDidMount() {
        this.setVideoState();
    }
    // shouldComponentUpdate(nextProps){
    //     // if(nextProps.transitionStarting && this.carouselVideo){
    //     //     //this.carouselVideo.videoEl.pause();
    //     //     this.setState({ renderVideo: false });
    //     // }
    //     return true
    // }

    componentDidUpdate(){
        console.log(this.props.transitionStarting);
        if(this.props.transitionStarting && this.carouselVideo){
            //this.carouselVideo.videoEl.pause();
            this.setState({ renderVideo: false });
        }
    }

    setVideoState = () => {
        setTimeout(() => console.log('Wait until we start playing video.'), 1500);
        setTimeout(() => this.setState({ renderVideo: true }), 1500);
    }

    _handlePlay = (video) => {
        this.props.dispatch(openOverlayX());
        this.props.dispatch(maximizeOverlayX());
        this.props.dispatch(videoSelected(video));
    };

    syncLeft(currentSlide) {
        this.refs.leftSlider.slickGoTo(currentSlide);
    }

    syncRight(currentSlide) {
        this.refs.rightSlider.slickGoTo(currentSlide);
    }

    getDescriptionSnippet(string, maxCharacters) {
        const array = string.split(' ');
        let count = 0;

        let finalCount = 0;

        for (let i = 0; i < array.length; i++) {
            count += array[i].length;
            if (count + i > maxCharacters) {
                finalCount = count + i;
                break;
            }
        }
        
        if (finalCount === string.length) {
            return string;
        }
        return `${string.substr(0, finalCount)}...`;
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
        if (this.props.tags.items['Promotional Videos'] && this.props.videos.videosFetched > 0) {
            const videoKeys = this.props.tags.items['Promotional Videos'].videos;

            const imageList = videoKeys.map((videoKey) => {
                const video = this.props.videos.items[videoKey];
                const videoUrl = video.videoUrl;
                return (
                  <div key={`carousel-${videoKey}`} style={styles.carousel}>
                    <div className="heroCarouselImage" key={videoKey}>
                        <div className="carousel-underlay" />
                      <div className="carouselImageTitleAndDescription">
                        <h3
                        className="carouselImageTitle"
                        onTouchTap={() => {
                            this._handlePlay(video);
                        }}
                        >
                          {video.title}
                        </h3>
                        <p
                        className="imageDescription"
                            onTouchTap={() => {
                                this._handlePlay(video);
                            }}
                        >
                          {this.getDescriptionSnippet(video.description, 100)}
                        </p>
                      </div>
                    </div>
                    <div className="heroCarouselVideo">
                        {this.state.renderVideo ?
                    <Video
                        autoPlay={this.state.autoPlay}
                        playsInline
                        muted
                        controls={[]}
                        poster={video.thumbnail}
                        loop
                        ref={ref => (this.carouselVideo = ref)}
                    >
                       <source src={videoUrl} />
                      </Video> : <img src={video.thumbnail} /> }

                    </div>
                  </div>
                );
            });

            const infoTiles = videoKeys.map((videoKey) => {
                const video = this.props.videos.items[videoKey];
                return (
                  <div key={video.id} className="infoTile">
                    <h4
                    className="infoTileCTA"
                    onTouchTap={() => {
                        this._handlePlay(video);
                    }}
                    >Watch now</h4>
                    <div className="carouselTitleAndDescription">
                      <h4
                      className="carouselTitle"
                      onTouchTap={() => {
                          this._handlePlay(video);
                      }}
                      >
                        {video.title}
                      </h4>
                      <p className="description">
                        {video.description}
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
