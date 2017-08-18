import BaseClass from './baseClass';

class Sport extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _key: '',
            _title: '',
            _thumbnail: '',
            _videos: [],
            _teams: [],
        }, {
            _id: data.id,
            _key: data.key,
            _title: data.title,
            _thumbnail: data.thumbnail,
            _videos: data.videos,
            _teams: data.teams,
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

    get key() {
        if (typeof this._key === 'undefined') {
        // console.error('Tried to get ID of Video, was not set');
            return false;
        }
        return this._key;
    }
    set key(newKey) {
        if (newKey) {
            this._key = newKey;
        }
    }


    get teams() {
        return this._teams;
    }

    set teams(teamID){
        if (teamID) {
            this._teams.push(teamID);
        }
    }
    get videos() {
        return this._videos;
    }

    get videoItems() {
        return this.hasMany(['videos', 'items'], '_videos');
    }

    set videos(videos) {
        if (videos) {
            this._videos = videos;
        }
    }
    get title() {
        return this._title;
    }

    set title(title) {
        if (title) {
            this._title = title;
        }
    }
    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(thumbnail){
        if (thumbnail) {
            this._thumbnail = thumbnail;
        }
    }
}
export default Sport;