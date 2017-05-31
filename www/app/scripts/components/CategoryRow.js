import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {grey800} from 'material-ui/styles/colors';
import ProductCard from './homepage/ProductCard';

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
                <ProductCard
                    active={this.props.videoCard.index}
                    changeTab={this.props.handleCardIndex}
                    closeCard={this.props.hideVideoCard}
                />
            </div> : undefined;
        let videos = '';

        const _handleClick = () => {
            if (this.props.videoCard.category !== this.props.category) {
                this.props.handleCardCategory(this.props.category);
            };
            this.props.showVideoCard();
        };

        if (this.props.category) {
            videos = this.props.videos;
            videos = videos.map((video, i) => {
                return (
                    <div>
                        <Item key={i} video={video}
                            handleClick={()=>_handleClick()}

                        />
                    </div>
                );
            });
        }

        return (
            <div className='slider'>
                <div className='rowHeader'>
                    <h3 className='rowTitle'>{this.props.category}</h3>
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
    handleCardIndex: PropTypes.func.isRequired,
    handleCardCategory: PropTypes.func.isRequired,
    showVideoCard: PropTypes.func.isRequired,
    hideVideoCard: PropTypes.func.isRequired

};

export default CategoryRow;
