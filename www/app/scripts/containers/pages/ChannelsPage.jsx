import React from 'react';
import i18next from 'i18next';
import CirclesRow from '../../components/common/CirclesRow';
import MasonryContainer from '../../components/common/MasonryContainer';
import MasonryImageTile from '../../components/common/MasonryImageTile';



class ChannelsPage extends React.Component {

changeRoute = path => this.props.history.push(path);


  render (){

      const filters = [
    { key: 'barn' },
    { key: 'drama' },
    { key: 'pets' },
    { key: 'humor' },
];
// id, logo, description, title, thumbnail.
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

    return(
        <div className="channel-page">
        <div className="container-fluid slide">        
          <h1>Channel page</h1>
          <h4>{i18next.t('filter')}</h4>
        </div>

        <CirclesRow items={filters}/>

        <MasonryContainer>
          <MasonryImageTile
            //filter={["lost in time"]}
            items={channels}
            handleTileClick={this.changeRoute}
            //handlefilter={this.handleFilter}
          />
        </MasonryContainer>
      </div>

    );
  };
}



export default ChannelsPage;
