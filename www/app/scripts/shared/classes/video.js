import BaseClass from './baseClass';
import videoPrefix from '../constants/mediaPrefix';

class Video extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _author: '',
            _description: '',
            _timeline: [],
            _episode_number: '',
            _duration: 0,
            _formattedDuration: '',
            _rating: 0,
            _tags: [],
            _title: '',
            _thumbnail: '',
            _videoUrl: '',
            _wishlist: false,
            _sport: '',
            _matchId: null,
            _matchStart: 0,
            _secondHalfStart: 0,
        }, {
            _id: data.id,
            _author: data.author,
            _description: data.description,
            _timeline: data.timeline,
            _episode_number: data.episode_number,
            _duration: data.duration,
            _formattedDuration: data.formattedDuration,
            _rating: data.rating,
            _season: data.season,
            _series: data.series,
            _tags: data.tags,
            _title: data.title,
            _thumbnail: data.thumbnail,
            _videoUrl: data.video_url,
            _wishlist: false,
            _sport: data.sport,
            _matchId: data.matchId || null,
            _matchStart: data.matchStart,
            _secondHalfStart: data.secondHalfStart,
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
            // console.error('Tried to get title of Video, was not set');
            return false;
        }

        return this._title.replace(new RegExp('_', 'g'), ' ');
    }
    set title(newTitle) {
        if (newTitle) {
            this._title = newTitle;
        }
    }

    get thumbnail() {
        if (typeof this._thumbnail === 'undefined') {
            // console.error('Tried to get title of Video, was not set');
            return false;
        }
        return this._thumbnail;
    }
    set thumbnail(newThumb) {
        if (newThumb) {
            this._thumbnail = newThumb;
        }
    }

    get videoUrl() {
        if (typeof this._id === 'undefined') {
            // console.error('Tried to get videoUrl of Video, was not set');
            return false;
        }
        return videoPrefix + this._id;
    }
    static set videoUrl(videoUrl) {
        return false; // Cant set videoUrl
    }

    get tags() {
        if (typeof this._tags === 'undefined') {
            // console.error('tried to get tags from video');
            return false;
        }
        return this._tags;
    }

    set tags(tags) {
        if (tags) {
            this._tags = tags;
        }
    }

    get description() {
        if (typeof this._description === 'undefined') {
            console.error('Tried to get description of video, was not set.');
            return false;
        }
        return this._description.replace(new RegExp('_', 'g'), ' ');
    }

    set description(description) {
        if (description) {
            this._description = description;
        }
    }

    set series(series) {
        if (series) {
            this._series = series;
        }
    }

    get series() {
        return this._series;
    }

    set season(season) {
        if (season) {
            this._season = season;
        }
    }

    get season() {
        return this._season;
    }

    set duration(duration) {
        if (duration) {
            this._duration = duration;
        }
    }

    get duration() {
        return this._duration;
    }

    set formattedDuration(formattedDuration) {
        if (formattedDuration) {
            this._formattedDuration = formattedDuration;
        }
    }

    get formattedDuration() {
        return this._formattedDuration;
    }

    set matchStart(matchStart) {
        if (matchStart) {
            this._matchStart = matchStart;
        }
    }

    get matchStart() {
        return this._matchStart;
    }

    set secondHalfStart(secondHalfStart) {
        if (secondHalfStart) {
            this._secondHalfStart = secondHalfStart;
        }
    }

    get secondHalfStart() {
        return this._secondHalfStart;
    }


    set sport(sport) {
        if (sport) {
            this._sport = sport;
        }
    }

    get sport() {
        return this._sport;
    }

    set wishlist(wishlist) {
        this._wishlist = wishlist;
    }

    get wishlist() {
        return this._wishlist;
    }

    set matchId(matchId) {
        this._matchId = matchId;
    }

    get matchId() {
        return this._matchId;
    }

}
export default Video;
