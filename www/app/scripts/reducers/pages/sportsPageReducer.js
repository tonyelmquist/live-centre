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
        name: 'Christiano Renaldo',
        team: 'RealMadrid',
        number: 7,
        description: 'very famous',
        portrait: '/img/soccer-players/ronaldo.png',
        fullPortrait: '/img/soccer-players/ronaldo-fullbody.png',
        position: 'GK',
    },
    8: {
        name: 'Another dude',
        team: 'RealMadrid',
        number: 7,
        description: 'not so famous',
        portrait: '/img/soccer-players/ronaldo.png',
        fullPortrait: '/img/soccer-players/ronaldo-fullbody.png',
        position: 'CM',
    },
    9: {
        name: 'a third dude',
        team: 'RealMadrid',
        number: 7,
        description: 'who knows',
        portrait: '/img/soccer-players/ronaldo.png',
        fullPortrait: '/img/soccer-players/ronaldo-fullbody.png',
        position: 'CF',
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

