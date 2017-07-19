import React from 'react';
import i18next from 'i18next';
import CirclesRow from '../../components/common/CirclesRow';
import MasonryContainer from '../../components/common/MasonryContainer';
import MasonryImageTile from '../../components/common/MasonryImageTile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


//Dummy filters and channels
const filters = [
  { key: 'barn' },
  { key: 'drama' },
  { key: 'pets' },
  { key: 'humor' },
];

const channels = [
  {
      id: 1,
      title: 'Lost in Time',
      logo: '/img/demoChannels/lost-in-time-logo.png',
      thumbnail: '/img/demoChannels/lost-in-time.jpg',
      description:
          `Lost in Time er et interaktivt gameshow som foregår i en virtuell verden.
          Hver lørdag kl 20.00 kan du spille med og vinne inntil én million kroner.
          For å delta må du ha Lost in Time-appen.
          Hele uken kan du også delta i daglige turneringer
          og konkurrere om ekte premier.`,
  },
  {
      id: 2,
      title: 'Street Fighter',
      logo: '/img/demoChannels/street-fighter-logo.png',
      thumbnail: '/img/demoChannels/street-fighter.jpg',
      description: `Street Fighter (ストリートファイター? Sutorīto Faitā),
      commonly abbreviated as SF or スト (Suto), is a fighting video
      game franchise by Capcom. The second game in the series
      is credited with establishing many of the conventions of
      the one-on-one fighting genre.`,
  },
];

class ChannelsPage extends React.Component {

  changeRoute = path => this.props.history.push(path);

  filterTile = () => {
    console.log("filter");
  }

  handleOnClick = item => changeRoute(`/SingleChannel${item.id}`);

  getTiles = () => {
    const tiles = [];
    for(const key in channels){
      tiles.push(
        <MasonryImageTile
          key={`channel-tile-${key}`}
          poster={channels[key].thumbnail}
          overlay={
              <img className="logo" src={channels[key].logo}/>
            }
          onClick={this.handleOnClick}
        />
      );
    }
    return tiles;
  }

  render (){


    return(
        <div className="channel-page">
        <div className="container-fluid slide">        
          <h1>Channel page</h1>
          <h4>{i18next.t('filter')}</h4>
        </div>

        <CirclesRow items={filters}/>

        <MasonryContainer>
          {this.getTiles()}
        </MasonryContainer>
      </div>

    );
  };
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
