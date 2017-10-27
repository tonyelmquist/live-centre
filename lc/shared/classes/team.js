import BaseClass from './baseClass';

class Team extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _key: 0,
            _title: '',
            _logo: '',
            _img: '',
            _abbr: '',
            _players: [],
            _venue: {},
        }, {
            _id: data.id,
            _key: data.key,
            _title: data.title,
            _logo: data.logo,
            _img: data.img,
            _abbr: data.abbreviation,
            _players: data.players,
            _venue: data.venue,
        });
    }

    get id() {
        if (typeof this._id === 'undefined') {
        // console.error('Tried to get ID of Video, was not set');
            return false;
        }
        return this._id;
    }
    set id(newID) {
        if (newID) {
            this._id = newID;
        }
    }

    get title() {
        if (typeof this._title === 'undefined') {
        // console.error('Tried to get title of Vtitleeo, was not set');
            return false;
        }
        return this._title;
    }
    set title(newtitle) {
        if (newtitle) {
            this._title = newtitle;
        }
    }

    get description() {
        if (typeof this._description === 'undefined') {
        // console.error('Tried to get description of Vdescriptioneo, was not set');
            return false;
        }
        return this._description;
    }
    set description(newdescription) {
        if (newdescription) {
            this._description = newdescription;
        }
    }

    get logo() {
        if (typeof this._logo === 'undefined') {
        // console.error('Tried to get logo of Vlogoeo, was not set');
            return false;
        }
        return this._logo;
    }
    set logo(newlogo) {
        if (newlogo) {
            this._logo = newlogo;
        }
    }

    get img() {
        if (typeof this._img === 'undefined') {
        // console.error('Tried to get img of Vimgeo, was not set');
            return false;
        }
        return this._img;
    }
    set img(newimg) {
        if (newimg) {
            this._img = newimg;
        }
    }

    get colors() {
        if (typeof this._colors === 'undefined') {
        // console.error('Tried to get colors of Vcolorseo, was not set');
            return false;
        }
        return this._colors;
    }
    set colors(newcolors) {
        if (newcolors) {
            this._colors = newcolors;
        }
    }

    get abbr() {
        if (typeof this._abbr === 'undefined') {
        // console.error('Tried to get abbr of Vabbreo, was not set');
            return false;
        }
        return this._abbr;
    }
    set abbr(newabbr) {
        if (newabbr) {
            this._abbr = newabbr;
        }
    }

    get players() {
        if (typeof this._players === 'undefined') {
        // console.error('Tried to get players of Vplayerseo, was not set');
            return false;
        }

        return this.hasMany(['sportsInfo', 'players'], '_players');
    }
    set players(newplayers) {
        if (newplayers) {
            this._players = newplayers;
        }
    }
}
export default Team;
