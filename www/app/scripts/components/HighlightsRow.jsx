import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import HighlightItem from './HighlightItem';

class HighlightsRow extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
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

        let videos = {};

        videos = this.props.highlights.map(highlight =>
      (<div key={`highlight-thumb-${highlight.timestamp}`}>
        <HighlightItem
          video={this.props.videoUrl}
          timestamp={highlight.timestamp}
          description={highlight.description}
          thumbnail={highlight.thumbnail}
          title={highlight.title}
        />
      </div>),
    );

        console.log(videos);

        return (
          <div className="highlightsSlider slider">
            <div className="rowHeader">
              <h3 className="rowTitle">Highlights</h3>
            </div>
            <div className="slider">
              <Slider ref={c => (this.slider = c)} {...settings}>
                {videos}
              </Slider>
            </div>
          </div>
        );
    }
}

HighlightsRow.propTypes = {
    highlights: PropTypes.array,
    videoUrl: PropTypes.string,
};

export default HighlightsRow;
