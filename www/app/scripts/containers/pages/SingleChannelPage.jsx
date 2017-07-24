import React, { component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import MasonryTextOverlay from '../../components/masonry/MasonryTextOverlay';
import CirclesRow from '../../components/horizontal-scroll/CirclesRow';
import CircleRowItem from '../../components/horizontal-scroll/CircleRowItem';

// Dummy channels:
const channels = {
    1: {
      id: 1,
      title: 'Lost in Time',
      logo: '/img/demoChannels/lost-in-time-logo.png',
      thumbnail: '/img/demoChannels/lost-in-time.jpg',
  },
    2: {
      id: 2,
      title: 'Street Fighter',
      logo: '/img/demoChannels/street-fighter-logo.png',
      thumbnail: '/img/demoChannels/street-fighter.jpg',
  },
};

// Dummy filters
const filters = [
  { key: 'barn' },
  { key: 'drama' },
  { key: 'pets' },
  { key: 'humor' },
  { key: 'fantasy' },
  { key: 'documentaries' },
];


class SingleChannelPage extends React.Component {
    //! ! Uses tags as channels since we have no channels per now.
    getTiles = () => {
        const channelKey = this.props.match.params.channelKey;
        const tiles = [];
        const channelVideos = this.props.tags[channelKey].videos;
        const videos = this.props.videos.items;
        console.log('ALL VIDEOS', videos);

        console.log(channelVideos);

        for (const key in channelVideos) {
            const videoKey = channelVideos[key];
            const video = videos[videoKey];

            tiles.push(
              <MasonryImageTile
                key={`single-channel-video-${videoKey}`}
                poster={video.thumbnail}
                overlay={<MasonryTextOverlay video={video} handleTilePlay={this.handleTilePlay} title={video.title} />}
              />,
            );
        }

        return tiles;
    }

    getFilters = () => {
        const rowItems = [];
        console.log('filters', filters);
        for (const key in filters) {
            rowItems.push(
          <CircleRowItem
              key={key}
              handleClick={() => this.handleFilter(key)}
              overlay={(this.filterOverlay(filters[key]))}
          />,
        );
        }
        return rowItems;
    }

    handleTilePlay = () => {
        console.log('PLAY VIDEO');
    }

    handleTileOpen = () => {
        console.log('tile open');
    }

    handleFilter = () => {
        console.log('handle filter of channels');
    }

    filterOverlay = filter => (
      <div className="circleFilterOverlay">
        {filter.key}
      </div>
    )

    render() {
        console.log(this.props.match.params);
        const channelKey = this.props.match.params.channelKey;

        return (
          <div>
            <div className="container-fluid">
              <h4>{i18next.t('filter')}</h4>
            </div>
            <CirclesRow>
              {this.getFilters()}
            </CirclesRow>
            <div className="container-fluid">
              <h4> LIVE Now </h4>
            <MasonryContainer>
                {this.props.videos.videosFetched > 0
                  ? this.getTiles()
                  : <div />
                }
            </MasonryContainer>
            </div>
          </div>
        );
    }

}

SingleChannelPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(SingleChannelPage);
