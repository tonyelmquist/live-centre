import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../../components/HorizontalScroll/CircleRowItem';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';

import FilterTabs from '../FilterTabs';

import img1 from '../../../img/mockup/series/1.png';
import img2 from '../../../img/mockup/series/2.png';
import img3 from '../../../img/mockup/series/3.jpg';
import img4 from '../../../img/mockup/series/4.png';
import img5 from '../../../img/mockup/series/5.png';
import img6 from '../../../img/mockup/series/movies/6.png';
import img7 from '../../../img/mockup/series/movies/7.png';
import img8 from '../../../img/mockup/series/movies/8.png';




// Dummy filters and channels
const filters = [
  { key: 'Children', avatarStyle: {backgroundColor: '#E91E63'} },
  { key: 'Drama', avatarStyle: {backgroundColor: '#FFC107'}},
  { key: 'Pets', avatarStyle: {backgroundColor: '#00BCD4'}},
  { key: 'Humor', avatarStyle: {backgroundColor: '#673AB7'}},
  { key: 'Fantasy', avatarStyle: {backgroundColor: '#FF9800'}},
  { key: 'Documentaries', avatarStyle: {backgroundColor: '#8BC34A'}},
];

const programs = {
    1: {
        id: 1,
        title: 'Big bang theory',
        thumbnail: img1,
        tags: ['series', 'drama', 'humor'],
    },
    2: {
        id: 2,
        title: 'Insider',
        thumbnail: img2,
        tags: ['series','drama',],
    },
    3: {
        id: 3,
        title: 'IT Crowd',
        thumbnail: img3,
        tags: ['series','drama', 'humor', 'documentaries'],
    },
    4: {
        id: 4,
        title: 'Special Victims Unit',
        thumbnail: img4,
        tags: ['series','drama', 'humor', 'documentaries'],
    },
    5: {
        id: 5,
        title: 'Flash',
        thumbnail: img5,
        tags: ['series','drama', 'humor', 'documentaries'],
    },
    6: {
        id: 6,
        title: 'Avatar',
        thumbnail: img6,
        tags: ['movies','drama', 'humor', 'documentaries'],
    },
    7: {
        id: 7,
        title: 'Nausicca',
        thumbnail: img7,
        tags: ['movies','drama', 'humor', 'documentaries'],
    },
    8: {
        id: 8,
        title: 'Wolverine',
        thumbnail: img8,
        tags: ['movies', 'drama', 'humor', 'documentaries'],
    },
};

class ChannelsPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeTab: 0,
            tabs: ['all', 'series', 'movies', 'drama', 'comedy', 'documentaries'],
        }
    }

    filterTile = () => {
        console.log('filter');
    }

    getTiles = () => {
        const tiles = [];
        
        for (const key in programs) {
            const activeTab = this.state.tabs[this.state.activeTab];
            if (this.state.activeTab === 0 || programs[key].tags.indexOf(activeTab) >= 0) {
                console.log("true", this.state.activeTab);
                tiles.push(
                    <MasonryImageTile
                    key={`channel-tile-${key}`}
                    poster={programs[key].thumbnail}
                    handleClick={() => this.changeRoute('/Channel/Street Fighter')}
                    //handleClick={() => this.handleOnClick(channels[key])}
                    //overlay={<img onTouchTap={() => this.handleOnClick(channels[key])} className="logo" src={channels[key].logo} />}
                    />,
                );
            }

      }

      console.log(tiles);
    
        return tiles;
    }

    changeTab = (index) => {
        this.setState((prevState, props) => {
            return {activeTab : index}
        });
    }

    render() {
        const channelKey = this.props.match.params.channelKey;

        
        return (
        <div className="channel-page">

        <FilterTabs
            tabItems={this.state.tabs}
            //activeTab={this.props.activetab}
            changeTab={this.changeTab}
            activeTab={this.state.activeTab}
            colortheme="dark"
        />

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
