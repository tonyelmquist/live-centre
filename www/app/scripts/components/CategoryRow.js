import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';
import {Row} from 'react-flexbox-grid';
import Slider from 'react-slick';

class CategoryRow extends Component {
    render() {
            var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
      }]
    };

        if (this.props.category) {
            var videos = this
                .props
                .videos
                .map(function (video, i) {
                    return (<div><Item key={i} video={video}/></div>);
                });

        } else {
            var videos = '';
        }

        return (<div>
                <h1 className='rowTitle'>{this.props.category}</h1>
                <Slider {...settings}>
                    {videos}
                </Slider>
            </div>);
    }
}

export default CategoryRow;