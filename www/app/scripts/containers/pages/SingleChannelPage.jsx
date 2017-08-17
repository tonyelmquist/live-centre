import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import CircleRowItem from '../../components/HorizontalScroll/CircleRowItem';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';

import FilterTabs from '../FilterTabs';

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
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F1.png?alt=media&token=7d088a34-4af7-4b88-9807-aeb08acf58d4",
        tags: ['series', 'drama', 'comedy'],
    },
    2: {
        id: 2,
        title: 'Insider',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F2.png?alt=media&token=e2677357-2580-4565-b7ea-01a874830d4a",
        tags: ['series','documentary', 'crime'],
    },
    3: {
        id: 3,
        title: 'IT Crowd',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F3.jpg?alt=media&token=50ad7d19-f4f2-4606-b1a1-a9f0b7e66746",
        tags: ['series','comedy',],
    },
    4: {
        id: 4,
        title: 'Special Victims Unit',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F4.png?alt=media&token=93f41d14-6acd-4bb3-bf59-eb795ca34c00",
        tags: ['series', 'crime'],
    },
    5: {
        id: 5,
        title: 'Flash',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F5.png?alt=media&token=112fa34c-1d29-4483-b03a-672a1656cee7",
        tags: ['series', 'humor',],
    },
    6: {
        id: 6,
        title: 'Avatar',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F6.png?alt=media&token=c642cad6-fd1a-4ba3-8ef4-0159ff0294a1",
        tags: ['movies','drama', 'fantasy', 'humor'],
    },
    7: {
        id: 7,
        title: 'Nausicca',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F7.png?alt=media&token=df4c3c3a-aaa6-45ee-8575-6b9f65a3e1b0",
        tags: ['movies','drama', 'fantasy',],
    },
    8: {
        id: 8,
        title: 'Wolverine',
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Series%2F8.png?alt=media&token=bae2e8dc-05e1-4e93-b6df-45e69405946e",
        tags: ['movies', 'drama'],
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
