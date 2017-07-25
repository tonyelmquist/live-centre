import React from 'react';
import i18next from 'i18next';
import CirclesRow from '../../components/horizontal-scroll/CirclesRow';
import CircleRowItem from '../../components/horizontal-scroll/CircleRowItem';
import MasonryContainer from '../../components/masonry/MasonryContainer';
import MasonryImageTile from '../../components/masonry/MasonryImageTile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Dummy filters and channels
const filters = [
  { key: 'barn', avatarStyle: 'background-color: red' },
  { key: 'drama' },
  { key: 'pets' },
  { key: 'humor' },
  { key: 'fantasy' },
  { key: 'documentaries' },
];

const channels = {
    1: {
        id: 1,
        title: 'The Future Group',
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

class ChannelsPage extends React.Component {

    changeRoute = path => this.props.history.push(path);

    filterTile = () => {
        console.log('filter');
    }

    handleOnClick = (item) => {
        //console.log('Channel:', item);
        this.changeRoute(`/Channel/${item.title}`);
    }

    getTiles = () => {
        const tiles = [];
        
        for (const key in channels) {
          tiles.push(
        <MasonryImageTile
          key={`channel-tile-${key}`}
          poster={channels[key].thumbnail}
          overlay={
              <img className="logo" src={channels[key].logo} />
            }
          handleClick={() => this.handleOnClick(channels[key])}
        />,
      );
      }
    
        return tiles;
    }

    filterOverlay = filter => (
      <div className="circleFilterOverlay">
        {filter.key}
      </div>
    )

    getCircleFilters = filters => filters.map(filter => (
      <CircleRowItem
        item={filter}
        overlay={(this.filterOverlay(filter))}
        key={filter.key}
      />
    ))

    render() {
        return (
        <div className="channel-page">
        <div className="container-fluid">
          <h4>{i18next.t('filter')}</h4>
        </div>

        <div className="inline-circle-label">
          <CirclesRow>
            {this.getCircleFilters(filters)}
          </CirclesRow>
        </div>
        <div className="container-fluid">

          <MasonryContainer>
            {this.getTiles()}
          </MasonryContainer>
          </div>
      </div>

      );
    }
}

ChannelsPage.propTypes = {
    videos: PropTypes.any.isRequired,
    tags: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    videos: state.videos.items,
    tags: state.tags.items,
});

export default connect(mapStateToProps)(ChannelsPage);
