import BaseClass from './baseClass';

class Series extends BaseClass {
    constructor(data) {
        super();
        this._key = data.key;
        this._title = data.title;
        this._seasons = [data.seasonkey];
        this._seasonsFetched = 1;
    }

    get key() {
        if (typeof this._id === 'undefined') {
        // console.error('Tried to get ID of Series, was not set');
            return false;
        }
        return this._key;
    }

    set key(newKey) {
        if (newKey) {
            this._key = newKey;
       }
    }

    set seasons(seasonGroup) {
        if (seasonGroup) {
            this._seasons.push(...seasonGroup);
        }
    }

    get seasons() {
        return this._seasons;
    }

    set season(seasonKey) {
        this._seasons.push(seasonKey);
        this._seasonsFetched ++;
    }

}
export default Series;
