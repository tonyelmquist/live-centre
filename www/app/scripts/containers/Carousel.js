import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import FontIcon from 'material-ui/FontIcon';
import {grey800} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import {videoSelected, invalidateSelected} from '../actions/video';

const FEATURED_CATEGORY = "Uncategorized";

const styles = {
    carouselContainer: {
        marginTop: 0,
        backgroundColor: 'black',
        marginBottom: 7,
        position: 'relative'
    },
    carousel: {
        width: '67%'
    },
    rightButton: {},
    legend: {
        width: '23%',
        right: '5%',
        top: '20%',
        left: 'inherit',
        marginLeft: 0,
        zIndex: 3
    },

    largeIcon: {
        width: 60,
        height: 60
    },

    large: {
        width: 120,
        height: 120,
        padding: 30,
        float: 'left'
    }
};

class HeroCarousel extends Component {
    static defaultProps = {
        videos: {}
    };

    constructor(props, defaultProps) {
        super(props, defaultProps);
    }

    handlePlay(assetid) {
        /*        this
            .props
            .dispatch(videoSelected(`https://www.mediabank.me/download/manifest.php?assetid=${assetid}`));*/
    }

    syncLeft(currentSlide) {
        this
            .refs
            .leftSlider
            .slickGoTo(currentSlide);
    }

    syncRight(currentSlide) {
        this
            .refs
            .rightSlider
            .slickGoTo(currentSlide);
    }

    render() {

        const _this = this;

        const settingsLeft = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            lazyLoad: true,
            beforeChange: function (currentSlide, nextSlide) {
                //   _this.syncLeft(nextSlide);
            },
            afterChange: function (currentSlide, nextSlide) {
                //    _this.syncLeft(nextSlide);
            },
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
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
                        slidesToScroll: 1
                    }
                }
            ],
            beforeChange: function (currentSlide, nextSlide) {
                _this.syncLeft(nextSlide);
            }
        };

        if (this.props.videos[FEATURED_CATEGORY]) {
            const carouselList = this.props.videos[FEATURED_CATEGORY];
            // .get(FEATURED_CATEGORY);

            const imageList = carouselList.map((video, i) => {
                return (
                    <div style={styles.carousel}>
                        <div className='heroCarouselImage' key={i}>
                            <img src={video.thumbnail}/> {/*<p className="legend" style={styles.legend}>{video.title}</p>*/}
                        </div>
                        <div className='heroCarouselVideo'>
                            <ReactPlayer
                                playing={true}
                                controls={false}
                                volume={0}
                                width='100%'
                                height='100%'
                                url={`https://www.mediabank.me/download/manifest.php?assetid=${video.assetid}`}/>
                        </div>
                    </div>
                );
            });

            const infoTiles = carouselList.map((video, i) => {
                return (
                    <div key={i} className='infoTile'>
                        <h4 className='infoTileCTA'>Watch now</h4>
                        <IconButton
                            iconStyle={styles.largeIcon}
                            style={styles.large}
                            onTouchTap={this.handlePlay(video.assetid)}><PlayCircleOutline color="white"/></IconButton>
                        <div className='carouselTitleAndDescription'>
                            <h4 className='carouselTitle'>{video.title}</h4>
                            <p className='description'>He says he's found the main computer to power the
                                tractor beam that's holding the ship here. He'll try to make the precise
                                location appear on the monitor. The tractor beam is coupled to the main reactor
                                in seven locations.</p>
                        </div>
                    </div>
                );

            });

            return (
                <div className='heroCarousel'>
                    <div className="carouselLeft">
                        <Slider ref='leftSlider' className="carouselLeftSlider" {...settingsLeft}>
                            {imageList}
                        </Slider>
                    </div>
                    <div className="carouselRight">
                        <Slider ref='rightSlider' className="carouselRightSlider" {...settingsRight}>
                            {infoTiles}
                        </Slider>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }

    }
}

HeroCarousel.propTypes = {
    videos: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {videos: state.videos.items};
};

export default connect(mapStateToProps)(HeroCarousel);
