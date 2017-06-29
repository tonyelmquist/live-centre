import BaseClass from './baseClass';

class Tag extends BaseClass {
    constructor(data) {
        super();
        this.assignData(
            {
                _type: '',
                _key: '',
                _name: '',
            },
            {
                _type: data.type,
                _key: data.key,
                _name: data.name,
            },
        );

        this._videos = [];
        this._videosLoaded = 0;
    }

    set video(videoId) {
        this._videos.push(videoId);
        this._videosLoaded ++;
    }

    set videos(videoGroup) {
        this._videos.push(...videoGroup);
    }

    get videos() {
        return this._videos;
    }

    get key() {
        return this._key;
    }
    set key(newKey) {
        if (typeof newKey === 'string') {
            this._key = newKey;
        }
    }

    get name() {
        if (typeof this._name === 'undefined') {
            // console.error("Tried to get title of tag, was not set");
            return false;
        }
        return this._name;
    }
    set name(newName) {
        if (newName) {
            this._name = newName;
        }
    }

}
export default Tag;
