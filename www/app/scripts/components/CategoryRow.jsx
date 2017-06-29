import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { grey800 } from 'material-ui/styles/colors';

import CategoryItem from '../components/CategoryItem';
import ProductCard from '../containers/homepage/CardContainer';

class CategoryRow extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
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
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const videoCard =
      this.props.videoCard.isVisible &&
      this.props.videoCard.category === this.props.tag.id
        ? (<div>
          <ProductCard />
        </div>)
        : undefined;
        let videos = '';

        const handleClick = (video) => {
            this.props.handleVideoInfo(video);

            if (this.props.videoCard.category !== this.props.tag.id) {
                this.props.handleCardCategory(this.props.tag.id);
            }
            this.props.showVideoCard();
        };

        if (this.props.tag) {
            videos = this.props.videos.filter((video) => {
                for (let i = 0; i < video.tags.length; i += 1) {
                    if (video.tags[i].id === this.props.tag.id) {
                        return video.tags[i].id;
                    }
                    return false;
                }
                return false;
            });

            videos = videos.map(video =>
        (<div key={`category-item-${video.title}`}>
          <CategoryItem video={video} handleClick={() => handleClick(video)} />
        </div>),
      );
        }

        if (videos.length > 0) {
            return (
              <div className="slider">
                <div className="rowHeader">
                  <h3 className="rowTitle">
                    {this.props.tag.name}
                  </h3>

                  <Link to={`/Category/${this.props.tag.id}`}>
                    <IconButton onTouchTap={this.next}>
                      <FontIcon className="material-icons" color={grey800}>
                  arrow_forward
                </FontIcon>
                    </IconButton>
                  </Link>

                  <div className="sliderButtons">
                    <IconButton onTouchTap={this.previous}>
                      <FontIcon className="material-icons" color={grey800}>
                  arrow_back
                </FontIcon>
                    </IconButton>
                    <IconButton onTouchTap={this.next}>
                      <FontIcon className="material-icons" color={grey800}>
                  arrow_forward
                </FontIcon>
                    </IconButton>
                  </div>
                </div>
                <div className="slider">
                  <Slider ref={c => (this.slider = c)} {...settings}>
                    {videos}
                  </Slider>
                </div>
                {videoCard}
              </div>
            );
        }
        return false;
    }
}

CategoryRow.propTypes = {
    tag: PropTypes.object.isRequired,
    videos: PropTypes.array.isRequired,
    handleCardCategory: PropTypes.func.isRequired,
    handleVideoInfo: PropTypes.func.isRequired,
    showVideoCard: PropTypes.func.isRequired,
    videoCard: PropTypes.object.isRequired,
};

export default CategoryRow;
