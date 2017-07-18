import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import { amber300, fullWhite } from 'material-ui/styles/colors';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36,
    },
    medium: {
        width: 64,
        height: 64,
        padding: 8,
    },
};


class MasonryVideoTile extends Component {

    renderTiles = () => {
        const tiles = [];
        const videos = this.props.videos;

        for (const key in videos) {
            if (!this.props.filter || this.props.handlefilter(this.props.filter, videos[key])) {
                const video = videos[key];
                tiles.push(
                  <div className="tile" key={`masonry-videos-${video.id}`}>
                    <div className="masonry_tile_inner" >
                      <img
                        onTouchTap={() => { this.props.handleTileOpen(video); }}
                        src={video.thumbnail}
                        alt={`${video.title}-videoTile`}
                      />
                      <div className="tile-overlay">
                        <div className="tile-text">
                          <h4>{video.title}</h4>
                        </div>
                        <IconButton
                          className="masonryPlayButton"
                          iconStyle={styles.mediumIcon}
                            // style={styles.medium}
                          onTouchTap={() => { this.props.handleTilePlay(video.id); }}
                        >
                          <PlayCircleOutline hoverColor={amber300} color={fullWhite} />
                        </IconButton>
                      </div>
                    </div>
                  </div>);
            }
        }
        return tiles;
    }

    render() {
        return (
          <div>
            { this.props.videos ? this.renderTiles() : (<div />) }
          </div>
        );
    }
}

MasonryVideoTile.propTypes = {
    videos: PropTypes.any.isRequired,
    filter: PropTypes.array,
    handlefilter: PropTypes.func,
    handleTileOpen: PropTypes.func,
    handleTilePlay: PropTypes.func,
    dispatch: PropTypes.func,
};

MasonryVideoTile.defaultProps = {
    filter: null,
    handlefilter: true,
    handleTilePlay: null,
    handleTileOpen: null,

};

export default MasonryVideoTile;
