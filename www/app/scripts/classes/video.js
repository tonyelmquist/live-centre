import BaseClass from './baseClass';

class Video extends BaseClass {
    constructor(data) {
        super();

        this.assignData({
            _id: 0,
            _title: '',
            _description: '',
            _video_url: '',
            _thumbnail: '',
            _views: 0,
            _episode_number: '',
            _tags: [],
        }, {
            _id: data.id,
            _title: data.title,
            _description: data.description,
            _video_url: data.video_url,
            _thumbnail: data.thumbnail,
            _views: data.views,
            _episode_number: data.episode_number,
            _tags: data.tags,
        });

        // this.hasMany(Tag);
        // this.belongsTo(Season);
    }

    get id() {
        if (typeof this._id === 'undefined') {
            console.error('Tried to get ID of Video, was not set');
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
            console.error('Tried to get title of Video, was not set');
            return false;
        }
        return this._title;
    }
    set title(newTitle) {
        if (newTitle){
            this._title = newTitle;
        }
    }

    get thumbnail() {
        if (typeof this._thumbnail === 'undefined') {
            console.error('Tried to get title of Video, was not set');
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
        if (typeof this._video_url === 'undefined') {
            console.error('Tried to get title of Video, was not set');
            return false;
        }
        return this._video_url;
    }
    set videoUrl(videoUrl) {
        if (videoUrl) {
            this._video_url = videoUrl;
        }
    }

    /* printTags(){

        const tagString = '';
        if(this._tags.length>0){
            console.log('hest');
            for(let i =0; i<this._tags.length; i++){
                tagString = `${tagString + this._tags[i].name}`;
            }
        }
        return tagString;
    }*/

    get tags() {
        if (typeof this._tags === 'undefined') {
            console.error('tried to get tags from video');
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
        return this._description;
    }

    set description(description) {
        if (description) {
            this._description = description;
        }
    }

}
export default Video;

