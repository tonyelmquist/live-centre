import Actions from '../../constants/reduxConstants';
import TeamMember from '../../classes/teamMember';
import Team from '../../classes/team';
import Sport from '../../classes/sport';


// import of local images. Should be replaced later with remote images.
// import garethPortrait from '../../../img//mockup/sport/soccer-players/gareth-bale-portrait.jpg'
// import garethActionShot from '../../../img/mockup/sport/soccer-players/gareth-bale-fullbody.jpg'
// import keylorPortrait from '../../../img/mockup/sport/soccer-players/KeylorNavas_portrait.jpg'
// import keylorActionShot from '../../../img/mockup/sport/soccer-players/KeylorNavas-fullbody.jpg'
// import cristianoPortrait from  '../../../img/mockup/sport/soccer-players/ronaldo.png';
// import cristianoActionShot from '../../../img/mockup/sport/soccer-players/KeylorNavas-fullbody.jpg';

// Dummy Sports and channels
const filters = [
  { key: 'barn', avatarStyle: 'background-color: red' },
  { key: 'drama' },
  { key: 'pets' },
  { key: 'humor' },
  { key: 'fantasy' },
  { key: 'documentaries' },
];

const sportsDefaultState = {
    Soccer: new Sport({
        id: 0,
        key: 'Soccer',
        title: 'Football',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Sport%2Fsport-football.png?alt=media&token=320efe97-9a9e-4c83-968d-ec371c4e3c8f',
        videos: [],
        teams: ['RealMadrid', 'Barcelona'],
    }),
    Basketball: new Sport({
        id: 1,
        key: 'Basketball',
        title: 'Basketball',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/tfg-media-center.appspot.com/o/Sport%2Fsport-basket.png?alt=media&token=33ae8eda-e5e0-47bd-a389-2b2a306716b9',
        videos: [],
        teams: [],
    }),
};

const teamsDefaultState = {
    RealMadrid: new Team({
        id: 0,
        key: 'RealMadrid',
        title: 'Real Madrid',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Escudo_real_madrid_1941b.png',
        img: 'http://s.weltsport.net/bilder/teamfotos/640x360/532.jpg',
        colors: ['#fff'],
        abbr: 'RMA',
        players: [7, 11, 12],
    }),
    Barcelona: new Team({
        id: 1,
        key: 'Barcelona',
        title: 'Barcelona',
        logo: 'https://media-public.fcbarcelona.com/20157/0/document_thumbnail/20197/163/163/14590883/1.0-1/14590883.png?t=1476749073000',
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/2016-17_FC_Barcelona_at_the_Match_of_Champions.jpg',
        colors: ['#003175', '#850d37'],
        abbr: 'FBC',
        players: [7, 11, 12, 1],
    }),
};


const playersDefaultState = {
    7: {
        name: 'Cristiano Ronaldo',
        team: 'RealMadrid',
        nation: 'Portugal',
        number: 7,
        position: 'SS',
        description: `Cristiano Ronaldo dos Santos Aveiro, 
        is a Portuguese professional footballer who plays as a forward 
        for Spanish club Real Madrid and the Portugal national team. 
        Ronaldo has four FIFA Ballon d'Or awards,
        the most for a European player, 
        and is the first player in history to win four European Golden Shoes.`,
        portrait: 'https://s-media-cache-ak0.pinimg.com/736x/73/59/2a/73592a8fa6a3e64be07de54c9097503c--new-haircuts-new-hairstyles.jpg',
        actionShot: 'http://i1.mirror.co.uk/incoming/article10562943.ece/ALTERNATES/s615/Real-Madrids-Cristiano-Ronaldo-celebrat.jpg',

    },
    11: {
        name: 'Gareth Bale',
        team: 'RealMadrid',
        position: 'CB2',
        number: 11,
        description: 'Gareth Bale',
        portrait: 'http://www.menshairstylestoday.com/wp-content/uploads/2017/04/Gareth-Bale-Haircut-Long-Combed-Over-Hair.jpg',
        actionShot: 'http://hairstylecamp.com/wp-content/uploads/Gareth-Bale-Spike-Hairstyle.jpg',
    },
    12: {
        name: 'Gareth Bale',
        team: 'RealMadrid',
        position: 'CB1',
        number: 12,
        description: 'Gareth Bale',
        portrait: 'http://www.menshairstylestoday.com/wp-content/uploads/2017/04/Gareth-Bale-Haircut-Long-Combed-Over-Hair.jpg',
        actionShot: 'http://hairstylecamp.com/wp-content/uploads/Gareth-Bale-Spike-Hairstyle.jpg',
    },
    1: {
        name: 'Keylor Navas',
        team: 'RealMadrid',
        number: 1,
        position: 'GK',
        description: `Keylor Antonio Navas Gamboa (born 15 December 1986), 
        known as Keylor Navas, is a Costa Rican professional footballer 
        who plays as a goalkeeper for Spanish club Real Madrid and the Costa Rica national team.`,
        portrait: 'https://s-media-cache-ak0.pinimg.com/736x/af/85/68/af856898016df90dde9694e876ea897b--real-madrid-football.jpg',
        actionShot: 'http://estaticos.marca.com/imagenes/2015/10/27/en/football/real_madrid/1445935832_extras_noticia_foton_7_0.jpg',
    },
};
function sports(state = sportsDefaultState, action) {
    switch (action.type) {
    case Actions.ADD_SPORT_VIDEO:
        const sportCopy = Object.assign(Object.create(Object.getPrototypeOf(state[action.sport])), state[action.sport]);
        sportCopy.videos = [...sportCopy.videos, action.videoID];
        return {
            ...state,
            [action.sport]: sportCopy,
        };
    default:
        return state;
    }
}
function teams(state = teamsDefaultState, action) {
    switch (action.type) {
    default:
        return state;
    }
}
function players(state = playersDefaultState, action) {
    switch (action.type) {
    default:
        return state;
    }
}
function activeTeamTab(state = 0, action) {
    switch (action.type) {
    case Actions.CHANGE_TEAM_TAB_INDEX: {
        return action.index;
    }
    default:
        return state;
    }
}
function sportPlayerOverlay(state = { player: null, isOpen: false }, action) {
    switch (action.type) {
    case Actions.OPEN_SPORT_PLAYER_OVERLAY:
        return Object.assign({}, state, {
            isOpen: true,
            player: action.player,
        });
    case Actions.CLOSE_SPORT_PLAYER_OVERLAY:
        return Object.assign({}, state, {
            isOpen: false,
            player: null,
        });
    default:
        return state;
    }
}

export { sports, teams, players, activeTeamTab, sportPlayerOverlay };

