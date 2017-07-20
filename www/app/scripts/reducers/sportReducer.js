import Actions from '../constants/reduxConstants';

//Dummy Sports and channels
const filters = [
  { key: 'barn', avatarStyle: 'background-color: red'},
  { key: 'drama' },
  { key: 'pets' },
  { key: 'humor' },
  { key: 'fantasy'},
  { key: 'documentaries'},
];

const sportsDefaultState = {
  1: {
      id: 1,
      title: 'Soccer',
      thumbnail: '/img/soccer-background.png',
  },
};

const teamsDefaultState = {
    teamA:{
        key: "teamA",
        title: "Team A",
        logo: '/img/soccer-teams/Real-Madrid-Logo.png',
        players: [7, 8, 9],
    }
};

const playersDefaultState = {
    7 : {
        name: "Christiano Renaldo",
        team: "teamA",
        number: 7,
        description : "very famous",
        portrait: '/img/soccer-players/ronaldo-full.png',
    },
    8 : {
        name: "Another dude",
        team: "teamA",
        number: 7,
        description : "not so famous",
        portrait: '/img/soccer-players/ronaldo-full.png',
    },
    9 : {
        name: "a third dude",
        team: "teamA",
        number: 7,
        description : "who knows",
        portrait: '/img/soccer-players/ronaldo-full.png',
    }
};

function sports( state = sportsDefaultState, action,) {
    switch (action.type) {
    default:
        return state;
    }
}
function teams( state = teamsDefaultState, action,) {
    switch (action.type) {
    default:
        return state;
    }
}
function players( state = playersDefaultState, action,) {
    switch (action.type) {
    default:
        return state;
    }
}
function activeTeamPage(state = 0, action,) {
    switch (action.type) {
    case Actions.CHANGE_ACTIVE_TEAM_INDEX:{
        return action.index;
    }
    default:
        return state;
    }
}
function activePlayer(state = 0, action,) {
    switch (action.type) {
    case Actions.CHANGE_PLAYER_INDEX:{
        return action.index;
    }
    default:
        return state;
    }
}
function activePlayerTab(state = 0, action,) {
    switch (action.type) {
    case Actions.CHANGE_PLAYER_INDEX_TAB:{
        return action.index;
    }
    default:
        return state;
    }
}



export { sports, teams, players, activeTeamPage, activePlayer, activePlayerTab };

