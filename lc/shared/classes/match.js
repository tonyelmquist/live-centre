import BaseClass from './baseClass';

export default class Match extends BaseClass {
    constructor(data) {
        super();

        console.log('construct timeline', data);

        this.assignData({
            _id: 0,
            _home: {},
            _away: {},
            _timeline: {},
        }, {
            _id: data.id,
            _home: data.home,
            _away: data.away,
            _timeline: data.timeline,
        });
    }

    get id() {
        if (typeof this._id === 'undefined') {
            console.error('Tried to get ID of Match, was not set');
            return false;
        }
        return this._id;
    }
    set id(newid) {
        if (newid) {
            this._id = newid;
        }
    }

    get home() {
        if (typeof this._home === 'undefined') {
            console.error('Tried to get Home of Match, was not set');
            return false;
        }
        return this._home;
    }
    set home(newhome) {
        if (newhome) {
            this._home = newhome;
        }
    }

    get away() {
        if (typeof this._away === 'undefined') {
            console.error('Tried to get Away of Match, was not set');
            return false;
        }
        return this._away;
    }
    set away(newaway) {
        if (newaway) {
            this._away = newaway;
        }
    }

    get timeline() {
        if (typeof this._timeline === 'undefined') {
            console.error('Tried to get timeline of Match, was not set');
            return false;
        }
        return this._timeline;
    }
    set timeline(newtimeline) {
        if (newtimeline) {
            const timeline = newtimeline;
            for (let i = 0; i < timeline.length; i++) {
                timeline[i].time = new Date(timeline[i].time);
            }
            this._timeline = timeline;
        }
    }
}
