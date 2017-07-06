import React from 'react';
import i18next from 'i18next';

// const filters = [
//     { key: 'barn' },
//     { key: 'drama' },
//     { key: 'pets' },
//     { key: 'humor' },
// ];
// // id, logo, description, title, thumbnail.
// const channels = [
//     {
//         id: 1,
//         logo: '1.png',
//         title: 'Lost in time',
//         thumbnail: '1.jpg',
//         description:
//             `Lost in Time er et interaktivt gameshow som foregår i en virtuell verden.
//             Hver lørdag kl 20.00 kan du spille med og vinne inntil én million kroner.
//             For å delta må du ha Lost in Time-appen.
//             Hele uken kan du også delta i daglige turneringer
//             og konkurrere om ekte premier.`,
//     },

//     {
//         id: 2,
//         logo: '2.png',
//         title: 'Street Fighter',
//         thumbnail: '1.jpg',
//         description: `Street Fighter (ストリートファイター? Sutorīto Faitā),
//         commonly abbreviated as SF or スト (Suto), is a fighting video
//         game franchise by Capcom. The second game in the series
//         is credited with establishing many of the conventions of
//         the one-on-one fighting genre.`,
//     },
// ];


function ChannelsPage() {
    return (
      <div>
        <h1>Channels</h1>
        <h4 className="container-fluid">{i18next.t('filter')}</h4>

        {/* <CirclesRow items={filters}/>

            <MasonryVideos
                filter={["lost in time"]}
                videos={channels}
                handlefilter={this.handleFilter}
        />*/}

      </div>
    );
}

export default ChannelsPage;
