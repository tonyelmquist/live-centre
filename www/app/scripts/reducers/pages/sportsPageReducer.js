import { REHYDRATE } from 'redux-persist/constants';
import Actions from '../../constants/reduxConstants';
import Team from '../../classes/team';
import Sport from '../../classes/sport';
import TeamMember from '../../classes/teamMember';


// import of local images. Should be replaced later with remote images.
// import garethPortrait from '../../../img//mockup/sport/soccer-players/gareth-bale-portrait.jpg'
// import garethActionShot from '../../../img/mockup/sport/soccer-players/gareth-bale-fullbody.jpg'
// import keylorPortrait from '../../../img/mockup/sport/soccer-players/KeylorNavas_portrait.jpg'
// import keylorActionShot from '../../../img/mockup/sport/soccer-players/KeylorNavas-fullbody.jpg'
// import cristianoPortrait from  '../../../img/mockup/sport/soccer-players/ronaldo.png';
// import cristianoActionShot from '../../../img/mockup/sport/soccer-players/KeylorNavas-fullbody.jpg';

// Dummy Sports and channels

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
        logo: 'http://35.158.87.9/images/Sport/Teams/real_madrid_logo.png',
        img: 'http://s.weltsport.net/bilder/teamfotos/640x360/532.jpg',
        description: 'Founded in 6 March 1902 as Madrid Football Club, the club has traditionally worn a white home kit since inception. The word Real is Spanish for Royal and was bestowed to the club by King Alfonso XIII in 1920 together with the royal crown in the emblem. Unlike most European sporting entities, Real Madrid\'s members (socios) have owned and operated the club throughout its history.',
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
        description: 'Founded in 1899 by a group of Swiss, English and Catalan footballers led by Joan Gamper, the club has become a symbol of Catalan culture and Catalanism, hence the motto "Més que un club" (English: "More than a club"). Unlike many other football clubs, the supporters own and operate Barcelona. It is the second most valuable sports team in the world, worth $3.56 billion, and the world\'s second richest football club in terms of revenue, with an annual turnover of €560.8 million. The official Barcelona anthem is the "Cant del Barça", written by Jaume Picas and Josep Maria Espinàs.',
        colors: ['#003175', '#850d37'],
        abbr: 'FBC',
        players: [7, 11, 12, 1],
    }),
    FCAusburg: new Team({
        id: 2,
        key: 'FCAusburg',
        title: 'FC Ausburg',
        logo: 'http://35.158.87.9/images/Sport/Teams/fc_ausburg_logo.png',
        img: 'http://www.spox.com/de/sport/fussball/bundesliga/1408/Bilder/fc-augsburgs-mannschaftsbild-600.jpg',
        description: 'Fußball-Club Augsburg 1907 e. V., commonly known as FC Augsburg or Augsburg, is a German football club based in Augsburg, Bavaria. FC Augsburg play in the Bundesliga, the top tier of the German football league system. The team was founded as Fußball-Klub Alemania Augsburg in 1907 and played as BC Augsburg from 1921 to 1969. With over 12,200 members, it is the largest football club in Swabian Bavaria.',
        colors: ['#FF0000', '#FFF'],
        abbr: 'FCA',
        players: [7, 11, 12],
    }),
    BorussiaDortmund: new Team({
        id: 4,
        key: 'borussiaDortmund',
        title: 'Borussia Dortmund',
        logo: 'http://35.158.87.9/images/Sport/Teams/borussia_dortmund_logo.png',
        img: 'http://english.ahram.org.eg/Media/News/2013/5/24/2013-635050262946594974-659.jpg',
        description: 'Borussia Dortmund was founded in 1909 by eighteen football players from Dortmund. Borussia Dortmund have won eight German championships, four DFB-Pokals, five DFL-Supercups, one UEFA Champions League, one UEFA Cup Winners\' Cup, and one Intercontinental Cup. Their Cup Winners\' Cup win in 1966 made them the first German club to win a European title.',
        colors: ['#003175', '#850d37'],
        abbr: 'BD',
        players: [],
    }),
    FCBayernMunchen: new Team({
        id: 5,
        key: 'FCBayernMunchen',
        title: 'FC Bayern München',
        logo: 'http://35.158.87.9/images/Sport/Teams/fc_logo.png',
        img: 'http://static.sportskeeda.com/wp-content/uploads/2013/04/bayern-munich_squad-1549794.jpg',
        description: 'Fußball-Club Bayern München e.V., commonly known as FC Bayern München, FCB, Bayern Munich, or FC Bayern, is a German sports club based in Munich, Bavaria (Bayern), Germany. It is best known for its professional football team, which plays in the Bundesliga, the top tier of the German football league system, and is the most successful club in German football history, having won a record 27 national titles and 18 national cups.',
        colors: ['#003175', '#850d37'],
        abbr: 'FCB',
        players: [],
    }),
    FCNurnberg: new Team({
        id: 6,
        key: 'FCNurnberg',
        title: 'FC Nurnberg',
        logo: 'http://35.158.87.9/images/Sport/Teams/fc_nurnberg_logo.png',
        img: 'http://s.weltsport.net/bilder/teamfotos/640x360/212.jpg',
        description: 'Fußball-Club Nürnberg Verein für Leibesübungen e. V., often called 1. FC Nürnberg or simply Nürnberg, is a German association football club in Nuremberg, Bavaria, who currently compete in 2. Bundesliga. Founded in 1900, the club initially competed in the Southern German championship, winning their first title in 1916. Their first German championship was won in 1920. Before the inauguration of the Bundesliga in 1963, 1.FCN won a further 11 regional championships, including the Oberliga Süd formed in 1945, and were German champions another seven times. The club has won the Bundesliga once and the DFB-Pokal four times.',
        colors: ['#003175', '#850d37'],
        abbr: 'FCN',
        players: [],
    }),
    WerderBremen: new Team({
        id: 3,
        key: 'WerderBremen',
        title: 'Werder Bremen',
        logo: 'http://35.158.87.9/images/Sport/Teams/werder_bremen_logo.png',
        img: 'http://images.fanpop.com/images/image_uploads/Werder-Bremen-Team-sv-werder-bremen-291489_575_300.jpg',
        description: 'Sportverein Werder Bremen von 1899 e. V., commonly known as Werder Bremen, is a German sports club located in Bremen[1] in the northwest German federal state Free Hanseatic City of Bremen. The club was founded in 1899 and has grown to 40,400 members. It is best known for its association football team.',
        colors: ['#003175', '#850d37'],
        abbr: 'wb',
        players: [],
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
        name: 'Karim Benzema',
        team: 'RealMadrid',
        position: 'OMF1',
        number: 12,
        description: 'Karim Benzema',
        portrait: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXn-XEnCoLQg866vF5oafP0Idn6t7GYi6GmgfZotNVQha5-VyCw',
        actionShot: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/140615214339-karim-benzema-social-tease-horizontal-large-gallery.jpg',
    },
    10: {
        name: 'Lionel Messi',
        team: 'Barcelona',
        position: 'OMF1',
        number: 10,
        description: 'Often considered the best player in the world and regarded by many as the greatest of all time, Messi is the only player in history to win five FIFA Ballon d\'Or awards, four of which he won consecutively, and a record-tying four European Golden Shoes.',
        portrait: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGN-B9jXxg16haDvmXFAdrS2LIwy8K4hZwiUqsyXqs9yvc0b7wtOHzkazyzg',
        actionShot: 'https://pmchollywoodlife.files.wordpress.com/2016/02/lionel-messi-bio-photo.jpg?w=620',
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
    22: {
        name: 'Marc-André Ter-Stegen',
        team: 'Barcelona',
        number: 22,
        position: 'GK',
        description: 'Marc-André ter Stegen is a German professional footballer who plays as a goalkeeper for Spanish club FC Barcelona and the Germany national team.',
        portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Bar%C3%A7a_-_Napoli_-_20140806_-_Marc-Andr%C3%A9_ter_Stegen_1.jpg/220px-Bar%C3%A7a_-_Napoli_-_20140806_-_Marc-Andr%C3%A9_ter_Stegen_1.jpg',
        actionShot: 'https://i.ytimg.com/vi/SqxCJCQSd78/maxresdefault.jpg',
    },
};

function sports(state = sportsDefaultState, action) {
    let sportCopy = null;
    if (typeof action.sport !== 'undefined') {
        sportCopy = Object.assign(Object.create(Object.getPrototypeOf(state[action.sport])), state[action.sport]);
    }
    switch (action.type) {
    case Actions.ADD_SPORT_VIDEO:
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
    case Actions.INSERT_TEAM_DATA:
        return {
            ...state,
            [action.id]: action.team,
        };
    default:
        return state;
    }
}
function players(state = playersDefaultState, action) {
    let playersPayload = {};
    // Setup REHYDRATE
    if (typeof action.payload !== 'undefined' && typeof action.payload.sportsInfo !== 'undefined') {
        playersPayload = action.payload.sportsInfo.players;
        for (const iKey of Object.keys(playersPayload)) {
            for (const rKey of Object.keys(playersPayload[iKey])) {
                playersPayload[iKey][rKey.split('_')[1]] = playersPayload[iKey][rKey];
            }
            playersPayload[iKey] = new TeamMember(playersPayload[iKey]);
        }
    }
    switch (action.type) {
    case REHYDRATE:
        if (typeof action.playload !== 'undefined') {
            return playersPayload;
        }
        return state;
    case Actions.INSERT_PLAYER_DATA:
        return {
            ...state,
            [action.id]: action.data,
        };
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

export { sports, teams, players, sportPlayerOverlay };

