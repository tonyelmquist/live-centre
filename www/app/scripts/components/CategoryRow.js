import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Link} from 'react-router-dom';

import Item from '../components/Item';
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {grey800} from 'material-ui/styles/colors';
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
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const videoCard = (this.props.videoCard.isVisible && this.props.videoCard.category === this.props.category) ?
            <div>
                <ProductCard />
            </div> : undefined;
        let videos = '';

        const _handleClick = (video) => {
            const url = `https://www.mediabank.me/download/manifest.php?assetid=${video.assetid}`;
            this.props.handleCardUrl(url);
            if (this.props.videoCard.category !== this.props.category) {
                this.props.handleCardCategory(this.props.category);
            };
            this.props.showVideoCard();
        };

        if (this.props.category) {
            videos = this.props.videos;
            videos = videos.map((video, index) => {
                return (
                    <div key={video.assetid} >
                        <Item video={video}
                            handleClick={()=>_handleClick(video)}
                        />
                    </div>
                );
            });
        }

        return (
            <div className='slider'>
                <div className='rowHeader'>
                    <h3 className='rowTitle'>

                                {this.props.category}

                    </h3>
                    <Link to={`/Category/${this.props.category}`}>
                        <IconButton onTouchTap={this.next}>
                            <FontIcon className="material-icons" color={grey800}>arrow_forward</FontIcon>
                        </IconButton>
                    </Link>
                    <div className='sliderButtons'>
                        <IconButton onTouchTap={this.previous}>
                            <FontIcon className="material-icons" color={grey800}>arrow_back</FontIcon>
                        </IconButton>
                        <IconButton onTouchTap={this.next}>
                            <FontIcon className="material-icons" color={grey800}>arrow_forward</FontIcon>
                        </IconButton>
                    </div>
                </div>
                <div className="slider">
                    <Slider ref={(c) => this.slider = c} {...settings}>
                        {videos}
                    </Slider>
                </div>
                {videoCard}
            </div>
        );
    }
}

CategoryRow.propTypes = {
    videos: PropTypes.array,
    category: PropTypes.string,
    handleCardCategory: PropTypes.func.isRequired,
    showVideoCard: PropTypes.func.isRequired,
    videoCard: PropTypes.object,
};

export default CategoryRow;
