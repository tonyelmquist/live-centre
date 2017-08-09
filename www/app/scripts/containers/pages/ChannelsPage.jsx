import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../../components/HorizontalScroll/CircleRowItem';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';

import max from '../../../img/mockup/channels/max.png';
import maxLOGO from '../../../img/mockup/channels/logo_max.png';
import fem from '../../../img/mockup/channels/fem.png';
import femLOGO from '../../../img/mockup/channels/logo_fem.png';

import tlc from '../../../img/mockup/channels/tlc.png';
// import tlcLOGO from '../../../img/mockup/channels/tlc.png';
import tvNorge from '../../../img/mockup/channels/tvNorge.png';
import tvNorgeLOGO from '../../../img/mockup/channels/logo_tvNorge.png';
import vox from '../../../img/mockup/channels/vox.png';
import animal from '../../../img/mockup/channels/animal.png';

// // Dummy filters and channels
// const filters = [
//   { key: 'Children', avatarStyle: { backgroundColor: '#E91E63' } },
//   { key: 'Drama', avatarStyle: { backgroundColor: '#FFC107' } },
//   { key: 'Pets', avatarStyle: { backgroundColor: '#00BCD4' } },
//   { key: 'Humor', avatarStyle: { backgroundColor: '#673AB7' } },
//   { key: 'Fantasy', avatarStyle: { backgroundColor: '#FF9800' } },
//   { key: 'Documentaries', avatarStyle: { backgroundColor: '#8BC34A' } },
// ];

// Keep for later if we want future group channel
// const channels = {
//     1: {
//         id: 1,
//         title: 'The Future Group',
//         logo: '/img/demoChannels/lost-in-time-logo.png',
//         thumbnail: '/img/demoChannels/lost-in-time.jpg',
//     },
//     2: {
//         id: 2,
//         title: 'Street Fighter',
//         logo: '/img/demoChannels/street-fighter-logo.png',
//         thumbnail: '/img/demoChannels/street-fighter.jpg',
//     },
// };

const channels = {
    1: {
        id: 1,
        title: 'MAX',
        logo: require('../../../img/mockup/channels/logo_max.png'),
        thumbnail: require('../../../img/mockup/channels/max.png'),
        tags: ['drama', 'humor', 'documentaries'],
    },
    2: {
        id: 2,
        title: 'Fem',
        logo: femLOGO,
        thumbnail: fem,
        tags: ['drama', 'humor'],
    },
    3: {
        id: 3,
        title: 'TLC',
        // logo: tlcLOGO,
        thumbnail: tlc,
        tags: ['drama', 'humor'],
    },
    4: {
        id: 4,
        title: 'VOX',
        // logo: vox,
        thumbnail: vox,
        tags: ['drama', 'humor'],
    },
    5: {
        id: 5,
        title: 'TV Norge',
        logo: tvNorgeLOGO,
        thumbnail: tvNorge,
        tags: ['drama', 'humor', 'children', 'documentaries'],
    },
    6: {
        id: 6,
        title: 'Animal Planet',
        thumbnail: animal,
        tags: ['pets', 'animals', 'documentaries'],
    },
};

class ChannelsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilter: -1,
            filters: [
              { key: 'children', avatarStyle: { backgroundColor: '#E91E63' } },
              { key: 'drama', avatarStyle: { backgroundColor: '#FFC107' } },
              { key: 'pets', avatarStyle: { backgroundColor: '#00BCD4' } },
              { key: 'humor', avatarStyle: { backgroundColor: '#673AB7' } },
              { key: 'fantasy', avatarStyle: { backgroundColor: '#FF9800' } },
              { key: 'documentaries', avatarStyle: { backgroundColor: '#8BC34A' } },
            ],
        };
    }


    changeRoute = path => this.props.history.push(path);

    handleFiltering = (index) => {
        console.log('set state', index);
        this.setState((prevState, props) => ({ activeFilter: index }));
    }

    handleOnClick = (item) => {
        // console.log('Channel:', item);
        console.log(item.title);
        this.changeRoute(`/Channel/${item.title}`);
    }

    getTiles = () => {
        const tiles = [];

        console.log(this.state.activeFilter);
        for (const key in channels) {
            if (this.state.activeFilter === -1 || channels[key].tags.indexOf(this.state.activeFilter) >= 0) {
              console.log("TRUE", this.state.activeFilter);
              console.log(channels[key].tags);
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
        handleClick={() => { this.handleFiltering(filter.key); }}
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
            {this.getCircleFilters(this.state.filters)}
          </HorizontalScrollContainer>
        </div>
        <br />
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
