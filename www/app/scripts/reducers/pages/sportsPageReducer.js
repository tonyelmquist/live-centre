import Actions from '../../constants/reduxConstants';

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
    1: {
        id: 1,
        title: 'Soccer',
        thumbnail: '/img/soccer.png',
    },
};

const teamsDefaultState = {
    RealMadrid: {
        key: 'RealMadrid',
        title: 'Real Madrid',
        logo: '/img/soccer-teams/Real-Madrid-Logo.png',
        img: '/img/soccer-teams/Real-Madrid-Team.jpg',
        colors: ['white'],
        abbr: 'RMA',
        players: [7, 8, 9],
    },
    Barcelona: {
        key: 'Barcelona',
        title: 'Barcelona',
        logo: '/img/soccer-teams/Real-Madrid-Logo.png',
        img: '/img/soccer-teams/Real-Madrid-Team.jpg',
        colors: ['red', 'green'],
        abbr: 'FBC',
        players: [7, 8, 9],
    },
};


const playersDefaultState = {
    7: {
        name: 'Cristiano Ronaldo',
        team: 'RealMadrid',
        number: 7,
        description: `Cristiano Ronaldo dos Santos Aveiro, 
        is a Portuguese professional footballer who plays as a forward 
        for Spanish club Real Madrid and the Portugal national team. 
        Ronaldo has four FIFA Ballon d'Or awards,
        the most for a European player, 
        and is the first player in history to win four European Golden Shoes.`,
        portrait: '/img/soccer-players/ronaldo.png',
        actionShot: '/img/soccer-players/ronaldo-fullbody.jpg',

    },
    11: {
        name: 'Gareth Bale',
        team: 'RealMadrid',
        number: 11,
        description: 'Gareth Bale',
        portrait: '/img/soccer-players/gareth-bale-portrait.jpg',
        actionShot: '/img/soccer-players/gareth-bale-fullbody.jpg',
    },
    1: {
        name: 'Keylor Navas',
        team: 'RealMadrid',
        number: 1,
        description: `Keylor Antonio Navas Gamboa (born 15 December 1986), 
        known as Keylor Navas, is a Costa Rican professional footballer 
        who plays as a goalkeeper for Spanish club Real Madrid and the Costa Rica national team.`,
        portrait: '/img/soccer-players/KeylorNavas_portrait.jpg',
        actionShot: '/img/soccer-players/KeylorNavas-fullbody.jpg',
    },
};

function sports(state = sportsDefaultState, action) {
    switch (action.type) {
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

