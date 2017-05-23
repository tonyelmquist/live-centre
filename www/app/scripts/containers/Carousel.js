import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Carousel} from 'react-responsive-carousel';

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
    mask: {
        width: '33%',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
        backgroundColor: 'black'
    }
};

// TODO Create video detail "chip" that displays on carousel item being selected

class HeroCarousel extends Component {

    createCarouselList = () => {

        let carouselList = this
            .props
            .videos
            .map((video, i) => {
                if (i < 5) {
                    return (
                        <div style={styles.carousel} key={i}>
                            <img src={video.thumbnail}/>
                            <p className="legend" style={styles.legend}>{video.title}</p>
                        </div>
                    );
                }
            });
        carouselList = carouselList.filter((e) => {
            return e;
        });
        return carouselList;
    };

    render() {
      return (
            <div style={styles.carouselContainer}>
                <div>
                    <Carousel
                        axis="horizontal"
                        showThumbs={false}
                        showArrows={true}
                        emulateTouch
                        onChange={this.handleChangeEvent}>
                        {this.createCarouselList()}
                    </Carousel>
                    <div style={styles.mask}></div>
                </div>

            </div>
        );
    }
}

HeroCarousel.propTypes = {
    videos: PropTypes.array
};

const mapStateToProps = (state) => {
    return {videos: state.videos.items};
};

export default connect(mapStateToProps)(HeroCarousel);