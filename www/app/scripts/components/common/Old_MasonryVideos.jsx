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
    renderTiles = () => {
        const tiles = [];
        const videos = this.props.videos.items;

        for (const key in videos) {
            if (!this.props.filter > 0 || this.props.handlefilter(this.props.filter, videos[key])) {
                const video = videos[key];
                tiles.push(
                  <div className="tile" key={`masonry-videos-${video.id}`}>
                    <div className="masonry_tile_inner">
                      <img src={video.thumbnail} alt={`${video.title}-videoTile`} />
                      <div className="tile-data">
                        <h4>{video.title}</h4>
                        <p className="metadata"> {video.description},</p>
                      </div>
                    </div>
                  </div>);
            }
        }
        return tiles;
    }

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
            { this.props.videos.videosFetched > 1 ? this.renderTiles() : (<div />) }

          </Masonry>
        );
    }
}

MasonryVideos.propTypes = {
    videos: PropTypes.object.isRequired,
    filter: PropTypes.array,
    handlefilter: PropTypes.func,
};

MasonryVideos.defaultProps = {
    filter: [],
    handlefilter: false,
};

export default MasonryVideos;
