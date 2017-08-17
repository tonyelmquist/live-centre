import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HorizontalScrollContainer from '../../components/HorizontalScroll/HorizontalScrollContainer';
import ChannelIcon from '../../components/HorizontalScroll/ChannelIcon';
import MasonryContainer from '../../components/Masonry/MasonryContainer';
import MasonryImageTile from '../../components/Masonry/MasonryImageTile';

const channels = {
    1: {
        id: 1,
        title: 'MAX',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_max.png?alt=media&token=76c70eff-4b46-4b2c-b282-b381d434dc7f",
        thumbnail:  "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Fmax.png?alt=media&token=8d5ac1d4-290f-4aa8-9e6f-16d251860822",
        tags: ['drama', 'comedy', 'documentaries'],
    },
    2: {
        id: 2,
        title: 'Fem',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_fem.png?alt=media&token=43717875-7c78-489d-afca-b2dd6d9ad6de",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Ffem.png?alt=media&token=66124292-84df-4ea5-a783-c93e4ab9fce1",
        tags: ['drama', 'comedy', 'food', 'crime'],
    },
    3: {
        id: 3,
        title: 'TLC',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_tlc.png?alt=media&token=70d5031d-9343-4b56-8e26-7f5d34e3a56d",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Ftlc.png?alt=media&token=79c8716f-ed66-4d5f-a45d-12219172703d",
        tags: ['drama', 'comedy', 'food', 'crime'],
    },
    4: {
        id: 4,
        title: 'VOX',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_vox.png?alt=media&token=a8948995-f0fd-4933-b445-82d2fea9903b",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Fvox.png?alt=media&token=c7000b19-db21-426d-87a9-484c6c832082",
        tags: ['drama', 'comedy', 'crime'],
    },
    5: {
        id: 5,
        title: 'TV Norge',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_tvNorge.png?alt=media&token=05cd9a77-ec22-4327-b145-ee90342f17c2",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FtvNorge.png?alt=media&token=6dc5f58d-8fd1-4647-bc60-c594e59c501a",
        tags: ['drama', 'comedy', 'children', 'crime', 'food'],
    },
    6: {
        id: 6,
        title: 'Animal Planet',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_animal.png?alt=media&token=375a1346-0bb6-4750-bc8b-61f3ce02367a",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Fanimal.png?alt=media&token=5bec8f00-23c3-4046-b1a0-9e8aaa317967",
        tags: ['pets', 'animals', 'documentaries'],
    },
    7: {
        id: 7,
        title: 'Discovery',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_discovery.png?alt=media&token=be1a9765-1bba-4360-9e25-f930f99ba0f9",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Fdiscovery.jpg?alt=media&token=e9c476ef-911e-460a-9baa-005bbc47f12f",
        tags: ['documentaries',],
    },
    8: {
        id: 7,
        title: 'History Channel',
        logo: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2FLogos%2Flogo_history.png?alt=media&token=c9640a9b-312b-4e2f-859c-556b34ba70fb",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Channels%2Fhistory.jpg?alt=media&token=f692b1ae-b49c-4501-bff0-eeeaef819a1f",
        tags: ['documentaries'],
    },
};

class ChannelsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilter: -1,
            filters: [
              { key: 'drama', icon: "icon-education"  },
              { key: 'fantasy', icon: "icon-japanese-dragon-svgrepo-com" },
              { key: 'food', icon: "icon-restaurant_menu"  },
              { key: 'pets', icon: "icon-paw" },
              { key: 'sport', icon: "icon-futbol-o" },
              { key: 'children', icon: "icon-child-face-svgrepo-com" },
              { key: 'comedy', icon: "icon-laughing-svgrepo-com"  },
              { key: 'crime', icon: "icon-user-secret"  },
              //{ key: 'documentaries', img: docIcon },
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



    getCircleFilters = filters => filters.map((filter, key) => (
    //   <CircleRowItem
    //     item={filter}
    //     overlay={(this.filterOverlay(filter))}
    //     key={filter.key}
    //     size={60}
    //     img={filter.img}
    //     style={filter.avatarStyle}
    //     handleClick={() => { this.handleFiltering(filter.key); }}
    //   />
        <ChannelIcon
            //img={filter.img}
            key={filter.key}
            name={filter.key}
            //id={allVideos[value].id}
            activeFilter={this.state.activeFilter}
            icon={filter.icon}
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
            <HorizontalScrollContainer height={80}>
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
