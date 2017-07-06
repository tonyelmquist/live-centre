import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import { imagePrefix } from '../../constants/mediaPrefix';

/*
    This component takes in an array of videos and returns a div with tiles,
    they will float and align properly even with different heights.
    If it recieves a filter as prop it will filter the array based on the tiles.

    Uses masonry tiles from https://masonry.desandro.com
    react version: https://github.com/eiriklv/react-masonry-component#basic-usage
*/
class MasonryTiles extends Component {

    static compare(videoStringParam, filterArray) {
        const videoString = videoStringParam.toLowerCase();
        for (let i = 0; i < filterArray.length; i++) {
            const filterString = filterArray[i].toLowerCase();
            // compare.
            if (videoString.includes(filterString) && filterString.length > 0) {
                // console.log("Filter/search:",filterString, "==", videoString);
                return 1;
            }
        }
        return 0;
    }
    // Looks at ALL metadata in video
    // Compare to all strings in filter array.
    // Only problem is some items, eg. tags are saved in array
//     static matchWithFilters(filterArray, video, filterByKey) {
//         let contains = false;
// //        console.log("Filterarray",filterArray);
//         if (filterByKey) {
//             contains = MasonryTiles.compare(filterByKey.toLowerCase(), filterArray);
//         } else {
//             for (const key in video) {
//                 if (typeof video[key] === 'string') {
//                     const videoString = video[key].toLowerCase();
//                     contains = MasonryTiles.compare(videoString, filterArray);
//                     if (contains) {
//                         // console.log("search found video:",video);
//                         break;
//                     }
//                 }
//             }
//         }
//         return contains;
//     }

    // Checks tags, description and title
    static videoFilter(filterArray, video) {
        let containsFilter = 0;

        containsFilter += MasonryTiles.compare(video.description, filterArray);
        if (containsFilter > 0) { return true; }

        containsFilter += MasonryTiles.compare(video.title, filterArray);
        if (containsFilter > 0) { return true; }

        // Compare with tag name and tag genre.
        for (let i = 0; i < video.tags.length; i++) {
            containsFilter += MasonryTiles.compare(video.tags[i].name, filterArray);
            containsFilter += MasonryTiles.compare(video.tags[i].type, filterArray);
            if (containsFilter > 0) {
                return true;
            }
        }
        return false;
    }

    renderTiles = () =>
        this.props.videos.map((video) => {
            // If a filter string is not present show the tile, if not, try to match the filter
            if (!this.props.filter > 0 || MasonryTiles.videoFilter(this.props.filter, video, this.props.filterByKey)) {
                return (
                  <div className="tile" key={`masonry-videos-${video.id}`}>
                    <div className="masonry_tile_inner">
                      <img src={imagePrefix + video.thumbnail} alt={video.description} />
                      <div className="tile-data">
                        <h4>{video.title}</h4>
                        <p className="metadata"> {video.description},</p>
                      </div>
                    </div>
                  </div>
                );
            }
            return false;
        });
    render() {
        const masonryOptions = {
            itemSelector: '.tile',
            percentPosition: true,
            columnWidth: '.tile',
        };

        // console.log(this.props.videos);
        return (
          <Masonry
            className={'masonry_tiles'}
            options={masonryOptions}
          >
            { this.props.videos
                      ? this.renderTiles()
                      : (<div />) }

          </Masonry>
        );
    }
}

MasonryTiles.defaultProps = {
    filter: '',
    filterByKey: '',
};

MasonryTiles.propTypes = {
    videos: PropTypes.objectOf(PropTypes.any).isRequired,
    filter: PropTypes.arrayOf(PropTypes.any),
    filterByKey: PropTypes.string,
};

export default MasonryTiles;
