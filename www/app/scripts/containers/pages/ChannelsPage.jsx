import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import ScrollItem from '../../components/HorizontalScroll/ScrollItem';
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

import childrenIcon from '../../../img/channel-genres/children.png';
import comedyIcon from '../../../img/channel-genres/comedy.png';
import crimeIcon from '../../../img/channel-genres/crime.png';
import docIcon from '../../../img/channel-genres/doc.png';
import dramaIcon from '../../../img/channel-genres/drama.png';
import fantasyIcon from '../../../img/channel-genres/fantasy.png';
import foodIcon from '../../../img/channel-genres/food.png';
import petsIcon from '../../../img/channel-genres/pets.png';
import sportIcon from '../../../img/channel-genres/sport.png';

// // Dummy filters and channels
// const filters = [
//   { key: 'Children', avatarStyle: { backgroundColor: '#E91E63' } },
//   { key: 'Drama', avatarStyle: { backgroundColor: '#FFC107' } },
//   { key: 'Pets', avatarStyle: { backgroundColor: '#00BCD4' } },
//   { key: 'comedy', avatarStyle: { backgroundColor: '#673AB7' } },
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
        tags: ['drama', 'comedy', 'documentaries'],
    },
    2: {
        id: 2,
        title: 'Fem',
        logo: femLOGO,
        thumbnail: fem,
        tags: ['drama', 'comedy'],
    },
    3: {
        id: 3,
        title: 'TLC',
        // logo: tlcLOGO,
        thumbnail: tlc,
        tags: ['drama', 'comedy'],
    },
    4: {
        id: 4,
        title: 'VOX',
        // logo: vox,
        thumbnail: vox,
        tags: ['drama', 'comedy'],
    },
    5: {
        id: 5,
        title: 'TV Norge',
        logo: tvNorgeLOGO,
        thumbnail: tvNorge,
        tags: ['drama', 'comedy', 'children', 'documentaries'],
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
              { key: 'children', img: childrenIcon },
              { key: 'comedy', img: comedyIcon },
              { key: 'crime', img: crimeIcon },
              { key: 'documentaries', img: docIcon },
              { key: 'drama', img: dramaIcon },
              { key: 'fantasy', img: fantasyIcon },
              { key: 'food', img: foodIcon },
              { key: 'pets', img: petsIcon },
              { key: 'sport', img: sportIcon },
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
        <p className="label">{i18next.t(filter.key)}</p>
      </div>
    )



    getCircleFilters = filters => filters.map(filter => (
    //   <CircleRowItem
    //     item={filter}
    //     overlay={(this.filterOverlay(filter))}
    //     key={filter.key}
    //     size={60}
    //     img={filter.img}
    //     style={filter.avatarStyle}
    //     handleClick={() => { this.handleFiltering(filter.key); }}
    //   />
        <ScrollItem
            img={filter.img}
            key={filter.key}
            //id={allVideos[value].id}
            handleClick={() => { this.handleFiltering(filter.key); }}
            imgStyle={{ width: '50px', height: 'auto'}}
            overlay={<p className="label">{i18next.t(filter.key)}</p>}
        />
    ))

    render() {
        console.log(this.state.filters);
        return (
        <div className="channel-page">
        <div className="container-fluid">
          <h4>{i18next.t('Genres')}</h4>

            <div className="inline-circle-label">
            <HorizontalScrollContainer height={75}>
                {this.getCircleFilters(this.state.filters)}
            </HorizontalScrollContainer>
            </div>
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
