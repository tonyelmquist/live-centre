import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../../components/HorizontalScroll/CircleRowItem';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';

// Dummy filters and channels
const filters = [
  { key: 'Children', avatarStyle: {backgroundColor: '#E91E63'} },
  { key: 'Drama', avatarStyle: {backgroundColor: '#FFC107'}},
  { key: 'Pets', avatarStyle: {backgroundColor: '#00BCD4'}},
  { key: 'Humor', avatarStyle: {backgroundColor: '#673AB7'}},
  { key: 'Fantasy', avatarStyle: {backgroundColor: '#FF9800'}},
  { key: 'Documentaries', avatarStyle: {backgroundColor: '#8BC34A'}},
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
        console.log("Change route");
        this.changeRoute(`/Channel/${item.title}`);
    }

    getTiles = () => {
        const tiles = [];
        
        for (const key in channels) {
          tiles.push(
        <MasonryImageTile
          key={`channel-tile-${key}`}
          poster={channels[key].thumbnail}
          handleClick={() => this.handleOnClick(channels[key])}
          overlay={
              <img onTouchTap={() => this.handleOnClick(channels[key])} className="logo" src={channels[key].logo} />
            }
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
        style={filter.avatarStyle}
      />
    ))

    render() {
        return (
        <div className="channel-page">
        <div className="container-fluid">
          <h4>{i18next.t('filter')}</h4>
        </div>

        <div className="inline-circle-label">
          <HorizontalScrollContainer>
            {this.getCircleFilters(filters)}
          </HorizontalScrollContainer>
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
