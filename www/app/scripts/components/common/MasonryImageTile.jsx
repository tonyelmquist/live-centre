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


class MasonryImageTile extends Component {

    renderTiles = () => {
        const tiles = [];
        const items = this.props.items;

        for (const key in items) {
            if (!this.props.filter || this.props.handlefilter(this.props.filter, items[key])) {
                const item = items[key];
                tiles.push(
                  <div className="tile" key={`masonry-image-${item.id}`}>
                    <div className="masonry_tile_inner" >
                      <img
                        className="thumbnail"
                        onTouchTap={() => { () => this.props.handleTileClick(item.id); }}
                        src={item.thumbnail}
                        alt={`${item.title}-videoTile`}
                      />
                      <img
                        className="logo"
                        src={item.logo}
                      />
                    </div>
                  </div>
                  );
            }
        }
        return tiles;
    }

    render() {
        return (
          <div>
            { this.props.items ? this.renderTiles() : (<div />) }
          </div>
        );
    }
}

MasonryImageTile.propTypes = {
    items: PropTypes.array.isRequired,
    filter: PropTypes.array,
    handleTileClick: PropTypes.func,
    handlefilter: PropTypes.func,
};

MasonryImageTile.defaultProps = {
    filter: null,
    handleTileClick: null,
};

export default MasonryImageTile;
