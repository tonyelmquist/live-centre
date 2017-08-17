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
            _rating: 0,
            _tags: [],
            _title: '',
            _thumbnail: '',
            _videoUrl: '',
            _wishlist: false,
        }, {
            _id: data.id,
            _author: data.author,
            _description: data.description,
            _timeline: data.timeline,
            _episode_number: data.episode_number,
            _duration: data.duration,
            _rating: data.rating,
            _season: data.season,
            _series: data.series,
            _tags: data.tags,
            _title: data.title,
            _thumbnail: data.thumbnail,
            _videoUrl: data.video_url,
            _wishlist: false,
        });

        // this.hasMany(Tag);
        // this.belongsTo(Season);
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
    set videoUrl(videoUrl) {
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

    set wishlist(wishlist) {
        this._wishlist = wishlist;
    }

    get wishlist() {
        return this._wishlist;
    }

}
export default Video;