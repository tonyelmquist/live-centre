import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import CategoryItem from '../components/CategoryItem';
import ProductCard from '../containers/homepage/CardContainer';

class CategoryRow extends Component {

    constructor(props) {
        super(props);
        this.next = this
            .next
            .bind(this);
        this.previous = this
            .previous
            .bind(this);
    }
    next() {
        this
            .slider
            .slickNext();
    }
    previous() {
        this
            .slider
            .slickPrev();
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    },
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    },
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const videoCard = (this.props.videoCard.isVisible && this.props.videoCard.category === this.props.tag.key) ?
          (<ProductCard />) : undefined;

        let videos = '';

        const handleClick = (video) => {
            this.props.handleVideoInfo(video);

            if (this.props.videoCard.category !== this.props.tag.key) {
                this.props.handleCardCategory(this.props.tag.key);
            }
            this.props.onTileClick(video);
        };

        if (this.props.tag && this.props.videos) {
            videos = this.props.videos.map(video => (<div key={`category-item-${video.id}`}>
              <CategoryItem
                video={video}
                handleClick={() => handleClick(video)}
              />
            </div>));
        }

        return (
          <div className="slider">
            <div className="rowHeader">
              <Link className="rowTitle" to={`/Category/${this.props.tag.key}`}>
                {this.props.tag.name}
              </Link>

              {/*<Link to={`/Category/${this.props.tag.key}`}>*/}
                {/*<IconButton onTouchTap={this.next}>
                  <FontIcon className="material-icons" color={grey800}>arrow_forward</FontIcon>
                </IconButton>*/}
              {/*</Link>*/}

              {/* <div className="sliderButtons">
                <IconButton onTouchTap={this.previous}>
                  <FontIcon className="material-icons" color={grey800}>arrow_back</FontIcon>
                </IconButton>
                <IconButton onTouchTap={this.next}>
                  <FontIcon className="material-icons" color={grey800}>arrow_forward</FontIcon>
                </IconButton>
              </div>*/}
            </div>

            <div className="slider">
              <Slider ref={c => this.slider = c} {...settings}>
                {videos}
              </Slider>
            </div>
            {videoCard}
          </div>
        );
    }
}

CategoryRow.propTypes = {
    tag: PropTypes.objectOf(PropTypes.any).isRequired,
    videos: PropTypes.arrayOf(PropTypes.any).isRequired,
    handleCardCategory: PropTypes.func.isRequired,
    handleVideoInfo: PropTypes.func.isRequired,
    onTileClick: PropTypes.func.isRequired,
    videoCard: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CategoryRow;
