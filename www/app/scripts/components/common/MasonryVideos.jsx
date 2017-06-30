import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

/*
    This component takes in an array of videos and returns a div with tiles, 
    they will float and align properly even with different heights. 
    If it recieves a filter as prop it will filter the array based on the tiles. 

    Uses masonry tiles from https://masonry.desandro.com 
    react version: https://github.com/eiriklv/react-masonry-component#basic-usage
*/

class MasonryVideos extends Component {
    render() {
        const masonryOptions = {
            itemSelector: '.tile',
            percentPosition: true,
            columnWidth: '.tile',
        };

        return (
          <Masonry // More options; https://github.com/eiriklv/react-masonry-component#basic-usage
            className={'masonry_tiles'}
            options={masonryOptions}
          >
            { this.props.children }

          </Masonry>
        );
    }
}

MasonryVideos.propTypes = {

};

MasonryVideos.defaultProps = {
    filter: [],
    handlefilter: false,
};

export default MasonryVideos;
