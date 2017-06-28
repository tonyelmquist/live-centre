import BaseClass from './baseClass';

class Series extends BaseClass {
    constructor(data) {
        super();
        this.assignData({
            _id: 0,
            _title: '',
            _description: '',
            _thumbnail: '',
            _seasons: [],
        }, {
            _id: data.id,
            _title: data.title,
            _description: data.description,
            _thumbnail: data.thumbnail,
            _seasons: data.seasons,
        });
    }

    get id() {
        if (typeof this._id === 'undefined') {
            console.error('Tried to get ID of Series, was not set');
            return false;
        }
        return this._id;
    }

    set id(newID) {
        if (newID) {
            this._id = newID;
        }
    }

}
export default Series;

